/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  15/10/14
 * @description
 *
 */
'use strict';

const util = require('url');
const config = require('../config');
const API = require('../config/api');
const cheerio = require('cheerio');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

function getItems(body) {
  var $ = cheerio.load(body);
  var allZMItem = $('.zm-item');
  var items = [];
  allZMItem.each(function (index, element) {
    var h2 = $(element).find('h2.zm-item-title a');
    var href = h2.attr('href') || '';
    var content = $(element).find('div.zm-item-fav div');
    var user = content.find('.answer-head .zm-item-answer-author-wrap');
    var answerID = parseInt($(element).find('.zm-item-fav .zm-item-answer ').attr('data-aid'));
    var atoken = parseInt($(element).find('.zm-item-fav .zm-item-answer ').attr('data-atoken'));
    var html = $(element).find('textarea.content').html();
    var item = {
      aid: answerID,
      voter: parseInt($(element).find('.zm-item-vote a.zm-item-vote-count').text()),
      desc: content.find('div.zh-summary.summary').text(),
      content: html,
      atoken: atoken,
      question: {
        id: parseInt(href.match(/\d*?$/)[0]),
        title: h2.text(),
        url: config.zhihu + h2.attr('href'),
      },
      user: {
        username: user.find('a').text(),
        userTitle: user.find('strong').text(),
        url: user.find('a').attr('href'),
      },
    };
    items.push(item);
  });

  return items;
}

/**
 * 获取某一页的数据
 * @param url
 * @returns {*}
 */
function getDataByPage(url) {
  if (url.indexOf(API.collection.url) < 0) {
    throw new Error('Url not match!');
  }

  var options = {
    url: url,
    headers: config.headers,
  };
  return request(options).then(function (body) {
    return getItems(body[1]);
  });
}

/**
 * 获取分页信息
 * @param url
 * @returns {*}
 */
function getPagination(url) {
  var options = {
    url: url,
    headers: config.headers,
  };
  return request(options).then(function (body) {
    var $ = cheerio.load(body[1]);
    var pages = $('.zm-invite-pager span').eq(-2).text();
    var currentPage = $('.zm-invite-pager span.zg-gray-normal').eq(-1).text();
    return {
      pages: parseInt(pages),
      current: parseInt(currentPage),
    };
  });
}

/**
 * 获取所有页的数据，
 * 先查询分页，然后查询每一页的数据
 * @param url
 * @returns {*}
 */
function getAllPageData(url) {
  var formatUrl = util.parse(url);
  var realUrl = config.zhihu + formatUrl.pathname;
  var allItems = [];
  return getPagination(url).then(function (paginations) {
    var pages = [];
    for (var i = 1; i <= paginations.pages; i++) {
      pages.push(i);
    }

    return Promise.map(pages, function (page) {
      var pageUrl = realUrl + '?page=' + page;
      return getDataByPage(pageUrl).then(function (items) {
        console.log('page %d finished! %d', page, items.length);
        allItems = allItems.concat(items);
        return;
      });
    }, {concurrency: 5}).then(function (total) {
      return total;
    });
  }).then(function () {
    return allItems;
  });
}

function getCollectionInfo(url) {
  if (url.indexOf(API.collection.url) < 0) {
    throw new Error('Url not match!');
  }

  var cid = parseInt(url.match(/\d+/)[0]);
  var options = {
    url: url,
    headers: config.headers,
  };
  return request(options).then(function (body) {
    var $ = cheerio.load(body[1]);
    var title = $('#zh-fav-head-title').text();
    var $user = $('#zh-single-answer-author-info .zm-list-content-title a');
    var user = {
      img: $('a.zm-list-avatar-link .zm-list-avatar-medium').attr('src'),
      name: $user.text(),
      url: $user.attr('href'),
    };
    return {
      cid: cid,
      title: title,
      user: user,
    };
  });
}

module.exports = {
  getAllPageData: getAllPageData,
  getDataByPage: getDataByPage,
  getPagination: getPagination,
  getCollectionInfo: getCollectionInfo,
};
