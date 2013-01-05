
/**
 * Fake Stream
 *
 * @constructor
 */

function FakeStream() {
  this.out = [];
};

/**
 * Write
 *
 * @param {String} input
 * @api public
 */

FakeStream.prototype.write = function(input) {
  this.out.push(normalize(input));
};

/**
 * Normalize a string:
 *
 * - strip colors
 * - normalize whitespaces
 * - remove new lines
 *
 * @param {String}
 * @returns {String}
 */

function normalize(string) {
  return string.replace(/\x1B\[[0-9;]*[mK]/g, '')
    .replace(/\s+/, ' ')
    .replace(/^[ \t]+/, '')
    .replace('\n', '');
};

/**
 * Expose `FakeStream`.
 */

module.exports = FakeStream;
