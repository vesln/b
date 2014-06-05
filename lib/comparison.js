
var basename = require('path').basename
  , ChildBench = require('./child-bench')
  , Batch = require('./batch')

/**
 * create a comparison of several implementations through
 * a single benchmark
 *
 * @param {String} name
 * @param {String} file absolute path
 */

function Comparison(name, file){
  this.name = name
  this.bench = file
  this.benchs = []
  this._loadname = 'implementation'
}

// borrow from batch
Comparison.prototype.reporter = Batch.prototype.reporter
Comparison.prototype.do = Batch.prototype.do
Comparison.prototype.run = Batch.prototype.run
Comparison.prototype.close = Batch.prototype.close

/**
 * change the name implementations are loaded under
 *
 * @param {String} name
 * @return {this}
 */

Comparison.prototype.as = function(name){
  this._loadname = name
  return this
}

/**
 * add an implementation from a file to the comparison
 *
 * @param {String} [name=basename(file)]
 * @param {String} file absolute path
 * @return {this}
 */

Comparison.prototype.addFile = function(name, file){
  if (!file) {
    file = name
    name = basename(file).replace(/\.js$/, '')
  }
  this.benchs.push(new ChildBench(name, this.bench, {
    args: [].slice.call(arguments, 2),
    subject: this._loadname + ':' + file
  }))
  return this
}

module.exports = Comparison