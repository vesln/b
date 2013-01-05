
/**
 * Support
 */

var should = require('chai').should();

/**
 * Benchmark
 */

var Benchmark = require('../lib/benchmark');

/**
 * Reporter
 */

var Reporter = require('../lib/reporters/cli');

/**
 * Subject
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
