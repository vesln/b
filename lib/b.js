
/**
 * Benchmark class.
 */

var Benchmark = require('./benchmark');

/**
 * Benchmark factory.
 *
 * @param {String} name [optional]
 * @param {Function} fn
 * @returns {Benchmark}
 * @api public
 */

module.exports = function(name, fn) {
	if (!arguments.length) 
		throw new Error('must at least supply a function to bench')
	if (!fn) fn = name, name = fn.name || 'anonamous'
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
