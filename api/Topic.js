/**
 * 话题相关
 */

'use strict';

const {request, cheerio} = require('../config/commonModules');

let API = require('../config/api');

let getTopicByID = (topicID, page = 1) => {
  let data = {
    url: API.topic_url + topicID + '/questions',
    qs: {
      page
    },
  };

  return request(data).then((content) => {
    let responseBody = content.body;
    let $ = cheerio.load(responseBody);
    let result = {
      name: $('.topic-info .topic-name h1').text(),
    };

    let questions = {};
    let index = 0;

    $('div.feed-item.feed-item-hook.question-item').each(function () {
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

let getTopicTopAnswersByID = (topicID, page = 1) => {
  let data = {
    url: API.topic_url + topicID + '/top-answers',
    qs: {
      page
    }
  };
  return request(data).then((content) => {
    let responseBody = content.body;
    let $ = cheerio.load(responseBody);
    let result = {
      name: $('.topic-info .topic-name h1').text(),
    };

    let questions = {};
    let index = 0;

    $('div.feed-item.feed-item-hook.folding').each(function () {
      questions[index] = {};
      questions[index].title = $('a.question_link', this).text();
      questions[index].url = API.zhihu + $('a.question_link', this).attr('href');
      questions[index].upvotes = $('a.zm-item-vote-count', this).text();
      questions[index].comment_count = $('a.toggle-comment', this).last().text().match(/\d+/g)[0];
      questions[index].answer_url = API.zhihu + $('a.toggle-expand', this).attr('href');
      questions[index].user = {};
      questions[index].user.name = $('div.zm-item-answer-author-info a', this).text();
      questions[index].user.url = API.zhihu
        + $('div.zm-item-answer-author-info a', this).attr('href');
      index++;
    });

    result.page = page;
    result.totalpage = Number($('div.zm-invite-pager span').last().prev().text());
    result.questions = questions;
    return result;
  });
};

module.exports = {
  getTopicByID,
  getTopicTopAnswersByID
};
