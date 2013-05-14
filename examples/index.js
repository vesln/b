
/**
 * Benchmark.
 */

var b = require('../');

/**
 * Synchronous
 */

b('Synchronous benchmark', function() {
  for (var i = 0, len = 1000000; ++i < len;) {}
}).run(100);

/**
 * Asynchronous
 */

b('Asynchronous benchmark', function(i, done) {
  setTimeout(done, 10);
})
.run(10)
.then(function(){
	return batch.run(10);
})
.then(function(){
	return files.run(10);
})
.then(function(){
	require('./compare');
});

/**
 * in process batch
 */

var batch = b('same process batch')
	.add('sync', require('./file-benches/sync'))
	.add('async', require('./file-benches/async'));

var dir = __dirname + '/file-benches';

/**
 * seperate process batch
 */

var files = b('seperate process batch')
	.add('sync', dir + '/sync.js')
	.add('async', dir + '/async.js');
