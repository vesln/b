
var https = require('https')
  , fs = require('fs')
  , resolve = require('path').resolve

var file = resolve(__dirname, '../../../Readme.md')

https.createServer({
  key: fs.readFileSync(__dirname+'/.key.pem'),
  cert: fs.readFileSync(__dirname+'/.cert.pem')
}, function(req, res){
	fs.createReadStream(file).pipe(res)
}).listen(4001)

module.exports = https.request