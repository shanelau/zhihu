/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  15/10/14
 * @description
 *
 */

var util = require('url');
var config =require('../config');
var urlConfig =require('./config');
var cheerio = require('cheerio');
var Promise = require('bluebird'),
    request     = Promise.promisify(require("request"));

function getItems(body) {
  var $ = cheerio.load(body);
  var allZM_Item =  $('.zm-item');
  var items = [];
  var pages =  $('.zm-invite-pager span').eq(-2).text();
  var currentPage =  $('.zm-invite-pager span.zg-gray-normal').eq(-1).text();
  allZM_Item.each(function (index, element) {
    var h2 = $(element).find('h2.zm-item-title a');
    var href = h2.attr('href') || '';
    var content = $(element).find('div.zm-item-fav div');
    var user = content.find('.answer-head .zm-item-answer-author-wrap');

    var item = {
      voter: $(element).find('.zm-item-vote a.zm-item-vote-count').text(),
      desc: content.find('div.zh-summary.summary').text(),
      question: {
        id: href.match(/\d*?$/)[0],
        title: h2.text(),
        url: config.zhihu + h2.attr('href')
      },
      user: {
        username: user.find('a').text(),
        userTitle:  user.find('strong').text(),
        url: user.find('a').attr('href')
      }
    };
    items.push(item);
  });
  return {
    items: items,
    pagination: {
      pages: pages,
      current: currentPage
    }
  };
}

/**
 * 获取某一页的数据
 * @param url
 * @returns {*}
 */
function getDataByPage(url) {
 // var obj = util.parse(url);
  //console.log(obj);
  if (url.indexOf(urlConfig.collection.url) < 0) {
    throw new Error('Url not match!');
  }
  var options = {
    url: url,
    headers: config.headers
  };
  return request(options).then(function(body) {
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
    headers: config.headers
  };
  return request(options).then(function(body) {
    var $ = cheerio.load(body[1]);
    var pages =  $('.zm-invite-pager span').eq(-2).text();
    var currentPage =  $('.zm-invite-pager span.zg-gray-normal').eq(-1).text();
    return  {
      pages: parseInt(pages),
      current: parseInt(currentPage)
    }
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
  return getPagination(url).then(function(paginations){
    var pages = [];
    for(var i = 1; i <=  paginations.pages; i++ ){
      pages.push(i);
    }
    return Promise.map(pages, function (page) {
      var pageUrl = realUrl + '?page=' + page;
      return getDataByPage(pageUrl).then(function(items){
        console.log('page %d finished! %d', page, items.items.length);
        allItems = allItems.concat(items.items);
        return ;
      });
    },{concurrency: 5}).then(function(total){
      return total;
    });
  }).then(function(){
    return allItems;
  });
}
//getAllPageData('http://www.zhihu.com/collection/25547043?page=1');

module.exports = {
  getAllPageData: getAllPageData,
  getDataByPage: getDataByPage,
  getPagination: getPagination
};