/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
let Post = require('../').Post;
let should = require('should');

describe('Post', function () {
  describe('#info', function () {
    it('should return post info object', function (done) {
      let postUrl = 'https://zhuanlan.zhihu.com/p/19888522';
      Post.info(postUrl).then(function (data) {
        Object.keys(data).length.should.above(0);
        done();
      }).catch(function (err) {
        console.error(err);
      });

    });
  });

  describe('#zhuanlan', function () {
    it('should return zhuanlan info object', function (done) {
      let name = 'bigertech';
      Post.zhuanlanInfo(name).then(function (data) {
        Object.keys(data).length.should.above(0);
        done();
      }).catch(function (err) {
        console.error(err);
      });

    });
  });
  describe('#comments', function () {
    it('should return zhuanlan article comments array', function (done) {
      let postUrl = 'https://zhuanlan.zhihu.com/p/19888522';
      Post.comments(postUrl).then(function (data) {
        data.length.should.above(0);
        done();
      }).catch(function (err) {
        console.error(err);
      });

    });
  });

});
