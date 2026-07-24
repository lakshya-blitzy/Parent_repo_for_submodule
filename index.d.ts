/**
 * Determine whether an Array is sorted according to a comparator.
 *
 * Scans adjacent element pairs left-to-right; the array is sorted while every pair
 * satisfies `comparator(previous, current) <= 0`. The first pair returning a positive
 * value yields `false`. Empty and single-element arrays are trivially sorted.
 *
 * @typeParam T - The element type of the array under test.
 * @param array - The Array to test for sortedness.
 * @param comparator - Optional ordering function returning a negative number, zero, or a
 * positive number when `a` is respectively less than, equal to, or greater than `b`.
 * Defaults to numeric ascending order when omitted.
 * @returns `true` if the array is sorted under `comparator`; otherwise `false`.
 * @throws {TypeError} If `array` is not an Array.
 * @example
 * import sorted = require('is-sorted')
 *
 * sorted([1, 2, 3]) // => true
 * sorted([3, 2, 1], (a, b) => b - a) // => true
 */
declare function checksort<T = any> (array: T[], comparator?: (a: T, b: T) => number)

export = checksort
