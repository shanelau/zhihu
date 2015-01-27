/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
var User = require('../').User;
var should = require('should');

describe('User',function(){
    describe('#info',function(){
        it('should return user info object',function(done){
            var name = 'shanelau1021';
            User.getUserByName(name).then(function(data){
//              console.log(data);
                Object.keys(data).length.should.above(0);
                done();
            });
        });
    });
});
