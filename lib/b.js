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
  switch (arguments.length) {
    case 1:
      cb = name;
      name = null;
      stream = process.stdout;
      break;
    case 2:
      cb = stream;
      stream = process.stdout;
      break;
  }
  
  this.name = name;
  this.stream = stream;
  this.cb = cb;
  this.start = null;
  this.end = null;
  this.time = null;
};

/**
 * Runs the benchmark. Usually used with when testing
 * asynchronous code.
 * 
 * @returns `this`
 * @api public
 */
Benchmark.prototype.run = function() {
  
};

/**
 * Called when a benchmark is done.
 * 
 * @api public
 */
Benchmark.prototype.done = function() {
  this.time = this.end - this.start;
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
  if (name) out += name;
  out += ' ' + this.format(this.time);
};

/**
 * Formats a benchmark time.
 * 
 * Examples:
 * 
 * var b = new B;
 * b.format(3000);    // 300ms
 * 
 * @param {Number} time to format.
 * @returns {String} formatted time. 
 */
Benchmark.prototype.format = function(time) {
  
};

/**
 * Starts the timer.
 * 
 * @returns `this`
 * @api public
 */
Benchmark.prototype.start = function(name) {
  this.start = Date.now();
  return this;
};

/**
 * Stops the timer.
 * 
 * @returns `this`
 * @api public
 */
Benchmark.prototype.end = function() {
  this.end = Date.now();
  
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