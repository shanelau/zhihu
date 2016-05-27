'use strict';

var should = require('should');
var Question = require('../').Question;

describe('Question', function() {
  it('should return question object', function() {
    return Question.getFollowersByIdAsync({
      id: '19557271',
      offset: 0,
      pagesize: 5
    }).then(function(data) {
      Object.keys(data).length.should.above(0);
    });
  });
});