
var called = false

before(function(i){
	called = true
	if (typeof i != 'number') throw new Error('`i` is\'t a number')
})

run(function(i, done){
	if (!called) throw new Error('before wasn\'t called')
	done()
})