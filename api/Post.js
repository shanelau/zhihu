/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
'use strict';

const {Promise, request, url, _} = require('../config/commonModules');

const API = require('../config/api');
const User = require('./User');

function getRealUrl(apiUrl, postUrl) {
  let pathname = url.parse(postUrl).pathname;
  let paths = pathname.split('\/');
  if (paths.length < 0) {
    throw new Error('Url error!');
  }

  let data = {
    name: paths[1],
    postID: paths[2],
  };
  return _.template(apiUrl)(data);
}

let getLikers = (postUrl) => {
  let url = getRealUrl(API.post.likers, postUrl);
  let data = {
    url
  };
  return request(data).then(function (content) {
    let users = content.body;
    return JSON.parse(users);
  });
};
/**
 * get full userinfo who stared post
 * @param postUrl post's url
 * @returns {*}  User Object  contain detail userinfo , number of question, number of answer etc
 */
let likersDetail = (postUrl) => {
  return getLikers(postUrl).then(function (users) {
    if (users.length > 0) {
      //并发
      return Promise.map(users, function (user) {
        return User.getUserByName(user.name).then(function (result) {
          return result;
        });
      }, {
        concurrency: 30,
      }).then(function () {
        users = _.sortBy(users, 'follower').reverse();
        return users;
      });
    }
  });
};

let info = (postUrl) => {
  let url = getRealUrl(API.post.info, postUrl);
  let options = {
    url,
    gzip: true,
  };

  return request(options).then((content) => {
    return JSON.parse(content.body);
  });
};

let page = (name, {limit = 10, offset = 10} = {}) => {
  let data = {
    url: _.template(API.post.page)({name}),
    qs: {
      limit,
      offset
    }
  };
  return request(data).then((content) => {
    return JSON.parse(content.body);
  });
};

let zhuanlanInfo = (zhuanlanName) => {
  let url = API.post.zhuanlan + zhuanlanName;
  let options = {
    url: url,
    gzip: true,
  };
  return request(options).then((content) => {
    return JSON.parse(content.body);
  });
};

module.exports = {
  likersDetail,
  info,
  page,
  zhuanlanInfo
};
