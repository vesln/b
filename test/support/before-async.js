
var called = false

before(function(i, done){
	called = true
	if (typeof i != 'number') done(new Error('`i` is\'t a number'))
	else done(null)
})

run(function(i, done){
	if (!called) throw new Error('before wasn\'t called')
	done()
})