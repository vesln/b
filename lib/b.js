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
 * Async:
 * 
 *    var benchmark = new Benchmark('Benchmarking a thing', proccess.stdout, function(done) {
 *      // do stuff
 *      done();
 *    });
 * 
 *    benchmark.run();
 * 
 * Sync:
 * 
 *    var benchmark = new Benchmark;
 *    benchmark.start();
 *    // do stuff
 *    benchmark.end();
 * 
 * You can also omit stream and name.
 * 
 *    var benchmark = new Benchmark(function(done) { // do stuff; done() });
 * 
 * @param {String} name [optional]
 * @param {Object} writable stream [optional]
 * @param {Function} functionality to benchmark [optional]
 */
function Benchmark(name, stream, cb) {
  var run = false;
  
  if ('function' === typeof name) {
    cb = name;
    name = null;
    run = true;
  }
  
  if ('function' === typeof stream) {
    cb = stream;
    stream = null;
  }
  
  this.name = name;
  this.stream = stream || process.stdout;
  this.cb = cb;
  this._start = null;
  this._end = null;
  this._time = null;
  
  // Checks if the only one passed argument is callback and if so
  // it assumes that the module is used as that:
  //
  //    benchmark(function() { });
  //
  // So it will run the benchmark automatically.
  if (run) this.run();
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
  out += this.time + 'ms\n';
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
  if ('function' !== typeof this.cb) return this.done();
  
  return this;
};

/**
 * Expose `Benchmark`.
 */
module.exports = Benchmark;