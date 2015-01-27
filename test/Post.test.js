/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
var Post = require('../').Post;
var should = require('should');

describe('Post', function() {
    describe('#info', function() {
        it('should return post info object', function(done) {
            var postUrl = 'http://zhuanlan.zhihu.com/bigertech/19888522';
            Post.info(postUrl).then(function(data) {
                Object.keys(data).length.should.above(0);
                done();
            }).catch(function(err) {
                console.error(err);
            });

        });
    });

    describe('#zhuanlan', function() {
        it('should return zhuanlan info object', function(done) {
            var name = 'bigertech';
            Post.zhuanlanInfo(name).then(function(data) {
                Object.keys(data).length.should.above(0);
                done();
            }).catch(function(err) {
                console.error(err);
            });

        });
    });
});
