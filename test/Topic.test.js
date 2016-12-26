'use strict';

let Topic = require('../').Topic;
let should = require('should');

describe('Topic', function () {
  describe('#info', function () {
    it('should return topic info object', function (done) {
      let topicID = '19550461';

      // http://www.zhihu.com/topic/19550461/questions
      // if page? http://www.zhihu.com/topic/19550461/questions?page=2

      Topic.getTopicTopAnswersByID(topicID).then(function (data) {
        Object.keys(data).length.should.above(0);
        done();
      }).catch(function (err) {
        console.error(err);
      });
    });
  });
});

