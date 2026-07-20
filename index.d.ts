/**
 * Check whether `array` is sorted according to `comparator`.
 *
 * Mirrors `Array.prototype.sort` comparator semantics. When no comparator is
 * supplied it defaults to ascending numeric order (`a - b`). Empty and
 * single-element arrays are trivially sorted.
 *
 * @typeParam T - Element type of the array.
 * @param array - The array to test for sortedness.
 * @param comparator - Optional ordering function. Returns a negative number if
 *   `a` precedes `b`, a positive number if `a` follows `b`, or `0` when in order.
 * @returns `true` when every adjacent pair is in order, otherwise `false`.
 * @throws {@link TypeError} If `array` is not an Array
 *   (`'Expected Array, got ' + typeof array`). (Source: index.js:L6)
 */
declare function checksort<T = any> (array: T[], comparator?: (a: T, b: T) => number)

export = checksort
