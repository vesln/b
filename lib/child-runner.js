
/**
 * provides a child process capable of running 
 * tests via inter process communication (IPC)
 * ───────────────────────────────────────────
 */

var Bench = require('./benchmark.js')
var Result = require('result')

var args = process.argv.slice(2);
var target = args.shift();
var imp = process.env.subject;

var before = function(){}

/**
 * allow benchmark to set a function to be called
 * before each run. NB: not before each iteration
 */

global.before = function(fn){
	before = fn
}

// load implementation into the global namespace
if (imp && (/(\w+):(.+)/).exec(imp)) {
	global[RegExp.$1] = require(RegExp.$2)
}

// make args available as $1, $2, ...
args.forEach(function(arg, i){
	if (!isNaN(Number(arg))) arg = Number(arg)
	global['$' + (i + 1)] = arg
})

/**
 * allow setting benchmark with a call to `run`
 */
var ƒ
global.run = function(fn){
	ƒ = fn
}

// load benchmark
var ex = require(target);
if (!ƒ) ƒ = ex

if (typeof ƒ != 'function') throw new Error('invalid bench: '+target)

/**
 * handle incoming request from the parent process
 */

process.on('message', function(msg){
	if (msg.type == 'run') {
        var next = function (err) {
            if (err) {
                throw new Error('error in before ' + err)
            }
            run(msg.id, msg.times)
        };
        if (before) {
            if (before.length > 1) {
                before(msg.times, next);
            } else {
                before(msg.times)
                next();
            }
        } else {
            next();
        }
	} else {
		throw new Error('strange message ' + JSON.stringify(msg))
	}
})

/**
 * execute the benchmark
 * 
 * @param {String} id
 * @param {Number} iters
 */

function run(id, iters){
	var bench = new Bench(id, ƒ)
	var result = bench.do(iters)
	if (bench._async) {
        result.then(send, function (err){
            var res = new Result
            res.value = err.toString()
            res.state = 'fail'
            send(res);
        })
	} else {
		send(result)
	}
	function send(result){
		process.send({
			type: 'result',
			id: id,
			result: result
		})
	}
}
