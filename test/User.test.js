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

describe('User', function () {
  describe('#info', function () {
    it('should return user info object', function (done) {
      var name = 'iplus26';
      User.getUserByName(name).then(function (data) {
        console.log(data);
        Object.keys(data).length.should.above(0);
        done();
      });
    });

    /*
     Followers: '294K' should be 294000
     */
    it('should recongize users followed by thousands', function (done) {
      var name = 'fenng';
      User.getUserByName(name).then(function (data) {
        console.log(data);
        data.follower.should.above(1000);
        done();
      });
    });
  });
});
