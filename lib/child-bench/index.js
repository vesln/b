
var fork = require('child_process').fork
  , Result = require('result')
  , genid = require('idgen')

var runner = __dirname + '/process.js'

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
  if (opts.subject) options.env = { subject: opts.subject }
  var reqs = this.requests = {}

  this.child = fork(runner, args, options)
    .on('message', function(msg){
      var result = reqs[msg.id]
      msg.value.name = name
      switch (msg.type) {
        case 'result': result.write(msg.value); break
        case 'error':
          var err = new Error(msg.value.message)
          err.stack = msg.value.stack
          result.error(err)
          break
        default:
          throw new Error('unknown message ' + JSON.stringify(msg))
      }
    })
    // clean up
    .on('exit', function(code){
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