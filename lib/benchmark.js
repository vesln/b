
/**
 * Dependencies.
 */

var EventEmitter = require('events').EventEmitter;

/**
 * Benchmark constructor.
 *
 * @param {String} name
 * @param {Object} reporter
 * @constructor
 */

function Benchmark(name, reporter) {
  this._name = name;
  this._reporter = reporter;
}

/**
 * Inherit from `EventEmitter`.
 */

Benchmark.prototype.__proto__ = EventEmitter.prototype;

/**
 * Set a reporter.
 *
 * @type {Object} reporter
 * @api public
 */

Benchmark.prototype.reporter = function(reporter) {
  if (typeof reporter === 'string')
    this._reporter = new(require(__dirname+'/reporters/'+reporter))
  else
    this._reporter = reporter;
  return this;
};

/**
 * Delegate report to the reporter.
 *
 * @api private
 */

Benchmark.prototype.report = function() {
  this._reporter.report(this._name, this.result(), this._iterations);
  this.emit('done')
};

/**
 * Run the benchmark.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api public
 */

Benchmark.prototype.run = function(iterations, fn) {
  if (iterations < 0) throw new Error('can\'t do '+iterations+' iterations')
  if (fn.length < 2) {
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
  this.emit('start')
  this._start = process.hrtime()
};

/**
 * Stop the timer.
 *
 * @api private
 */

Benchmark.prototype.stop = function() {
  this._end = process.hrtime(this._start)
  this.emit('stop')
};

/**
 * Calculate the benchmark result.
 *
 * @returns {Number}
 * @api private
 */

Benchmark.prototype.result = function() {
  return this._end[0] * 1e9 + this._end[1]
};

/**
 * Run synchronous benchmark.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api private
 */

Benchmark.prototype.sync = function(iterations, fn) {
  this._iterations = iterations
  this.start();
  for (var i = 1; i <= iterations; i++) fn(i);
  this.stop();
  this.report();
};

/**
 * Run asynchronous benchmark in parallel.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api public
 */

Benchmark.prototype.parallel = function(iterations, fn) {
  this._iterations = iterations
  var self = this
  if (iterations <= 0) done()

  this.start();

  for (var i = 1; i <= this._iterations; i++) fn(i, done)

  function done () {
    if (--iterations <= 0) {
      self.stop();
      self.report();
    }
  }
}

/**
 * Run asynchronous benchmark sequentially.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api private
 */

Benchmark.prototype.async = function (iterations, fn) {
  var self = this
    , i = 0
  this._iterations = iterations
  function next () {
    if (++i > iterations) {
      self.stop()
      self.report()
    } else {
      process.nextTick(function () {
        fn(i, next)
      })
    }
  }
  this.start()
  next()
}

/**
 * Expose `Benchmark`.
 */

module.exports = Benchmark;
