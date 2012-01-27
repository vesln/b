/*!
 * B - Benchmarks for Node.js.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Benchmark constructor.
 * 
 * Examples:
 * 
 * 
 * 
 * @param {String} name [optional]
 * @param {Object} writable stream [optional]
 * @param {Function} functionality to benchmark [optional]
 */
function Benchmark(name, stream, cb) {
  if ('function' === typeof stream || null === stream) {
    cb = stream;
    stream = process.stdout;
  }
  this.name = name;
  this.stream = stream;
  this.cb = cb;
  this._start = null;
  this._end = null;
  this._time = null;
};

/**
 * Runs the benchmark. Usually used with when testing
 * asynchronous code.
 * 
 * @returns `this`
 * @api public
 */
Benchmark.prototype.run = function() {
  var self = this;
  var done = function() {
    self.end().done();
  };
  this.start().cb(done);
};

/**
 * Called when a benchmark is done.
 * 
 * @api public
 */
Benchmark.prototype.done = function() {
  this.time = this._end - this._start;
  this.print();
  return this;
};

/**
 * Prints the results from the benchmark.
 * 
 * @returns `this`
 * @api private
 */
Benchmark.prototype.print = function() {
  var out = '';
  if (this.name) out += this.name + ' ';
  out += this.time + 'ms';
  this.stream.write(out);
  return this;
};

/**
 * Starts the timer.
 * 
 * @returns `this`
 * @api public
 */
Benchmark.prototype.start = function(name) {
  this._start = Date.now();
  return this;
};

/**
 * Stops the timer.
 * 
 * @returns `this`
 * @api public
 */
Benchmark.prototype.end = function() {
  this._end = Date.now();
  
  // If benchmarking syncrhonous code calls done and otuputs the results.
  if ('function' !== typeof this.cb) {
    return this.done();
  }
  
  return this;
};

/**
 * Expose `Benchmark`.
 */
module.exports = Benchmark;