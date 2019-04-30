
var assert = require('assert');
let sensor = require('../index/').sensor;

describe ('SensorTests', function() {
  describe('sensor1', function() {
    it('standard increment', function() {
      let foo = 4;
      assert.equal(5,sensor(foo));
    });
  });
});