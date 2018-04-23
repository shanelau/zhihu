/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
'use strict';
const {request, cheerio} = require('../config/commonModules');

const config = require('../config');
const API = require('../config/api');


function formatFollowData(str) {
  if (str.indexOf('K') !== -1) {
    return parseInt(str) * 1000;
  }
  // if (str.indexOf('K') !== -1) {
  //   return parseInt(str) * 10000;
  // }
  return parseInt(str);
}

/*
 * @param name  The name of Zhihu user
 * @return      A promise
 */
let info = (name) => {
  let data = {
    url: API.user.info,
    qs: {
      params: JSON.stringify({
        'url_token': name
      }),
    },
  };

  return request(data).then(function (content) {
    let responseBody = content.body;
    let $ = cheerio.load(responseBody);
    
    const tagline = $('.tagline').eq(0).text();
    const workItem = $('.personal .info-wrap .item');
    const company = workItem.eq(0).text();
    const title = workItem.eq(1).text();
   
    let values = $('span.value');
    let result = {
      tagline,
      work: `${company} ${title}`,
      answer: formatFollowData(values.eq(0).text()),
      post: formatFollowData(values.eq(1).text()),
      follower: formatFollowData(values.eq(2).text()),
    };
    result.profileUrl = config.zhihu + $('a.avatar-link').attr('href');
    result.name = $('span.name').text();
    let male = $('.icon-profile-female');
    result.sex = male.length === 1 ? 'female' : 'male';
    return result;
  });
};

let questions = (qID) => {
};

let answers = (qID) => {
};

let zhuanlansFocus = () => {
};

let topic = () => {
};

module.exports = {
  info,
  // TODO
  zhuanlansFocus,
  questions,
  answers,
  topic,

  // Deprecated
  getUserByName: info,
};
