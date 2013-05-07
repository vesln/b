
var path = require('path')
  , relative = path.relative
  , ChildBench = require('./child-bench')
  , Bench = require('./benchmark')
  , map = require('map/series/promise')

var cwd = process.cwd()

/**
 * A grouping of benchmarks
 *
 * @param {String} name
 */

function Batch(name){
	this.name = name
	this.benchs = []
}

// borrow from normal benchmark
Batch.prototype.reporter = Bench.prototype.reporter

/**
 * create a same process bench
 *
 * @param {String} name
 * @param {Function} fn
 */

Batch.prototype.add = function(name, fn){
	if (typeof fn == 'string') return this.addFile(name, fn)
	this.benchs.push(new Bench(name, fn))
	return this
}

/**
 * create a childbench
 *
 * @param {String} [name=path]
 * @param {String} path to the file
 */

Batch.prototype.addFile = function(name, path){
	if (arguments.length < 2) path = name, name = relative(cwd, path)
	this.benchs.push(new ChildBench(name, path))
	return this
}

/**
 * get timing data for all benchmarks
 *
 * @param {Number} iters
 * @return {Promise} array of results
 */

Batch.prototype.do = function(iters){
	return map(this.benchs, function(bench){
		return bench.do(iters)
	})
}

/**
 * do() then pass results to the reporter
 */

Batch.prototype.run = function(iterations){
	var self = this
	if (typeof this._reporter != 'object')
		throw new Error('invalid reporter')
	return this.do(iterations).then(function(results){
		self._reporter.report(self.name, results, iterations)
	})
}

module.exports = Batch
