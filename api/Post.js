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
    User    = require('./User'),

_       = require('lodash');

function getLikerUrl(postUrl){
    var pathname = url.parse(postUrl).pathname;
    var paths = pathname.split('\/');
    if(paths.length < 3){
        throw new Error("Url error!");
    }
    var data = {name:paths[1],postID:paths[2]};
    return _.template(config.postLikers,data);
}

var api = {
    postLikers: function (postUrl){
        var url = getLikerUrl(postUrl);
        var data = {
            url:url
        };
        return request(data).then(function(content){
            var users = content[0].body;
            return JSON.parse(users);
        });
    },
    /**
     * get full userinfo who stared post
     * @param postUrl post's url
     * @returns {*}  User Object  contain detail userinfo , number of question, number of answer etc
     */
    postLikersDetail: function (postUrl){
        return api.postLikers(postUrl).then(function(users){
            if(users.length > 0){
                console.log("点赞人数 %s",users.length);
                return Promise.map(users, function( user) {
                    console.log(" 查询用户 : %s",user.name);
                    return User.getUserByName(user.name).then(function(result){
                        return result;
                    });
                }, {concurrency: 30}).then(function() {
                    console.log("finish all");
                    users = _.sortBy(users,'follower').reverse();
                    return users;
                });
            }
        });
    }

}
module.exports = api;