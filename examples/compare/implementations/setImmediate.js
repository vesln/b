var setImm = typeof setImmediate !== 'undefined' ? setImmediate : process.nextTick 
module.exports = function(done){
	setImm(done)
}