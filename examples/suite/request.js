var http = require('http')
  , https = require('https')

var request = global.request

var port = request === http.request
	? 3001
	: 4001

/**
 * how long does it take to download and buffer
 * the same request using https vs http
 *
 * $ bench -l examples/suite/implementations examples/suite/request
 */

module.exports = function(i, done){
	request({
		hostname: 'localhost',
		port: port,
		method: 'GET',
		agent:false,
		rejectUnauthorized: false
	}, function(res) {
		res.setEncoding('utf8')
		res.on('readable', function () {
			res.read()
		})
		res.on('end', done)
	}).on('error', function(e) {
		throw e
	}).end()
}