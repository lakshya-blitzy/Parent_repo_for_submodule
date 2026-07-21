/**
 * Check whether an array is already sorted.
 *
 * Performs a single left-to-right pass over `array`, comparing each adjacent
 * pair with `comparator`, and returns `true` when no adjacent pair is out of
 * order. When `comparator` is omitted, an ascending numeric ordering (`a - b`)
 * is used. Empty and single-element arrays return `true`. The input array is
 * only read, never mutated. Throws a `TypeError` when `array` is not an Array.
 *
 * @typeParam T - Element type of the array (defaults to `any`).
 * @param array - The array to inspect for sortedness.
 * @param comparator - Optional `(a, b) => number` comparator: negative when `a`
 *   precedes `b`, `0` when equivalent, positive when `a` follows `b`. Defaults
 *   to an ascending numeric ordering.
 * @returns `true` when every adjacent pair is in order, otherwise `false`. The
 *   runtime `checksort` returns a `boolean` (the declaration below intentionally
 *   carries no explicit return-type annotation).
 * @throws {TypeError} When `array` is not an Array (message: `Expected Array, got <type>`).
 * @example
 * ```ts
 * import checksort = require('is-sorted')
 *
 * checksort([1, 2, 3])                    // => true
 * checksort([3, 1, 2])                    // => false
 * checksort([3, 2, 1], (a, b) => b - a)   // => true
 * ```
 */
declare function checksort<T = any> (array: T[], comparator?: (a: T, b: T) => number)

export = checksort
