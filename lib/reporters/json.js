
/**
 * Reporter constructor.
 *
 * @constructor
 */

function Reporter () {}

/**
 * Report the benchmark results.
 *
 * @param {String} name
 * @param {Number} result
 * @param {Number} iterations
 * @api public
 */

Reporter.prototype.report = function(name, result, iterations) {
  process.stdout.write(JSON.stringify({
    name: name,
    total: result,
    iterations: iterations,
    average: result / iterations
  }))
}

/**
 * Export `Reporter`.
 */

module.exports = Reporter
