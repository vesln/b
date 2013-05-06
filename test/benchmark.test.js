
/**
 * Support
 */

var should = require('chai').should()
  , CLI = require('../lib/reporters/cli')

/**
 * Test Reporter
 */

var TestReporter = require('./support/test_reporter');

/**
 * Subject
 */

var Benchmark = require('..');

describe('Benchmark', function() {
  var reporter = null;

  beforeEach(function() {
    reporter = new TestReporter;
  });

  it('can run benchmarks synchronously', function() {
    new Benchmark('Test synchronous benchmark', function() {
      for (var i = -1, len = 100000; ++i < len;) void(0)
    }).reporter(reporter).run(100);

    reporter.iterations.should.eq(100);
    reporter.name.should.eq('Test synchronous benchmark');
    reporter.result.should.be.a('number');
  });

  it('can run benchmarks asynchronously', function(done) {
    reporter.report = function(name, result, iterations) {
      iterations.should.eq(10);
      name.should.eq('Test asynchronous benchmark');
      result.should.be.a('number');
      done();
    };

    new Benchmark('Test asynchronous benchmark', function(i, finish) {
      setTimeout(finish, 1);
    }).reporter(reporter).run(10);
  });

  it('should give the correct time', function () {
    new Benchmark('Test timer', function() {
      var start = Date.now()
      while (Date.now() - start < 100);
    }).reporter(reporter).run(1);

    reporter.iterations.should.eq(1);
    reporter.result.should.be.a('number');
    reporter.result.should.be.within(9e7, 11e7)
  })

  it('should not allow negative iterations counts', function () {
    (function () {
      new Benchmark('negative', function() {}).reporter(reporter).run(-1);
    }).should.throw(Error, /iterations/i)
  })

  describe('.reporter()', function () {
    it('with a string should load a build in reporter', function () {
      new Benchmark(function cli(){}).reporter('cli')
        ._reporter.should.be.an.instanceOf(CLI)
    })

    it('with a function should create a new reporter', function (done) {
      new Benchmark(function test(){})
        .reporter(function(name, result, iterations){
          name.should.equal('test')
          result.should.be.a('number')
          iterations.should.be.a('number')
          done()
        })
        .run(1)
    })

    it('with an object should use it', function (done) {
      new Benchmark(function test(){}).reporter({
        report: function(name, result, iterations){
          name.should.equal('test')
          result.should.be.a('number')
          iterations.should.be.a('number')
          done()
        }
      }).run(1)
    })

    it('anything else should be an error', function () {
      (function () {
        new Benchmark(function(){}).reporter(1)
      }).should.throw()
    })
  })
});
