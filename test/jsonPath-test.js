var jsonPathUtil = require('../lib/jsonpath-util.js');

var assert = require('assert');

describe('jsonpath-util', function () {
  describe('#jsonPathTest()', function () {
    it('should populate errors', function () {
      var record = {};
      var target = {};
      var errors = [];
      jsonPathUtil.jsonPathTest(record, target, errors)
      assert.strictEqual(errors.length, 1);
    });

    it('should validate jsonpath', function () {
      var record = {};
      var target = {};
      var errors = [];
      target.jsonpath = '$..event[?(@.hello=="world")]';
      record.data = '{"hello": "world"}';
      var result = jsonPathUtil.jsonPathTest(record, target, errors);
      assert.strictEqual(errors.length, 0);
      assert.strictEqual(result, true);

      target.jsonpath = '$..event[?(@.hello=="foo")]';
      record.data = '{"hello": "world"}';
      result = jsonPathUtil.jsonPathTest(record, target, errors);
      assert.strictEqual(errors.length, 0);
      assert.strictEqual(result, false);
    });

  });
});
