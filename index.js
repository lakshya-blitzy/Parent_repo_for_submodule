/**
 * @module is-sorted
 * @description A compact CommonJS module to check if an Array is sorted. Exports a
 * single function, {@link checksort}, which scans adjacent element pairs using either
 * a caller-supplied comparator or a numeric-ascending default.
 * @see index.d.ts for the TypeScript declaration of the public API.
 */

/**
 * Internal default comparator: orders values in numeric ascending order, matching
 * the numeric convention of Array.prototype.sort.
 *
 * @param {number} a - Left-hand (previous) value of a compared pair.
 * @param {number} b - Right-hand (current) value of a compared pair.
 * @returns {number} `a - b`: negative when `a < b`, zero when equal, positive when `a > b`.
 */
function defaultComparator (a, b) {
  return a - b
}

/**
 * Determine whether an Array is sorted according to a comparator.
 *
 * Walks the array once from left to right, comparing each adjacent pair. The array
 * is sorted while every pair satisfies `comparator(previous, current) <= 0`; the first
 * pair that returns a positive value short-circuits the scan and yields `false`. Empty
 * and single-element arrays are trivially sorted.
 *
 * @template T
 * @param {T[]} array - The Array to test for sortedness.
 * @param {(a: T, b: T) => number} [comparator] - Optional ordering function; returns a
 *   negative number, zero, or a positive number when `a` is respectively less than, equal
 *   to, or greater than `b`. Defaults to numeric ascending order via {@link defaultComparator}.
 * @returns {boolean} `true` if the array is sorted under `comparator`; otherwise `false`.
 * @throws {TypeError} If `array` is not an Array.
 * @example
 * const sorted = require('is-sorted')
 *
 * sorted([1, 2, 3])
 * // => true
 *
 * sorted([3, 1, 2])
 * // => false
 *
 * // supports custom comparators (descending)
 * sorted([3, 2, 1], function (a, b) { return b - a })
 * // => true
 */
module.exports = function checksort (array, comparator) {
  // Guard: the public contract accepts only Arrays; reject anything else early.
  if (!Array.isArray(array)) throw new TypeError('Expected Array, got ' + (typeof array))
  comparator = comparator || defaultComparator

  // Scan adjacent pairs; a positive comparator result means this pair is out of
  // order, so the array is not sorted.
  for (let i = 1, length = array.length; i < length; ++i) {
    if (comparator(array[i - 1], array[i]) > 0) return false
  }

  return true
}
