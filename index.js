/**
 * Default comparator used when the caller does not supply one.
 *
 * Implements standard ascending numeric ordering by returning the arithmetic
 * difference of its arguments, mirroring the `Array.prototype.sort` callback
 * contract (Source: index.js:L1-L3).
 *
 * @private
 * @param {number} a - Left-hand value of the adjacent pair.
 * @param {number} b - Right-hand value of the adjacent pair.
 * @returns {number} Negative when `a` sorts before `b`, zero when equal,
 *   positive when `a` sorts after `b`.
 */
function defaultComparator (a, b) {
  return a - b
}

/**
 * Check whether an array is already sorted according to a comparator.
 *
 * Validates the input with `Array.isArray` (Source: index.js:L6), defaults the
 * comparator to ascending numeric order (Source: index.js:L7), then performs a
 * single O(n) left-to-right pass over adjacent pairs, returning `false` on the
 * first out-of-order pair and `true` otherwise (Source: index.js:L9-L13).
 *
 * @param {Array} array - The array to test for sortedness.
 * @param {Function} [comparator=defaultComparator] - Optional comparator
 *   `(a, b) => number` following `Array.prototype.sort` semantics: negative when
 *   `a` sorts before `b`, zero when equal, positive when `a` sorts after `b`.
 *   Defaults to ascending numeric order.
 * @returns {boolean} `true` when sorted (empty and single-element arrays are
 *   always sorted); otherwise `false`.
 * @throws {TypeError} When `array` is not an Array (`Expected Array, got <type>`).
 *
 * @example
 * const sorted = require('is-sorted')
 *
 * sorted([1, 2, 3]) // => true
 * sorted([3, 1, 2]) // => false
 *
 * // supports custom comparators
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
