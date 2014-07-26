var yoyo = require('../yoyo');
var assert = require('assert');

describe('Yoyo', function() {
  it('Should return fail with stackoverflow', function(done) {
    function fac(n, acc) {
      if (n < 2){
        return acc;
      }
      return fac(n-1, n * acc);
    }

    assert.throws(function() { fac(30000,1); }, RangeError);

    done();
  });

  it('Should return correct factorial', function(done) {
    function fac(n, acc) {
      if (n < 2){
        return acc;
      }
      return fac.bind(null, n-1, n * acc);
    }

    assert.equal(yoyo(fac,3,1), 6);
    assert.equal(yoyo(fac)(3,1), 6);
    assert.equal(yoyo(fac)(3)(1), 6);
    assert.doesNotThrow(function() { yoyo(fac,30000,1); }, RangeError);
    assert.equal(yoyo(fac,30000,1), 'Infinity');
    done();
  });

  it('Should return correct bool', function(done) {
    function even(n) {
      return n === 0 ? true : odd.bind(null, n - 1);
    }

    function odd(n) {
      return n === 0 ? false : even.bind(null, n - 1);
    }

    assert.equal(yoyo(even, 2), true);
    assert.equal(yoyo(even)(2), true);
    assert.equal(yoyo(even, 1), false);
    assert.equal(yoyo(even)(1), false);
    done();
  });
});
