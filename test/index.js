/**
 * Test suite for the `is-sorted` package, built on the `tape` framework.
 *
 * Fixture-driven: iterates the table-driven cases in `./fixtures.json`, maps each
 * case's optional comparator name (e.g. `descending`) to a comparator function, calls
 * `sorted(f.array, comparators[f.comparator])`, and asserts the result equals
 * `f.expected` (Source: test/index.js:L8-L15). A dedicated case asserts that non-Array
 * input throws a `TypeError` matching `/Expected Array, got string/`
 * (Source: test/index.js:L17-L22).
 */
const sorted = require('../')
const fixtures = require('./fixtures')
const tape = require('tape')
const comparators = {
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
