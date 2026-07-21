/**
 * Determine whether an array is already sorted according to an optional comparator.
 *
 * Performs a single left-to-right pass over the array comparing each adjacent
 * pair; the array is considered sorted when no adjacent pair is out of order.
 * The default ordering is ascending numeric order (`a - b`). A custom
 * comparator follows the same contract as `Array.prototype.sort`.
 *
 * @template T The element type of the array being tested.
 * @param array The array to test for sortedness.
 * @param comparator Optional comparator `(a, b) => number`; return a negative
 *   number when `a` sorts before `b`, zero when equal, a positive number when
 *   `a` sorts after `b`. Defaults to ascending numeric order.
 * @returns `true` when the array is sorted (empty and single-element arrays are
 *   always sorted); otherwise `false`.
 * @throws {TypeError} When `array` is not an Array (`Expected Array, got <type>`).
 *
 * @example
 * import checksort = require('is-sorted')
 * checksort([1, 2, 3]) // => true
 * checksort([3, 2, 1], (a, b) => b - a) // => true
 */
declare function checksort<T = any> (array: T[], comparator?: (a: T, b: T) => number)

export = checksort
