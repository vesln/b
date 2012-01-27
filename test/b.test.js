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
  describe('asynchronous', function() {
    it('should run benchmarks asynchronously', function() {
      
    });
  });
  
  describe('synchronous', function() {
    it('should run benchmarks synchronously', function() {
      var b = new Benchmark('For benchmark.', stream);
      b.start();
      for (var i = -1; ++i < 100;) {}
      b.end();
      stream.text.should.match(/^For benchmark./);
    });
  });
});