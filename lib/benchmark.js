
/**
 * Dependencies.
 */

var Emitter = require('events').EventEmitter
  , CLIReporter = require('./reporters/cli')

/**
 * Benchmark constructor.
 *
 * @param {String} name
 * @param {Function} fn
 * @constructor
 */

function Benchmark(name, fn) {
  this._name = name;
  this._fn = fn;
  this._async = fn.length > 1;
}

/**
 * inherit emitter
 */

Benchmark.prototype.__proto__ = Emitter.prototype

/**
 * Set a reporter.
 *
 * @type {Object} reporter
 * @api public
 */

Benchmark.prototype.reporter = function(reporter) {
  if (typeof reporter == 'string') {
    this._reporter = new(require(__dirname+'/reporters/'+reporter))
  } else if (typeof reporter == 'function') {
    this._reporter = {report: reporter}
  } else if (typeof reporter == 'object') {
    this._reporter = reporter;
  } else {
    throw new Error('invalid reporter type: ' + (typeof reporter))
  }
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

Benchmark.prototype.run = function(iterations) {
  if (iterations < 0) throw new Error('can\'t do '+iterations+' iterations')
  if (this._async) {
    this.async(iterations, this._fn);
  } else {
    this.sync(iterations, this._fn);
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
