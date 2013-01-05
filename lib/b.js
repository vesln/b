
/**
 * Benchmark class.
 */

var Benchmark = require('./benchmark');

/**
 * Benchmark factory.
 *
 * @param {String} name [optional]
 * @returns {Benchmark}
 * @api public
 */

module.exports = function(name) {
  return new Benchmark(name).reporter('cli');
};

/**
 * Expose `Benchmark`.
 */

module.exports.Benchmark = Benchmark;

/**
 * Expose `Reporter`.
 */

module.exports.Reporter = require('./reporters/cli')
