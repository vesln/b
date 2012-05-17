/*!
 * B - Benchmarks for Node.js.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Dependencies.
 */
var EventEmitter = require('events').EventEmitter;

/**
 * Benchmark constructor.
 *
 * @param {String} name
 * @param {Object} reporter
 * @api public
 */
function Benchmark(name, reporter) {
  this._name = name;
  this._reporter = reporter;
};

/**
 * Inherit from `EventEmitter`.
 */
Benchmark.prototype.__proto__ = EventEmitter;

/**
 * Set a reporter.
 *
 * @type {Object} reporter
 * @api public
 */
Benchmark.prototype.reporter = function(reporter) {
  this._reporter = reporter;
  return this;
};

/**
 * Delegate report to the reporter.
 *
 * @param {String} name
 * @param {Number} result
 * @param {Number} iterations
 * @api private
 */
Benchmark.prototype.report = function(name, result, iterations) {
  this._reporter.report(name, result, iterations);
};

/**
 * Run the benchmark.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api public
 */
Benchmark.prototype.run = function(iterations, fn) {
  if (0 === fn.length) {
    this.sync(iterations, fn);
  } else {
    this.async(iterations, fn);
  }
};

/**
 * Start the timer.
 *
 * @api private
 */
Benchmark.prototype.start = function() {
  this._start = Date.now();
};

/**
 * Stop the timer.
 *
 * @api private
 */
Benchmark.prototype.stop = function() {
  this._end = Date.now();
};

/**
 * Calculate the benchmark result.
 *
 * @returns {Number}
 * @api privagte
 */
Benchmark.prototype.result = function() {
  return this._end - this._start;
};

/**
 * Run synchronous benchmark.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api private
 */
Benchmark.prototype.sync = function(iterations, fn) {
  this.start();
  for (var i = -1; ++i < iterations;) fn();
  this.stop();

  this.report(this._name, this.result(), iterations);
};

/**
 * Run asynchronous benchmark.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api private
 */
Benchmark.prototype.async = function(iterations, fn) {
  var count = 0;

  var runner = function(cb) {
    if (++count <= iterations) return fn(runner);
    this.stop();
    this.report(this._name, this.result(), iterations);
  }.bind(this);

  this.start();
  runner(fn);
};

/**
 * Expose `Benchmark`.
 */
module.exports = Benchmark;
