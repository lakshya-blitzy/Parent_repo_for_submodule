"""Framework-agnostic core of the is-sorted project.

This module is a behavior-preserving port of the original CommonJS
``index.js`` ``checksort`` function. It has zero third-party dependencies
(Python standard library only) and MUST NOT import Flask or anything from the
web-delivery layer.

Public contract (preserved from the Node package)::

    from app.core import is_sorted

    is_sorted([1, 2, 3])                      # -> True
    is_sorted([3, 1, 2])                      # -> False
    is_sorted([3, 2, 1], lambda a, b: b - a)  # -> True
"""

from __future__ import annotations

from collections.abc import Callable

__all__ = ["is_sorted"]


def _default_comparator(a: object, b: object) -> float:
    """Default ascending numeric comparator returning ``a - b``."""
    return a - b


def _js_typeof(value: object) -> str:
    """Return the JavaScript ``typeof`` name for a Python value.

    The original TypeError message embeds JavaScript's ``typeof`` operator, and
    the ported test asserts the exact substring ``Expected Array, got string``.
    Python's native type name for a string is ``str``, so a mapping is required
    to preserve message parity.
    """
    if isinstance(value, str):
        return "string"
    if isinstance(value, bool):  # bool is a subclass of int; check first
        return "boolean"
    if isinstance(value, int | float):
        return "number"
    if value is None:
        return "object"  # JS: typeof null === "object"
    if isinstance(value, dict):
        return "object"
    if callable(value):
        return "function"
    return "object"


def is_sorted(
    array: list,
    comparator: Callable[[object, object], float] | None = None,
) -> bool:
    """Return ``True`` if ``array`` is sorted according to ``comparator``.

    Performs a single left-to-right pass comparing each adjacent pair
    ``(array[i - 1], array[i])``. The array is considered sorted when no pair is
    out of order (the comparator never returns a value greater than ``0``).
    Empty and single-element arrays are trivially sorted.

    Note (documented edge divergence, intentionally NOT "fixed"): under the
    default comparator with non-numeric elements, JavaScript coerces ``a - b``
    to ``NaN`` (``NaN > 0`` is false, so JS reports "sorted"), whereas Python's
    ``'a' - 'b'`` raises ``TypeError``. The documented contract is ascending
    NUMERIC order; callers supply a custom comparator for other types. ``NaN``
    elements behave identically (``NaN > 0`` is false in both languages).
    """
    if not isinstance(array, list):
        raise TypeError("Expected Array, got " + _js_typeof(array))
    comparator = comparator or _default_comparator

    for i in range(1, len(array)):
        if comparator(array[i - 1], array[i]) > 0:
            return False

    return True
