/**
 * @file Tape test suite for the `is-sorted` package.
 *
 * Loads data-driven cases from `./fixtures` (`test/fixtures.json`) and, for
 * each fixture record, registers one Tape test that asserts
 * `sorted(f.array, comparators[f.comparator])` equals `f.expected`. Fixtures
 * without a `comparator` selector use the package default (ascending numeric)
 * ordering; fixtures whose `comparator` is `'descending'` use the descending
 * comparator defined below. A final test asserts that a non-Array input throws
 * a `TypeError` matching `/Expected Array, got string/`.
 *
 * Source: test/index.js:L14-L45, test/fixtures.json
 */
const sorted = require('../')
const fixtures = require('./fixtures')
const tape = require('tape')
const comparators = {
  /**
   * Descending numeric comparator, selected by fixtures whose `comparator`
   * value is `'descending'`. It is the inverse of the package default
   * ascending comparator (`a - b`, see index.js:L13-L15).
   *
   * @param {number} a - Left-hand (previous) element of an adjacent pair.
   * @param {number} b - Right-hand (current) element of an adjacent pair.
   * @returns {number} Positive when `a < b`, negative when `a > b`, and `0`
   *   when the two values are equal.
   */
  descending: function (a, b) { return b - a }
}

for (const f of fixtures) {
  tape('returns ' + f.expected + ' for ' + f.array, function (t) {
    t.plan(1)

    const actual = sorted(f.array, comparators[f.comparator])
    t.equal(actual, f.expected)
  })
}

tape('throws on non-Array inputs', function (t) {
  t.plan(1)
  t.throws(function () {
    sorted('foobar')
  }, /Expected Array, got string/)
})
