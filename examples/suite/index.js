
/**
 * This batch is equivilent to the cli command
 * 
 * $ bench examples/suite/request.js \
 *     --key request \
 *     --implementations examples/suite/implementations \
 *     --cycles 100
 */

var Comparison = require('../../lib/comparison')

var batch = new Comparison('requests', __dirname + '/request.js')
	.as('request')
	.addFile(__dirname + '/implementations/http.js')
	.addFile(__dirname + '/implementations/https.js')
	.reporter('table')
	.run(1e2)