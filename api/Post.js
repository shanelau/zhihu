/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
'use strict';

const {Promise, request, url, _, QUERY} = require('../config/commonModules');

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

let getLikers = (postUrl, config) => {
  let url = getRealUrl(API.post.likers, postUrl);
  let query = config || QUERY.zhuanlan.likers;
  let data = {
    url,
    qs: {
      limit: query.limit,
      offset: query.offset
    }
  };
  return request(data).then(function (content) {
    let users = content.body;
    return JSON.parse(users);
  });
};
/**
 * get full userinfo who stared post
 * @param postUrl post's url
 * @param config
 * @returns {*}  User Object  contain detail userinfo , number of question, number of answer etc
 */
let likersDetail = (postUrl, config) => {
  return getLikers(postUrl, config).then(function (users) {
    if (users.length > 0) {
      //并发
      return Promise.map(users, function (user) {
        //User.getUserByName参数是用户的slug值，不是直接的用户名
        return User.getUserByName(user.slug).then(function (result) {
          return result;
        });
      }, {
        concurrency: 30,
      }).then(function (data) {
        //按follower数目逆序排列
        let pure_users = _.sortBy(data, 'follower').reverse();
        return pure_users;
      });
    }
  });
};

let articleInfo = (postUrl) => {
  let url = getRealUrl(API.post.info, postUrl);
  let options = {
    url,
    gzip: true,
  };

  return request(options).then((content) => {
    return JSON.parse(content.body);
  });
};

let articleList = (name, config) => {
  let query = config || QUERY.zhuanlan.articleList;
  let data = {
    url: _.template(API.post.page)({name}),
    qs: {
      limit: query.limit,
      offset: query.offset
    }
  };
  return request(data).then((content) => {
    return JSON.parse(content.body);
  });
};

let zhuanlanInfo = (zhuanlanName) => {
  let url = API.post.zhuanlan + zhuanlanName;
  let options = {
    url,
    gzip: true,
  };
  return request(options).then((content) => {
    return JSON.parse(content.body);
  });
};


let comments = (postUrl, config) => {
  let url = getRealUrl(API.post.comments, postUrl);
  let query = config || QUERY.zhuanlan.comments;

  let options = {
    url,
    qs: {
      limit: query.limit,
      offset: query.offset
    }
  };
  return request(options).then((content) => {
    return JSON.parse(content.body);
  })
};


module.exports = {
  likersDetail,
  comments,
  info: articleInfo,
  page: articleList,
  zhuanlanInfo
};
