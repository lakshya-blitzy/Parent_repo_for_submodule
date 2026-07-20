/**
 * Default comparator used when the caller does not supply one.
 *
 * Produces an ascending numeric ordering by returning the arithmetic
 * difference of its operands, matching the `Array.prototype.sort` contract:
 * negative when `a` precedes `b`, positive when `a` follows `b`, `0` when equal.
 *
 * @private
 * @param {number} a - Left-hand (previous) element of an adjacent pair.
 * @param {number} b - Right-hand (current) element of an adjacent pair.
 * @returns {number} Negative when `a < b`, zero when equal, positive when `a > b`.
 */
function defaultComparator (a, b) {
  return a - b
}

/**
 * Check whether an array is already sorted.
 *
 * Performs a single left-to-right pass over `array`, comparing each adjacent
 * pair with `comparator`. The array is considered sorted when no adjacent pair
 * is out of order (the comparator never returns a value greater than `0`). By
 * default an ascending numeric comparator is used; pass a custom comparator to
 * check other orderings (for example, descending). Empty and single-element
 * arrays are trivially sorted. The input array is only read, never mutated.
 *
 * @param {Array} array - The array to inspect for sortedness.
 * @param {Function} [comparator] - Optional `(a, b) => number` comparator. Returns
 *   a negative number when `a` should precede `b`, `0` when they are equivalent,
 *   and a positive number when `a` should follow `b`. Defaults to ascending order.
 * @returns {boolean} `true` when every adjacent pair is in order, otherwise `false`.
 * @throws {TypeError} When `array` is not an Array (message: `Expected Array, got <type>`).
 * @example
 * const sorted = require('is-sorted')
 *
 * sorted([1, 2, 3]) // => true
 * sorted([3, 1, 2]) // => false
 *
 * // custom (descending) comparator
 * sorted([3, 2, 1], function (a, b) { return b - a }) // => true
 */
module.exports = function checksort (array, comparator) {
  if (!Array.isArray(array)) throw new TypeError('Expected Array, got ' + (typeof array))
  comparator = comparator || defaultComparator

  for (let i = 1, length = array.length; i < length; ++i) {
    if (comparator(array[i - 1], array[i]) > 0) return false
  }

  return true
}
