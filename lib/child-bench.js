
var fork = require('child_process').fork
  , Promise = require('laissez-faire/full')
  , genid = require('idgen')

var runner = __dirname+'/child-runner.js'
var options = {}

/**
 * create benchmark that runs in a separate process
 * implements a similar API to benchmark.js
 *
 * @param {String} name
 * @param {String} file absolute path
 */

function ChildBench(name, file){
	this.child = fork(runner, [file], options)
	var reqs = this.requests = {}
	this.child.on('message', function(msg){
		if (msg.type == 'result') {
			var p = reqs[msg.id]
			if (!p) throw new Error('go an answer to a request we didn\'t send')
			var result = msg.result
			result.name = name
			p.fulfill(result)
		} else {
			throw new Error('unknown message ' + JSON.stringify(msg))
		}
	})
	this.child.on('error', function(e){
		throw e
	})
}

/**
 * run the benchmark `iters` times
 *
 * @param {Number} [iters=1000]
 * @return {Promise} for the timing info
 */

ChildBench.prototype.do = function(iters){
	var reqID = genid()
	var p = this.requests[reqID] = new Promise
	this.child.send({
		type: 'run',
		id : reqID,
		times: iters || 1000
	})
	return p
}

module.exports = ChildBench