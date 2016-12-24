/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  15/10/14
 * @description
 *
 */
'use strict';

const {cheerio, request, Promise, util: url} = require('../config/commonModules');

const config = require('../config');
const API = require('../config/api');

function getItems(body) {
  let $ = cheerio.load(body);
  let allZMItem = $('.zm-item');
  let items = [];
  allZMItem.each(function (index, element) {
    let h2 = $(element).find('h2.zm-item-title a');
    let href = h2.attr('href') || '';
    let content = $(element).find('div.zm-item-fav div');
    let user = content.find('.answer-head .zm-item-answer-author-wrap');
    let answerID = parseInt($(element).find('.zm-item-fav .zm-item-answer ').attr('data-aid'));
    let atoken = parseInt($(element).find('.zm-item-fav .zm-item-answer ').attr('data-atoken'));
    let html = $(element).find('textarea.content').html();
    let item = {
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

  let options = {
    url,
    headers: config.headers
  };
  return request(options).then(function (body) {
    return getItems(body.body);
  });
}

/**
 * 获取分页信息
 * @param url
 * @returns {*}
 */
function getPagination(url) {
  let options = {
    url,
    headers: config.headers
  };
  return request(options).then(function (body) {
    let $ = cheerio.load(body.body);
    let pages = $('.zm-invite-pager span').eq(-2).text();
    let currentPage = $('.zm-invite-pager span.zg-gray-normal').eq(-1).text();
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
  let formatUrl = util.parse(url);
  let realUrl = config.zhihu + formatUrl.pathname;
  let allItems = [];
  return getPagination(url).then(function (paginations) {
    let pages = [];
    for (let i = 1; i <= paginations.pages; i++) {
      pages.push(i);
    }

    //并发
    return Promise.map(pages, function (page) {
      let pageUrl = realUrl + '?page=' + page;
      return getDataByPage(pageUrl).then(function (items) {
        allItems = allItems.concat(items);
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

  let cid = parseInt(url.match(/\d+/)[0]);
  let options = {
    url,
    headers: config.headers
  };
  return request(options).then(function (body) {
    let $ = cheerio.load(body[1]);
    let title = $('#zh-fav-head-title').text();
    let $user = $('#zh-single-answer-author-info .zm-list-content-title a');
    let user = {
      img: $('a.zm-list-avatar-link .zm-list-avatar-medium').attr('src'),
      name: $user.text(),
      url: $user.attr('href'),
    };
    return {
      cid,
      title,
      user
    };
  });
}

module.exports = {
  getAllPageData,
  getDataByPage,
  getPagination,
  getCollectionInfo
};
