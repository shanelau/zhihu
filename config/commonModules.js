/**
 * Created by 80920 on 2016/12/24.
 */
const url = require('url');
const cheerio = require('cheerio');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const _ = require('lodash');
const QUERY = require('./query');

module.exports = {
  url,
  cheerio,
  Promise,
  request,
  _,
  QUERY
};
