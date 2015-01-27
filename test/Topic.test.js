var Topic = require('../').Topic;
var should = require('should');

describe('Topic', function() {
    describe('#info', function() {
        it('should return topic info object', function(done) {
            var topicID = 19778317;

            // http://www.zhihu.com/topic/19791501/questions
            // if page? http://www.zhihu.com/topic/19791501/questions?page=2

            Topic.getTopicByID(topicID).then(function(data) {
                console.log(data);
                Object.keys(data).length.should.above(0);
                done();
            }).catch(function(err) {
                console.error(err);
            });
        });
    });
});

