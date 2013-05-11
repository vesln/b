
/**
 * Dependencies.
 */

var CLIReporter = require('./reporters/cli')
  , Promise = require('laissez-faire/full')

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

Benchmark.prototype.report = function(res) {
  this._reporter.report(res.name, res.total, res.iterations);
};

/**
 * Run the benchmark and provide the data to the reporter
 *
 * @param {Number} iterations
 * @api public
 */

Benchmark.prototype.run = function(iterations) {
  if (this._async) {
    return this.do(iterations).then(this.report.bind(this))
  } else {
    this.report(this.do(iterations))
  }
};

/**
 * Run the benchmark and return the data
 * 
 * @param {Number} iterations
 * @api public
 */

Benchmark.prototype.do = function(iterations){
  if (iterations < 0) throw new Error('can\'t do '+iterations+' iterations')
  var method = this._async ? 'async' : 'sync'
  return this[method](iterations, this._fn)
}

/**
 * Start the timer.
 *
 * @api private
 */

Benchmark.prototype.start = function() {
  this._start = process.hrtime()
};

/**
 * Stop the timer.
 *
 * @api private
 */

Benchmark.prototype.stop = function() {
  this._end = process.hrtime(this._start)
};

/**
 * Calculate the benchmark result.
 *
 * @returns {Number}
 * @api private
 */

Benchmark.prototype.result = function() {
  return {
    name: this._name,
    total: this._end[0] * 1e9 + this._end[1],
    iterations: this._iterations
  }
};

/**
 * Run synchronous benchmark.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @returns {Object} results
 * @api private
 */

Benchmark.prototype.sync = function(iterations, fn) {
  this._iterations = iterations
  this.start();
  for (var i = 1; i <= iterations; i++) fn(i);
  this.stop();
  return this.result();
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
  var pending = iterations
  var self = this
  var p = new Promise
  if (iterations <= 0) done()

  this.start();

  for (var i = 1; i <= iterations; i++) fn(i, done)

  function done () {
    if (--pending <= 0) {
      self.stop();
      p.fulfill(self.result());
    }
  }

  return p
}

/**
 * Run asynchronous benchmark sequentially.
 *
 * @param {Number} iterations
 * @param {Function} function to be benchmarked
 * @api private
 */

Benchmark.prototype.async = function (iterations, fn) {
  this._iterations = iterations
  var self = this
  var i = 1
  var p = new Promise
  function next() {
    if (++i > iterations) {
      self.stop()
      p.fulfill(self.result())
    } else {
      setImmediate(run)
    }
  }
  function run() { fn(i, next) }
  this.start()
  run()
  return p
}

/**
 * Expose `Benchmark`.
 */

module.exports = Benchmark;
