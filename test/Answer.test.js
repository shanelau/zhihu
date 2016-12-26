/*
 * @author	Ivan Jiang
 * @date	23 May 2016
 */

'use strict';

let Answer = require('../index').Answer;
let should = require('should');

describe('Answer', function () {
  describe('Voters', function () {
    it('should return voters of the answer', function (done) {
      let answerId = '35369006';
      Answer.voters(answerId).then(function (data) {
        data.length.should.above(0);
        done();
      });
    });
  });
});
