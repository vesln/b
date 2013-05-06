
/**
 * Support
 */

var should = require('chai').should();

/**
 * Fake Stream.
 */

var FakeStream = require('./support/fake_stream');

/**
 * Subject.
 */

var Reporter = require('../lib/reporters/cli');

describe('Reporter', function() {
  var stream = null;
  var reporter = null;

  beforeEach(function() {
    stream = new FakeStream;
    reporter = new Reporter;
  });

  it('writes to stdout', function(done) {
    var finished = false;

    reporter.out.should.eq(process.stdout);

    stream.write = function() {
      if (!finished) {
        finished = true;
        done();
      };
    };

    reporter.out = stream;
    reporter.report();
  });

  it('formats the results properly', function() {
    reporter.out = stream;
    reporter.report('Test benchmark', 1000000, 100);
    var buf = stream.out.join('');
    buf.should.include('Test benchmark');
    buf.should.include('x 100');
    buf.should.match(/Total: +1 ms/);
  });
});
