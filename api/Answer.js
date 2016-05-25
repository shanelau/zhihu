/**
 * @author  Ivan Jiang (iplus26)
 * @date  23 May 2016
 * @description
 *
 */
'use strict';

var Promise = require('bluebird'),
  request = Promise.promisify(require('request')),
  config = require('../config/api'),
  url = require('url'),
  User = require('./User'),
  cheerio = require('cheerio'),
  _ = require('lodash');

var _renderUrl = function(answerId) {
  var options = {
    answerId: answerId,
  };
  var url = _.template(config.answer.voters)(options);
  return url;
};

/*
 * @param answerId  Different from the string after "answer" in url, 
 *                  the real answerId is not that obvious. For example,
 *                  "/question/28207685/answer/39974928",
 *                  the answerId of this post is "11382008" instead. 
 */
var getVotersById = function(answerId) {

  var options = {};

  if (typeof answerId === 'object') {
    options = answerId;
    answerId = options.answerId;
  }

  options.url = _renderUrl(answerId);

  return request(options).then(function(resp) {

    var buffer = JSON.parse(resp.body),
      voters = [];

    if (Array.isArray(buffer.payload)) {
      voters = buffer.payload.map(function(payload) {
        var $ = cheerio.load(payload);
        var userName = $('a[title]').attr('title');
        return userName;
      });
    }

    console.log(voters);

    return voters;
  });
};

module.exports = {
  getVotersById: getVotersById
};
