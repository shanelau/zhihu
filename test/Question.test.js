'use strict';

var should = require('should');
var Question = require('../').Question;

describe('Question', function() {
  it('should return question object by settings', function() {
    return Question.answers({
      token: '19557271',
      offset: 0,
      // pagesize: 5
    }).then(function(data) {
      Object.keys(data).length.should.above(0);
    });
  });

  it('should return question object, from 0 - 9 by default', function() {
  	return Question.answers('19557271')
  	.then(function(data) {
  		Object.keys(data).length.should.above(0);
  	})
  })
});