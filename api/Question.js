'use strict';

var request = require('request-promise'),
  cheerio = require('cheerio');

var answers = function(params) {

  if (typeof params === 'string') {
    params = {
      token: arguments[0],
      offset: arguments[1] || 0,
      // pagesize: arguments[2] || 10,
    };
  }

  var opt = {
    uri: 'https://www.zhihu.com/node/QuestionAnswerListV2',
    form: {
      method: 'next',
      params: JSON.stringify({
        'url_token': params.token,
        'pagesize': params.pagesize,
        'offset': 10, // params.offset,
      })
    },
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
      'Referer': 'https://www.zhihu.com/question/' + params.token,
    },
  };

  return request(opt)
    .then(function(content) {
      var ret;
      try {
        var data = JSON.parse(content);
        if (Array.isArray(data.msg)) {
          ret = data.msg.map(function(payload) {
            var $ = cheerio.load(payload, {
              decodeEntities: false,
            });

            var author = $('.zm-item-answer-author-info'),
              authorAnchor = author.find('.author-link'),
              voters = $('span.voters a'),
              content = $('.zm-editable-content'),
              ans = {};

            if (authorAnchor.length) {
              ans.author = {
                name: authorAnchor.text(),
                profileUrl: authorAnchor.attr('href'),
                bio: author.find('span[title]').attr('title'),
                avatar: author.find('img').attr('src')
              };
            } else {
              ans.author = {
                name: '匿名用户',
              };
            }

            ans.voters = voters.length ? parseInt(voters.text()) : 0;
            ans.text = content.text();
            ans.html = content.html();

            return ans;
          });
        }

      } catch ( e ) {}
      return ret;
    });
};

module.exports = {
  answers: answers,
};
