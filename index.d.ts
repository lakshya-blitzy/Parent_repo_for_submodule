/**
 * Determine whether an array is already sorted according to an optional comparator.
 *
 * This ambient declaration documents the runtime implementation in `index.js`;
 * the declaration itself and its CommonJS `export =` form appear below
 * (Source: index.d.ts:L1-L3).
 *
 * Performs a single left-to-right pass over the array comparing each adjacent
 * pair, returning `false` on the first out-of-order pair and `true` otherwise
 * (Source: index.js:L9-L13). The default ordering is ascending numeric order
 * (`a - b`), supplied by the private default comparator (Source: index.js:L1-L3).
 * A custom comparator follows the same contract as `Array.prototype.sort`.
 *
 * @template T The element type of the array being tested.
 * @param array The array to test for sortedness.
 * @param comparator Optional comparator `(a, b) => number`; return a negative
 *   number when `a` sorts before `b`, zero when equal, a positive number when
 *   `a` sorts after `b`. Defaults to ascending numeric order.
 * @returns `true` when the array is sorted (empty and single-element arrays are
 *   always sorted); otherwise `false`.
 * @throws {TypeError} When `array` is not an Array (`Expected Array, got <type>`),
 *   matching the `Array.isArray` guard (Source: index.js:L6).
 *
 * @example
 * import checksort = require('is-sorted')
 * checksort([1, 2, 3]) // => true
 * checksort([3, 2, 1], (a, b) => b - a) // => true
 */
declare function checksort<T = any> (array: T[], comparator?: (a: T, b: T) => number)

export = checksort
