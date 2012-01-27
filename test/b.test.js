/*!
 * B - Benchmarks for Node.js.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * The tested class.
 * 
 * @type {Function}
 */
var Benchmark = require('../lib/b');

/**
 * Mock stream.
 * 
 * @type {Object}
 */
var stream = {
  
  /**
   * Write mock.
   * 
   * @param {String} Text.
   * @api public
   */
  write: function(text) {
    this.text = text;
  }
};

describe('Benchmark', function() {
  describe('asynchronous code', function() {
    it('should run benchmarks asynchronously', function() {
      
    });
  });
  
  describe('synchronous code', function() {
    it('should run benchmarks synchronously', function() {
      var b = new Benchmark('For benchmark.', stream);
      b.start();
      for (var i = -1; ++i < 10000000;) {
        var foo = 3;
      }
      b.end();
      stream.text.should.match(/^For benchmark. [0-9]+ms/);
    });
  });
});