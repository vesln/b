
/**
 * prints results in a unicode table. Only works 
 * with batch benchmark data
 */

var Table = require('cli-table')

function Reporter(){
	this.out = process.stdout
}

Reporter.prototype.report = function(name, results, iterations){
	var out = this.out
	
	// get the length of the longest name
	var nameWidth = results.reduce(function(max, result){
		var len = result.name.length
		return len > max ? len : max
	}, 0)

	var table = new Table({
		head:			['',		'total (ms)', 'average (ns)',	'diff (%)'],
		colWidths:	[nameWidth + 3,		14,		14,			11],
		colAligns:	['left', 'right', 'right',		'right'],
		style: {
			'padding-left': 1,
			'padding-right': 1,
			head: ['cyan'],
			compact : true
		}
	})

	results.sort(function (a,b) {
		return a.total - b.total
	}).forEach(function(r) {
		var entry = {}
		entry[r.name] = [
			// total
			formatNumber(r.total / 1e6, 0),
			// mean
			formatNumber(r.total / iterations, 0),
			// diff to fastest
			formatNumber(difference(results[0].total, r.total), 0)
		]
		table.push(entry)
	})
	out.write(table.toString().replace(/^/gm, '  ') +'\n')
}

function difference(r1, r2) {
	// can't devide by zero
	return ((r2 - r1) / (r1 || 1)) * 100
}

function formatNumber(x, n) {
	return x === 0 ? '-' : Number(x).toFixed(n)
}

module.exports = Reporter