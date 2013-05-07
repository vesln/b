
/**
 * add file will pass any extra arguments its given to the 
 * process the benchmarks are run in. This can be exploited
 * to compare run various implementations through the same 
 * benchmark
 */

var Batch = require('../../lib/batch')
  , fs = require('fs')

var file = __dirname + '/bench.js'
var imps = fs.readdirSync(__dirname+'/implementations')

var batch = new Batch('compare').reporter('table')

imps.forEach(function(name){
	var path = __dirname + '/implementations/' + name
	batch.addFile(name, file, path)
})

batch.run(10)
