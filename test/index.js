const sorted = require('../')
const fixtures = require('./fixtures')
const tape = require('tape')
const comparators = {
  /**
   * Descending numeric comparator used by the fixture-driven cases below.
   *
   * Follows the same contract as an `Array.prototype.sort` comparator and is the
   * inverse of the module's default ascending order (`a - b`): it returns
   * `b - a`, i.e. a negative number when `a` should sort before `b` (`a > b`), a
   * positive number when `a` should sort after `b` (`a < b`), or `0` when equal.
   *
   * @param {number} a - Preceding element of the adjacent pair (`array[i - 1]`).
   * @param {number} b - Following element of the adjacent pair (`array[i]`).
   * @returns {number} The difference `b - a`.
   */
  descending: function (a, b) { return b - a }
}

// One tape assertion per fixture: sorted(array, comparator) must equal the
// fixture's expected boolean; a missing comparator name yields `undefined`,
// exercising the module's default ascending order (Source: test/fixtures.json).
for (const f of fixtures) {
  tape('returns ' + f.expected + ' for ' + f.array, function (t) {
    t.plan(1)

    const actual = sorted(f.array, comparators[f.comparator])
    t.equal(actual, f.expected)
  })
}

// Input-validation contract: non-Array input throws a TypeError whose message
// matches /Expected Array, got string/ (Source: index.js:L52; test/index.js:L34-L39).
tape('throws on non-Array inputs', function (t) {
  t.plan(1)
  t.throws(function () {
    sorted('foobar')
  }, /Expected Array, got string/)
})
