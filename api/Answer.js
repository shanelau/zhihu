/**
 * @author  Ivan Jiang (iplus26)
 * @date  23 May 2016
 * @description
 *
 */
'use strict';
const {cheerio, request, _} = require('../config/commonModules');

const config = require('../config/api');
const User = require('./User');

let _renderUrl = (answerId) => {
  let url = _.template(config.answer.voters)({answerId});
  return url;
};

/*
 * @param answerId  Different from the string after "answer" in url,
 *                  the real answerId is not that obvious. For example,
 *                  "/question/28207685/answer/39974928",
 *                  the answerId of this post is "11382008" instead.
 */
let voters = (answerId) => {
  let url = _renderUrl(answerId);
  let options = {
    url
  };

  return request(options).then(function (res) {
    let buffer = JSON.parse(res.body),
      voters = [];

    if (Array.isArray(buffer.payload)) {
      voters = buffer.payload.map(function (payload) {
        let $ = cheerio.load(payload),
          user = {};

        let anchor = $('a[title]'),
          status = $('ul.status > li').children('a, span');
        user.name = anchor.attr('title');

        user.anonymous = !user.name;

        if (!user.anonymous) {
          user.profileUrl = anchor.attr('href');
          user.sex = (function (str) {
            switch (str) {
              case '他':
                return 'male';
              case '她':
                return 'female';
              default:
                return undefined;
            }
          })($('.zg-btn-follow').text().slice(2));

        } else {
          user.name = '匿名用户';
        }

        user.avatar = $('.zm-item-img-avatar').attr('src');
        user.like = parseInt(status.eq(0).text());
        user.thank = parseInt(status.eq(1).text());
        user.question = (function (el) {
          let href = el.attr('href');
          if (href) {
            this.questionUrl = href;
          }
          return parseInt(el.text());
        }).call(user, status.eq(2));
        user.answer = (function (el) {
          let href = el.attr('href');
          if (href) {
            this.answerUrl = href;
          }
          return parseInt(el.text());
        }).call(user, status.eq(3));

        return user;
      });
    }
    return voters;
  });
};

module.exports = {
  voters
};
