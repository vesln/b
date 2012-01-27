/*!
 * B - Benchmarks for Node.js.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

var benchmark = null;
var benchmark = Benchmark = require('../');
var b = benchmark('Simple bench.');

b.start();
for (var i = -1; ++i < 10000000;) var foo = 3;
b.end();

benchmark(function(done) {
  for (var i = -1; ++i < 10000000;) var foo = 3;
  done();
});

b = new Benchmark('Testing cool stuff', process.stdout, function(done) {
  for (var i = -1; ++i < 10000000;) var foo = 3;
  done();
}).run();


var bench = new Benchmark('Test', function(done) {
  for (var i = -1; ++i < 10000000;) var foo = 3;
  done();
}).run();