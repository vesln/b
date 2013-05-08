
/**
 * This batch is equivilent to the cli command
 * 
 * $ bench examples/suite/request.js \
 *     --key request \
 *     --implementations examples/suite/implementations \
 *     --cycles 100
 */

var Batch = require('../../lib/batch')

var batch = new Batch('requests')
	.load('request', [
		__dirname + '/implementations/http.js',
		__dirname + '/implementations/https.js'
	])
	.addFile('request', __dirname + '/request.js')
	.reporter('table')
	.run(1e2)