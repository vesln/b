
var co = require('result-co');
var b = require('../');

/**
 * Synchronous
 */

b('Synchronous benchmark', function() {
  for (var i = 0, len = 1000000; ++i < len;);
}).run(100);

co(function*(){
  /**
   * Asynchronous
   */

  yield b('Asynchronous benchmark', function(i, done) {
    setTimeout(done, 10);
  }).run(10);

  /**
   * in process batch
   */

  yield b('same process batch')
    .add('sync', require('./file-benches/sync'))
    .add('async', require('./file-benches/async'))
    .run(10);

  var dir = __dirname + '/file-benches';

  /**
   * seperate process batch
   */

  yield b('seperate process batch')
    .add('sync', dir + '/sync.js')
    .add('async', dir + '/async.js')
    .run(10);

  /**
   * running several implementations through a
   * single benchmark in seperate processes
   */

  yield require('./compare');
})().read()
