/**
 * A compact module to check if an Array is sorted.
 *
 * @module is-sorted
 */

/**
 * Comparator describing the desired ordering. Follows the same contract as the
 * callback passed to `Array.prototype.sort`.
 *
 * @callback Comparator
 * @param {*} a - The preceding element (`array[i - 1]`).
 * @param {*} b - The following element (`array[i]`).
 * @returns {number} A negative number if `a` should precede `b`, a positive
 *   number if `a` should follow `b`, or `0` when the pair is considered in order.
 */

/**
 * Default comparator implementing ascending numeric order (`a - b`).
 *
 * @private
 * @param {number} a - First value of the adjacent pair.
 * @param {number} b - Second value of the adjacent pair.
 * @returns {number} The difference `a - b` (negative, zero, or positive).
 */
function defaultComparator (a, b) {
  return a - b
}

/**
 * Return `true` if `array` is sorted according to `comparator`.
 *
 * Performs a single left-to-right pass comparing each adjacent pair
 * `(array[i - 1], array[i])`. The array is considered sorted when no pair is
 * out of order (the comparator never returns a value greater than `0`). Empty
 * and single-element arrays are trivially sorted.
 *
 * @param {Array} array - The array to test for sortedness.
 * @param {Comparator} [comparator] - Optional ordering function; defaults to
 *   ascending numeric order (`a - b`) via {@link defaultComparator}.
 * @returns {boolean} `true` when every adjacent pair is in order, otherwise `false`.
 * @throws {TypeError} If `array` is not an Array. The message is
 *   `'Expected Array, got ' + typeof array`.
 * @example
 * const sorted = require('is-sorted')
 *
 * sorted([1, 2, 3]) // => true
 * sorted([3, 1, 2]) // => false
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
