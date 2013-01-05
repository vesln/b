
/**
 * Support
 */

var should = require('chai').should();

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
    new Benchmark('Test synchronous benchmark').reporter(reporter).run(100, function() {
      for (var i = -1, len = 100000; ++i < len;) void(0)
    });

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

    new Benchmark('Test asynchronous benchmark').reporter(reporter).run(10, function(i, finish) {
      setTimeout(finish, 1);
    });
  });

  it('should give the correct time', function () {
    new Benchmark('Test timer').reporter(reporter).run(1, function() {
      var start = Date.now()
      while (Date.now() - start < 100);
    });

    reporter.iterations.should.eq(1);
    reporter.result.should.be.a('number');
    reporter.result.should.be.within(9e7, 11e7)
  })

  it('should not allow negative iterations counts', function () {
    (function () {
      new Benchmark('negative').reporter(reporter).run(-1, function() {});
    }).should.throw(Error, /iterations/i)
  })
});
