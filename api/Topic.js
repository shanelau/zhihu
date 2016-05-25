/**
 * 话题相关
 */

'use strict';

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var cheerio = require('cheerio');
var fs = require('fs');
var API = require('../config/api');

var getTopicByID = function(topicID, page) {
  var page = page || 1;
  var data = {
    url: API.topic_url + topicID + '/questions',
    qs: {
      page: page,
    },
  };

  return request(data).then(function(content) {
    var responseBody = content.body;
    var $ = cheerio.load(responseBody);
    var result = {
      name: $('.topic-info .topic-name h1').text(),
    };

    let questions = {};
    let index = 0;

    $('div.feed-item.feed-item-hook.question-item').each(function() {
      questions[index] = {};
      questions[index].title = $('a.question_link', this).text();
      questions[index].url = API.zhihu +
      $('a.question_link', this).attr('href');
      questions[index].postTime = $('span.time', this).text();
      index = index + 1;
    });

    result.page = page;
    result.totalpage = Number($('div.zm-invite-pager span').last().prev().text());
    result.questions = questions;
    return result;
  });
};

var getTopicTopAnswersByID = function(topicID, page) {
  var page = page || 1;
  var data = {
    url: API.topic_url + topicID + '/top-answers',
    qs: {
      page: page,
    },
  };

  return request(data).then(function(content) {
    var responseBody = content.body;
    var $ = cheerio.load(responseBody);
    var result = {
      name: $('.topic-info .topic-name h1').text(),
    };

    let questions = {};
    let index = 0;

    $('div.feed-item.feed-item-hook.folding').each(function() {
      questions[index] = {};
      questions[index].title = $('a.question_link', this).text();
      questions[index].url = API.zhihu + $('a.question_link', this).attr('href');
      questions[index].upvotes = $('a.zm-item-vote-count', this).text();
      questions[index].comment_count = $('a.toggle-comment', this).last().text().match(/\d+/g)[0];
      questions[index].answer_url = API.zhihu + $('a.toggle-expand', this).attr('href');
      questions[index].user = {};
      questions[index].user.name = $('h3.zm-item-answer-author-wrap a', this).text();
      questions[index].user.url = API.zhihu
      + $('h3.zm-item-answer-author-wrap a', this).attr('href');
      index++;
    });

    result.page = page;
    result.totalpage = Number($('div.zm-invite-pager span').last().prev().text());
    result.questions = questions;
    return result;
  });
};

module.exports = {
  getTopicByID: getTopicByID,
  getTopicTopAnswersByID: getTopicTopAnswersByID,
};
