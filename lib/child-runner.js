
/**
 * provides a child process capable of running 
 * tests via inter process communication (IPC)
 * ───────────────────────────────────────────
 */

var Bench = require('./benchmark.js')

var args = process.argv.slice(2);
var target = args.shift();
var imp = process.env.subject;

// load implementation into the global namespace
if (imp && (/(\w+):(.+)/).exec(imp)) {
	global[RegExp.$1] = require(RegExp.$2)
}

// make args available as $1, $2, ...
args.forEach(function(arg, i){
	if (!isNaN(Number(arg))) arg = Number(arg)
	global['$' + (i + 1)] = arg
})

// load benchmark
var ƒ = require(target);

/**
 * send benchmark result to the parent process
 *
 * @param {String} id
 * @param {Number} time
 */

function send(id, total, iters){
	process.send({
		type: 'result',
		id: id,
		result: {
			total: total,
			iterations: iters
		}
	})
}

/**
 * handle incoming request from the parent process
 */

process.on('message', function(msg){
	if (msg.type == 'run') {
		run(msg.id, msg.times)
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
	new Bench(id, ƒ)
		.reporter(send)
		.run(iters)
}
