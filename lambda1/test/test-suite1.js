
var assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when value not present', function() {
        assert.equal(-1,[1,2,3].indexOf(4));
      });
    });
    describe('#foo', function() {
      it('should just work', function() {
      });
    });
})

describe('Math', function() {
  describe('addition1', function() {
    it ('We test addition here', function() {
        let a = 3;
        let b = 4;
        assert.equal(7,a+b);
    });
  });
  describe('addition2', function () {
    it('We test addition here', function () {
        let a = 5;
        let b = 9;
        assert.equal(7, a + b);
    });
  });
  describe('mutiplication1', function () {
    it('We test multiplication here', function () {
        let a = 3;
        let b = 3;
        assert.equal(9, a * b);
    });
  });  

});