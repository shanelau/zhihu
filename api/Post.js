/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */

var Promise = require('bluebird'),
    request = require("request"),
    config = require('./config'),
    url = require('url'),
    User = require('./User'),
    _ = require('lodash');

function getRealUrl(apiUrl, postUrl) {
    var pathname = url.parse(postUrl).pathname;
    var paths = pathname.split('\/');
    if (paths.length < 0) {
        throw new Error("Url error!");
    }
    var data = {
        name: paths[1],
        postID: paths[2]
    };
    return _.template(apiUrl, data);
}


var getLikers = function(postUrl) {
        var url = getRealUrl(config.post.likers, postUrl);
        var data = {
            url: url
        };
        return request(data).then(function(content) {
            var users = content[0].body;
            return JSON.parse(users);
        });
    }
    /**
     * get full userinfo who stared post
     * @param postUrl post's url
     * @returns {*}  User Object  contain detail userinfo , number of question, number of answer etc
     */
var likersDetail = function(postUrl) {
    return getLikers(postUrl).then(function(users) {
        if (users.length > 0) {
            return Promise.map(users, function(user) {
                return User.getUserByName(user.name).then(function(result) {
                    return result;
                });
            }, {
                concurrency: 30
            }).then(function() {
                users = _.sortBy(users, 'follower').reverse();
                return users;
            });
        }
    });
}
var info = function(postUrl) {
    var url = getRealUrl(config.post.info, postUrl);
    var options = {
        url: url,
        gzip: true
    };
    return new Promise(function(resolve, reject) {
        request(options, function(err, res, body) {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject("JSON parse error!");
            }
        });
    });
}
var page = function(name, options) {
    var data = {
        url: _.template(config.post.page, {
            name: name
        }),
        qs: {
            limit: options.limit || 10,
            offset: options.offset || 10
        }
    }
    return new Promise(function(resolve, reject) {
        request(data, function(err, res, body) {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject("JSON  string parse error!");
            }
        });
    });
}
var zhuanlanInfo = function(zhuanlan_name) {
    var url = config.post.zhuanlan + zhuanlan_name;
    var options = {
        url: url,
        gzip: true
    };
    return new Promise(function(resolve, reject) {
        request(options, function(err, res, body) {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject("JSON string parse error!");
            }
        });
    });

}
module.exports = {
    likersDetail: likersDetail,
    info: info,
    page: page,
    zhuanlanInfo: zhuanlanInfo
};