// Test harness for the is-sorted module, built on the `tape` framework.
// Documentation-only comments; the test logic is unchanged (Source: test/index.js).
//
// Imports:
// - sorted: the exported checksort function under test (Source: index.js:L5)
// - fixtures: the 12 table-driven cases that drive the suite (Source: test/fixtures.json)
// - tape: the TAP-producing assertion library (devDependency; Source: package.json:L32)
const sorted = require('../')
const fixtures = require('./fixtures')
const tape = require('tape')

// Named comparators referenced by a fixture's `comparator` field.
// `descending` orders largest-first (b - a) and is the inverse of the module's
// built-in ascending default `a - b` (Source: index.js:L1-L3), so descending
// fixtures must request it explicitly. A fixture without a `comparator` field
// looks up `undefined` here, exercising that ascending default instead.
const comparators = {
  descending: function (a, b) { return b - a }
}

// Fixture-driven loop: emit one `tape` subtest per case in test/fixtures.json
// (12 cases total). Each subtest plans exactly one assertion with t.plan(1),
// calls sorted(f.array, comparators[f.comparator]), and asserts the returned
// boolean equals the case's `expected` value (Source: test/fixtures.json).
for (const f of fixtures) {
  tape('returns ' + f.expected + ' for ' + f.array, function (t) {
    t.plan(1)

    // comparators[f.comparator] is `undefined` when a case omits `comparator`,
    // so the module applies its ascending default (Source: index.js:L7).
    const actual = sorted(f.array, comparators[f.comparator])
    t.equal(actual, f.expected)
  })
}

// Input-validation case: sorted() must reject non-Array input by throwing a
// TypeError whose message matches /Expected Array, got string/. This exercises
// the Array.isArray guard in the module (Source: index.js:L6).
tape('throws on non-Array inputs', function (t) {
  t.plan(1)
  t.throws(function () {
    sorted('foobar')
  }, /Expected Array, got string/)
})
