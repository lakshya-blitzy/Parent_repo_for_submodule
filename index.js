/**
 * Default comparator performing a numeric ascending comparison.
 *
 * Follows `Array.prototype.sort` comparator semantics: returns a negative
 * number when `a` should sort before `b`, zero when they are equal, and a
 * positive number when `a` should sort after `b`.
 *
 * @private
 * @param {*} a - The left-hand value of an adjacent pair.
 * @param {*} b - The right-hand value of an adjacent pair.
 * @returns {number} The difference `a - b` (negative, zero, or positive).
 */
function defaultComparator (a, b) {
  return a - b
}

/**
 * Determine whether an array is sorted according to a comparator.
 *
 * Performs a single O(n) left-to-right pass, comparing each adjacent pair.
 * Returns `false` as soon as any pair is out of order (that is, when
 * `comparator(array[i - 1], array[i]) > 0`); otherwise returns `true`.
 * Empty arrays and single-element arrays are always considered sorted.
 *
 * @param {Array} array - The array to check for sorted order.
 * @param {(a, b) => number} [comparator] - Optional comparator following
 *   `Array.prototype.sort` semantics. Defaults to numeric ascending (`a - b`).
 * @returns {boolean} `true` if the array is sorted, otherwise `false`.
 * @throws {TypeError} If `array` is not an Array (message: `Expected Array, got <type>`).
 * @example
 * const sorted = require('is-sorted')
 *
 * sorted([1, 2, 3])
 * // => true
 *
 * sorted([3, 1, 2])
 * // => false
 *
 * // supports custom comparators
 * sorted([3, 2, 1], function (a, b) { return b - a })
 * // => true
 */
module.exports = function checksort (array, comparator) {
  if (!Array.isArray(array)) throw new TypeError('Expected Array, got ' + (typeof array))
  comparator = comparator || defaultComparator

  for (let i = 1, length = array.length; i < length; ++i) {
    if (comparator(array[i - 1], array[i]) > 0) return false
  }

  return true
}
