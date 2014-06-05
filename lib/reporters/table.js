
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
    head:     ['',     'total (ms)', 'average (ns)',  'diff (%)'],
    colAligns:['left', 'right',      'right',         'right'],
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

  out.write('\n  ' + name)
  out.write(' x' + commaGroups(iterations) + '\n')
  out.write(table.toString().replace(/^/gm, '  ') +'\n')
}

function difference(r1, r2) {
  // can't devide by zero
  return ((r2 - r1) / (r1 || 1)) * 100
}

function formatNumber(x, n) {
  return x === 0 ? '-' : commaGroups(x.toFixed(n))
}

function commaGroups(value) {
  var parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

module.exports = Reporter