
/**
 * this benchmark can also be run with the following command
 * though you can't set the name of a comparison benchmark
 * from the CLI
 * 
 * $ bench examples/compare/bench.js \
 *     -i examples/compare/implementations \
 *     -k defer
 */

var Comparison = require('../../lib/comparison')
  , fs = require('fs')

var file = __dirname + '/bench.js'
var imps = fs.readdirSync(__dirname+'/implementations')

var batch = new Comparison('defer execution', file)
	.reporter('table')
	.as('defer')

imps.forEach(function(name){
	var path = __dirname + '/implementations/' + name
	batch.addFile(path)
})

batch.run(1000)
