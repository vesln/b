
/**
 * this benchmark can also be run with the following command
 * though you can't set the name of a comparison benchmark
 * from the CLI
 *
 * $ bench examples/compare/bench.js \
 *     -i examples/compare/implementations \
 *     -k defer
 */

var Comparison = require('../../lib/comparison');
var fs = require('fs');

var file = __dirname + '/bench.js';
var imps = __dirname + '/implementations';

var batch = new Comparison('comparison', file)
	.reporter('table')
	.as('defer');

fs.readdirSync(imps).forEach(function(name){
	batch.addFile(imps + '/' + name);
});

module.exports = batch.run(1000);
