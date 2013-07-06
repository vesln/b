
var fork = require('child_process').fork
  , Result = require('result')
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
	var reqs = this.requests = {}

	this.child = fork(runner, args, options)
		.on('message', function(msg){
			if (msg.type == 'result') {
				var result = reqs[msg.id]
				if (!result) {
					throw new Error('got an answer to a request we didn\'t send')
				}
				msg.result.name = name
				result.write(msg.result)
			} else {
				throw new Error('unknown message ' + JSON.stringify(msg))
			}
		})
		// clean up
		.on('exit', function(code, sig){
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
	var result = this.requests[reqID] = new Result
	this.child.send({
		type: 'run',
		id : reqID,
		times: iters || 1000
	})
	return result
}

/**
 * clean up the child process
 */

ChildBench.prototype.close = function(){
	this.child.disconnect()
	this.child.kill('SIGKILL')
}

module.exports = ChildBench