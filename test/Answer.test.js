/*
 * @author	Ivan Jiang
 * @date	23 May 2016
 */

'use strict';

var Answer = require('../').Answer;
var should = require('should');

describe('Answer', function() {
  describe('Voters', function() {
    it('should return voters of the answer', function(done) {
      var answerId = '35369006';
      Answer.getVotersById(answerId).then(function(data) {
        data.length.should.above(0);
        done();
      });
    });
  });
});