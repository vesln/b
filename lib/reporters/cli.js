
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
  var title = name + ' x ' + iterations;
  [
    '',
    yellow(name) + ' x ' + iterations,
    repeat('-', title.length).join(''),
    'Total:      ' + cyan(result / 1e6 + ' ms'),
    // 'Average:    ' + cyan(result / iterations + ' ns')
  ].forEach(function(line) {
    out.write('  ' + line + '\n');
  });
};

/**
 * Repeat
 *
 * @param {Any} l
 * @param {Number} i
 * @returns {Array}
 */

function repeat(l, i){
  var res = [];
  while (i--) res.push(l);
  return res;
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
