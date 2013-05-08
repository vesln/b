
var http = require('http')
  , fs = require('fs')
  , resolve = require('path').resolve

var file = resolve(__dirname, '../../../Readme.md')

http.createServer(function(req, res){
	fs.createReadStream(file).pipe(res)
}).listen(3001)

module.exports = http.request