
/**
 * prints results in a Github-flavored markdown table. Only works
 * with batch benchmark data
 */

function Reporter(){
  this.out = process.stdout
}

Reporter.prototype.report = function(name, results, iterations){
  var out = this.out

  out.write('\n' + name + ' x' + commaGroups(iterations))
  out.write('|total (ms)|average (ns)| diff (%)\n')
  out.write(':--|--:|--:|--:\n')

  results.sort(function (a,b) {
    return a.total - b.total
  }).forEach(function(r) {
    out.write(r.name);
    out.write('|' + formatNumber(r.total / 1e6, 0))
    out.write('|' + formatNumber(r.total / iterations, 0))
    // diff to fastest
    out.write('|' + formatNumber(difference(results[0].total, r.total), 0))
    out.write('\n')
  })
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
