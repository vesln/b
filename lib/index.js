/*!
 * B - Benchmarks for Node.js.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Module dependencies.
 */
var Benchmark = require('./b');

/**
 * Benchmark factory.
 * 
 * @param {String} name [optional]
 * @param {Object} writable stream [optional]
 * @param {Function} functionality to benchmark [optional]
 * @api public
 */
module.exports = function(name, stream, cb) {
  return new Benchmark(name, stream, cb);
};

/**
 * Expose `Benchmark`.
 */
module.exports.Benchmark = Benchmark;

/**
 * Expose module version.
 */
module.exports.version = require('../package.json').version;