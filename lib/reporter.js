/*!
 * B - Benchmarks for Node.js.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Reporter
 *
 * @api public
 */
function Reporter() {
  this.out = process.stdout;
};

/**
 * Report the benchmark results.
 *
 * @param {String} name
 * @param {Number} result
 * @param {Number} iterations
 * @api public
 */
Reporter.prototype.report = function(name, result, iterations) {
  var out = this.out;

  [
    '  ' + yellow(name),
    '------------------',
    'Iterations: ' + magenta(iterations),
    'Result:     ' + cyan(result + ' ms'),
    '',
    '',
  ].forEach(function(line) {
    out.write(line + '\n');
  });
};

/**
 * Yellow
 *
 * @param {String} string
 * @returns {String}
 */
function yellow(string) {
  return '\033[33m' + string + '\033[39m';
};

/**
 * Cyan
 *
 * @param {String} string
 * @returns {String}
 */
function cyan(string) {
  return '\033[36m' + string + '\033[39m';
};

/**
 * Magenta
 *
 * @param {String} string
 * @returns {String}
 */
function magenta(string) {
  return '\033[35m' + string + '\033[39m';
};

/**
 * Expose `Reporter`.
 */
module.exports = Reporter;
