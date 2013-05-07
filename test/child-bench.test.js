
var should = require('chai').should()
  , Bench = require('../lib/child-bench')

var sync = __dirname + '/support/sync-file.js'
var async = __dirname + '/support/async-file.js'

describe('file bench', function () {
	describe('.do()', function () {
		it('should return a promise for result data', function (done) {
			new Bench('sync', sync).do(10).then(function(res){
				res.should.be.a('object')
				res.should.have.keys([
					'name',
					'total',
					'iterations'
				])
				res.name.should.equal('sync')
				res.total.should.be.a('number')
				res.iterations.should.equal(10)
			}).node(done)
		})

		it('should be able to call it more than once', function (done) {
			var bench = new Bench('sync', sync)
			bench.do(10).then(function(a){
				return bench.do(5).then(function(b){
					b.should.be.a('object')
					a.should.not.equal(b)
				})
			}).node(done)
		})

		it('should handle async benchmarks', function (done) {
			new Bench('async', async).do(10).then(function(res){
				res.should.be.a('object')
				res.total.should.be.a('number')
					.and.be.within(80e6, 200e6)
			}).node(done)
		})
	})

	describe('.close()', function () {
		it('should terminate its child process', function () {
			var bench = new Bench('async', async)
			bench.close()
			bench.child.connected.should.be.false
			bench.child.killed.should.be.true
		})
	})
})