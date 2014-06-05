
var should = require('chai').should()
  , Batch = require('../lib/batch')

var sync = __dirname + '/support/sync-file.js'
var async = __dirname + '/support/async-file.js'

describe('batch', function () {
  it('return a promise for an array of results', function (done) {
    new Batch('test batch')
      .add('sync', function(i){
        var start = Date.now()
        while (Date.now() - start < 10);
      })
      .add('async', function(i, done){
        setTimeout(done, 10 - i)
      })
      .do(3).then(function(results){
        results.should.be.a('array')
          .and.have.a.lengthOf(2)
          .and.have.property(0)
            .and.have.property('name', 'sync')
      }).node(done)
  })

  it('should handle child process benchmarks', function (done) {
    new Batch('test batch')
      .add('sync', sync)
      .add('async', async)
      .do(3).then(function(results){
        results.should.be.a('array')
          .and.have.a.lengthOf(2)
          .and.have.property(0)
            .and.have.property('name', 'sync')
      }).node(done)
  })

  describe('.run(Number)', function () {
    it('should pass the batches results to the reporter', function (done) {
      new Batch('test batch')
        .add('sync', sync)
        .add('async', async)
        .reporter(function(name, results, iterations){
          iterations.should.equal(3)
          name.should.equal('test batch')
          results.should.be.a('array')
            .and.have.a.lengthOf(2)
          done()
        })
        .run(3)
    })

    it('close its child processes cleanly on completion', function (done) {
      var batch = new Batch('test batch')
        .add('sync', sync)
        .add('async', async)
        .reporter(function(name, results, iterations){})
      batch.run(3).then(function(){
        batch.benchs.forEach(function(bench){
          bench.child.killed.should.be.true
          bench.child.connected.should.be.false
        })
      }).node(done)
    })
  })
})
