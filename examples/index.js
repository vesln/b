
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
}).run(10).then(function(){
	console.log('')
	batch.run(10).then(function(){
		console.log('')
		var dir = __dirname + '/file-benches'
		b('file batch')
			.add('sync', dir + '/sync.js')
			.add('async', dir + '/async.js')
			.run(10).then(function(){
				console.log('')
			})
	})
})

/**
 * mixed batch
 */

var batch = b('batch')
	.add('sync', function(i){
		var start = Date.now()
		while (Date.now() - start < 10);
	})
	.add('async', function(i, done){
		setTimeout(done, 10 - i)
	})
