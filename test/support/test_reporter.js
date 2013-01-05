
/**
 * Test Reporter
 *
 * @api public
 */

function TestReporter() {};

/**
 * Report a benchmark.
 *
 * @param {String} name
 * @param {Number} result
 * @param {Number} iterations
 * @api public
 */

TestReporter.prototype.report = function(name, result, iterations) {
  this.name = name;
  this.result = result;
  this.iterations = iterations;
};

/**
 * Expose `TestReporter`.
 */

module.exports = TestReporter;
