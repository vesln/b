
var exec = require('child_process').exec
  , should = require('chai').should()
  , path = require('path')
  , Comparison = require('../lib/comparison')

describe('comparison', function () {
  it('should work with files', function (done) {
    var example = path.resolve(__dirname, '../examples/compare/index.js')
    exec('node '+example, function(e, out, err){
      if (e) return done(e)
      err.should.equal('')
      out.should.include('nextTick')
      done()
    })
  })
})