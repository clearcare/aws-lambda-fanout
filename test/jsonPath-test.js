var jsonPathUtil = require('../lib/jsonpath-util.js');

var assert = require('assert');

//{"hello": "world"}
var testBase64 = "eyJoZWxsbyI6ICJ3b3JsZCJ9";


describe('jsonpath-util', function () {
  describe('#jsonPathTest()', function () {
    it('should populate errors', function () {
      var record = {kinesis: {}};
      var target = {};
      var errors = [];
      jsonPathUtil.jsonPathTest(record, target, errors)
      assert.strictEqual(errors.length, 1);
    });

    it('should validate jsonpath', function () {
      var record = {kinesis: {}};
      var target = {};
      var errors = [];
      target.jsonpath = '$..event[?(@.hello=="world")]';
      record.kinesis.data = testBase64;
      var result = jsonPathUtil.jsonPathTest(record, target, errors);
      assert.strictEqual(errors.length, 0);
      assert.strictEqual(result, true);

      target.jsonpath = '$..event[?(@.hello=="foo")]';
      result = jsonPathUtil.jsonPathTest(record, target, errors);
      assert.strictEqual(errors.length, 0);
      assert.strictEqual(result, false);
    });

  });
});
