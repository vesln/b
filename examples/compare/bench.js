
var implementation = require(process.argv[3])

module.exports = function(i, done){
	implementation(done)
}