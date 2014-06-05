#!/usr/bin/env node

/**
 * provides a child process capable of running
 * tests via inter process communication (IPC)
 * ───────────────────────────────────────────
 */

var Bench = require('../benchmark')
var Result = require('result')

var imp = process.env.subject
var args = process.argv.slice(2)
var target = args.shift()

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
var ex = require(target)
if (!ƒ) ƒ = ex

if (typeof ƒ != 'function') throw new Error('invalid bench: '+target)

/**
 * handle incoming request from the parent process
 */

process.on('message', function(msg){
  if (msg.type == 'run') {
    if (before) {
      // async
      if (before.length > 1) {
        return before(msg.times, function(err){
          if (err) throw err
          run(msg.id, msg.times)
        })
      }
      // sync
      before(msg.times)
    }
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
  var bench = new Bench(id, ƒ)

  try { Result.when(bench.do(iters), send, error) }
  catch (e) { error(e) }

  function send(result){
    process.send({
      type: 'result',
      value: result,
      id: id
    })
  }

  function error(e){
    process.send({
      type: 'error',
      value: {
        message: e.message,
        stack: e.stack
      },
      id: id
    })
  }
}
