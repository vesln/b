
var fork = require('child_process').fork
  , Promise = require('laissez-faire/full')
  , genid = require('idgen')

var runner = __dirname+'/child-runner.js'

/**
 * create benchmark that runs in a separate process
 * implements a similar API to benchmark.js
 *
 * @param {String} name
 * @param {String} file absolute path
 * @param {Object} [opts]
 */

function ChildBench(name, file, opts){
	opts || (opts = {})
	var args = [file]
	var options = {}
	// extra process arguments
	if (opts.args) args.push.apply(args, opts.args)
	// bench subject
	if (opts.subject) options.env = {
		subject: opts.subject
	}
	this.child = fork(runner, args, options)
	var reqs = this.requests = {}
	this.child.on('message', function(msg){
		if (msg.type == 'result') {
			var p = reqs[msg.id]
			if (!p) throw new Error('got an answer to a request we didn\'t send')
			var result = msg.result
			result.name = name
			p.fulfill(result)
		} else {
			throw new Error('unknown message ' + JSON.stringify(msg))
		}
	})
	// clean up
	this.child.on('exit', function(code, sig){
		if (code > 0) process.exit(code)
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

/**
 * clean up the child process
 */

ChildBench.prototype.close = function(){
	this.child.disconnect()
	this.child.kill('SIGKILL')
}

module.exports = ChildBench