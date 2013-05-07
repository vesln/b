
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
	var table = new Table({
		head:			['',		'total (ms)', 'average (ns)',	'diff (%)'],
		colWidths:	[16,		14,		14,			14],
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
			formatNumber(r.total / 1e6, 0),
			formatNumber(r.average, 0),
			formatNumber(difference(results[0].total, r.total), 0)
		]
		table.push(entry)
	})
	out.write(table.toString()+'\n')
}

function difference(r1, r2) {
	// r1 can't be 0
	return ((r2-r1) / (r1 || 1)) * 100
}

function formatNumber(x, n) {
	return x === 0 ? '-' : Number(x).toFixed(n)
}

module.exports = Reporter