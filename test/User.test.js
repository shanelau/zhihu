/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
'use strict';

var User = require('../').User;
var should = require('should');

var shouldReturn = function() {
  return this.then(function(value) {
    // console.log(value);
    Object.keys(value).length.should.above(0);
  });
};

var shouldParseBigV = function() {
  return this.then(function(value) {
    // console.log(value);
    value.follower.should.above(1000);
  });
};

var promise1 = User.info('iplus26');
var promise2 = User.info('fenng');
var promise3 = User.info('magie');

describe('User', function() {
  describe('#info', function() {

    it('should return user info object',
      shouldReturn.bind(promise1));

    /*
    fenng
    followed by 293,993 users, following 1891 users up to 24 May, 2016
     */
    it('should return user info object (fenng)',
      shouldReturn.bind(promise2));
    it('should recongize users followed by thousands (fenng)',
      shouldParseBigV.bind(promise2));

    /*
    magie
    followed by 538,958 users, following 570 users up to 24 May, 2016
     */
    it('should return user info object (magie)',
      shouldReturn.bind(promise3));
    it('should recongize users followed by thousands (magie)',
      shouldParseBigV.bind(promise3));

  });
});
