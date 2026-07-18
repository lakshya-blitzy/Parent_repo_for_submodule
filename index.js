/**
 * A compact module to check if an Array is sorted.
 *
 * @module is-sorted
 */

/**
 * Default comparator implementing ascending numeric order.
 *
 * Returns the arithmetic difference of its operands, matching the sign
 * convention used by `Array.prototype.sort`: a negative result means `a`
 * precedes `b`, zero means they are equal, and a positive result means `a`
 * should come after `b`.
 *
 * @private
 * @param {number} a - Left-hand value of the adjacent pair.
 * @param {number} b - Right-hand value of the adjacent pair.
 * @returns {number} The difference `a - b`; a value `> 0` marks an out-of-order pair.
 */
function defaultComparator (a, b) {
  return a - b
}

/**
 * Check whether an Array is sorted.
 *
 * Runs a single linear pass (`O(n)` time, `O(1)` extra space) over `array`,
 * comparing each adjacent pair with `comparator`. The array is considered
 * sorted unless a pair is out of order (the comparator returns a value greater
 * than zero), in which case the scan short-circuits and returns `false`. Empty
 * and single-element arrays are trivially sorted, and equal adjacent values are
 * permitted. The input is never mutated.
 *
 * @template T
 * @param {T[]} array - The Array to inspect.
 * @param {(a: T, b: T) => number} [comparator] - Optional ordering function;
 *   defaults to ascending numeric order (`a - b`). Return a value `> 0` to
 *   signal that the pair `(a, b)` is out of order.
 * @returns {boolean} `true` if every adjacent pair is in order, otherwise `false`.
 * @throws {TypeError} If `array` is not an Array; the message is
 *   `Expected Array, got <type>` (for example, `Expected Array, got string`).
 * @example
 * const sorted = require('is-sorted')
 *
 * sorted([1, 2, 3]) // => true
 * sorted([3, 1, 2]) // => false
 *
 * // custom comparator for descending order
 * sorted([3, 2, 1], function (a, b) { return b - a }) // => true
 *
 * // non-Array input throws
 * sorted('foobar') // => throws TypeError: Expected Array, got string
 */
module.exports = function checksort (array, comparator) {
  if (!Array.isArray(array)) throw new TypeError('Expected Array, got ' + (typeof array))
  comparator = comparator || defaultComparator

  for (let i = 1, length = array.length; i < length; ++i) {
    if (comparator(array[i - 1], array[i]) > 0) return false
  }

  return true
}
