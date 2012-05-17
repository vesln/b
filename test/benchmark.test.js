/*!
 * B - Benchmarks for Node.js.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Support
 */
var should = require('chai').should();

/**
 * Test Reporter
 *
 * @type {Function}
 */
var TestReporter = require('./support/test_reporter');

/**
 * Subject
 *
 * @type {Function}
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

    new Benchmark('Test asynchronous benchmark').reporter(reporter).run(10, function(finish) {
      setTimeout(finish, 1);
    });
  });
});
