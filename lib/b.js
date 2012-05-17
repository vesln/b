/*!
 * B - Benchmarks for Node.js.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Benchmark class.
 *
 * @type {Function}
 */
var Benchmark = require('./benchmark');

/**
 * Default reporter.
 *
 * @type {Function}
 */
var Reporter = require('./reporter');

/**
 * Benchmark factory.
 *
 * @param {String} name [optional]
 * @returns {Benchmark}
 * @api public
 */
module.exports = function(name) {
  return new Benchmark(name).reporter(new Reporter);
};

/**
 * Expose `Benchmark`.
 */
module.exports.Benchmark = Benchmark;

/**
 * Expose `Reporter`.
 */
module.exports.Reporter = Reporter;
