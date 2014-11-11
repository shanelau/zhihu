/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
var Promise = require('bluebird'),
    request = Promise.promisify(require("request")),
    cheerio = require('cheerio'),
    config  = require('./config'),
    url     = require('url'),
    _       = require('lodash');

function formatFollowData(str){
    if(str.indexOf('K') !== -1){
        return parseInt(str)*1000;
    }
    if(str.indexOf('K') !== -1){
        return parseInt(str)*10000;
    }
    return parseInt(str);
}
var getUserByName = function (name){
    var data = {
        url:config.user.info,
        qs:{
            params:JSON.stringify({url_token:name})
        }
    };
    return request(data).then(function(content){
        var responseBody = content[0].body;
        var $ = cheerio.load(responseBody);
        var values = $("span.value");
        var result = {
            answer: formatFollowData(values.eq(0).text()),
            post : formatFollowData(values.eq(1).text()),
            follower : formatFollowData(values.eq(2).text())
        };
        result.profileUrl = config.zhihu+$('a.avatar-link').attr('href');
        result.name = $('span.name').text();
        var male = $('.icon-profile-female');
        result.sex = male.length === 1 ? 'female':'male';
        return result;
    });
}

var questions = function(qID){

}
var answers = function(qID){

}
var zhuanlansFocus = function(){

}
var topic = function(){

}

module.exports = {
    getUserByName: getUserByName,
    zhuanlansFocus: zhuanlansFocus,
    question:questions,
    answers: answers,
    topic: topic

}