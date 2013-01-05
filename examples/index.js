
/**
 * Benchmark.
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

b('Asynchronous benchmark').run(10, function(i, done) {
  setTimeout(done, 10);
});
