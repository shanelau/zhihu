/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-11
 * @description
 *
 */
var Post = require('./Post');
var User = require('./User');
var Collection = require('./Collection');
var Topic = require('./Topic');
var Answer = require('./Answer');

module.exports = {
  Post: Post,
  User: User,
  Topic: Topic,
  Collection: Collection,
  Answer: Answer
};