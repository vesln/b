/*!
 * B - Benchmarks for Node.js.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * B
 *
 * @type {Object}
 */
var b = require('../');

/**
 * Synchronous
 */
b('Synchronous benchmark').run(100, function() {
  for (var i = 0, len = 1000000; ++i < len;) {}
});

/**
 * Asynchronous
 */
b('Asynchronous benchmark').run(10, function(done) {
  setTimeout(done, 10);
});
