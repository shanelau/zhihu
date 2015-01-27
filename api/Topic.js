var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var cheerio = require('cheerio');
var fs = require("fs");
var config  = require('./config');

var getTopicByID = function(topicID, page){
    var page = page || 1;
    var data = {
        url: config.topic_url + topicID + '/questions' ,
        qs: {
          page: page
        }
    };

    return request(data).then(function(content){
        var responseBody = content[0].body;
        var $ = cheerio.load(responseBody);
        var result = {
            name: $(".topic-info .topic-name h1").text()
        }

        questions = {};
        index = 0;

        $("div.feed-item.feed-item-hook.question-item").each(function(){
            questions[index] = {};
            questions[index].title = $('a.question_link',this).text();
            questions[index].url = config.zhihu + $('a.question_link',this).attr("href");
            questions[index].postTime = $('span.time',this).text();
            index = index + 1; 
        });

        result.page = page;
        result.totalpage = Number($("div.zm-invite-pager span").last().prev().text());
        result.questions = questions; 
        return result;
    });
}

module.exports = {
    getTopicByID: getTopicByID,
}
