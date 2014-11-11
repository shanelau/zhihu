/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-11
 * @description
 *
 */
var Promise = require('bluebird'),
    request = require("request"),
    config  = require('./config'),
    url     = require('url'),
    User    = require('./User'),
    _       = require('lodash');

/**
 * @TODO
 * @param answerUrl 答案的URL
 */
var likers = function(answerUrl){

}

module.exports = {
    likers: likers
}