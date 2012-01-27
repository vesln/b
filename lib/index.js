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
module.exports = function(name, string, cb) {
  return new Benchmark(name, stream, cb);
};

/**
 * Expose module version.
 */
module.exports.version = require('../package.json').version;