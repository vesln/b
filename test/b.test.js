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
 * Benchmark
 *
 * @type {Function}
 */
var Benchmark = require('../lib/benchmark');

/**
 * Reporter
 *
 * @type {Function}
 */
var Reporter = require('../lib/reporter');

/**
 * Subject
 *
 * @type {Function}
 */
var b = require('..');

describe('b', function() {
  it('exposes Benchmark', function() {
    b.Benchmark.should.eq(Benchmark);
  });

  it('exposes Reporter', function() {
    b.Reporter.should.eq(Reporter);
  });

  it('returns a new benchmark', function() {
    b().should.be.an.instanceof(Benchmark);
  });

  it('sets the supplied benchmark description', function() {
    b('Test')._name.should.eq('Test');
  });

  it('sets the default reporter', function() {
    b()._reporter.should.be.an.instanceof(Reporter);
  });
});
