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

describe('User', function() {
  describe('#info', function() {

    it('should return user info object', function(done) {
      var name = 'iplus26';
      User.getUserByName(name).then(function(data) {
        console.log(data);
        Object.keys(data).length.should.above(0);
        done();
      });
    });

    /*
    fenng
    followed by 293,993 users, following 1891 users up to 24 May, 2016
     */
    it('should recongize users followed by thousands', function(done) {
      var name = 'fenng';
      User.getUserByName(name).then(function(data) {
        console.log(data);
        Object.keys(data).length.should.above(0);
        // data.follower.should.above(1000);
        done();
      });
    });

    /*
    magie
    followed by 538,958 users, following 570 users up to 24 May, 2016
     */
    it('should return user info object', function(done) {
      var name = 'fenng';
      User.getUserByName(name).then(function(data) {
        console.log(data);
        Object.keys(data).length.should.above(0);
        data.follower.should.above(1000);
        done();
      });
    });
  });
});
