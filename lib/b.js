
/**
 * Benchmark classes.
 */

var Benchmark = require('./benchmark')
  , Batch = require('./batch')

/**
 * Benchmark factory. If you pass one argument and
 * it is a string a batch will be returned. If its
 * a function the benchmarks name will be inferred
 * from the function
 *
 * @param {String} name [optional]
 * @param {Function} fn [optional]
 * @returns {Benchmark}
 * @api public
 */

module.exports = function(name, fn) {
  if (!arguments.length)
    throw new Error('must at least supply a function to bench')
  if (!fn) {
    if (typeof name == 'string')
      return new Batch(name).reporter('table')
    fn = name, name = fn.name || 'anonymous'
  }
  return new Benchmark(name, fn).reporter('cli');
};

/**
 * Expose `Benchmark`.
 */

module.exports.Benchmark = Benchmark;

/**
 * Expose `Reporter`.
 */

module.exports.Reporter = require('./reporters/cli')
