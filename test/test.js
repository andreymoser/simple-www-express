const assert = require('assert');
const config = require('../modules/config');
const mongod = require('../modules/mongod');
const mongoose = require('mongoose');

describe('mongoDB connection test', () => {
  it('should not have mongoDB errors', () => {
    mongod.connect(config.mongod.url, mongoose, (err,data) => {
      assert.equal(null, err);
    });
  });
});
