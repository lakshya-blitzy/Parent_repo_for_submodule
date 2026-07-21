"""Named comparator registry for the HTTP delivery layer.

JSON cannot transport a function, so the HTTP API accepts a *named* comparator
resolved through this registry. Library consumers still pass arbitrary
callables directly to ``app.core.is_sorted``.

Ported from the ``comparators`` map in the original ``test/index.js``
(``descending: (a, b) => b - a``) plus the module's default ascending order.
"""

from __future__ import annotations

from collections.abc import Callable

__all__ = ["ascending", "descending", "COMPARATORS", "get_comparator"]


def ascending(a: object, b: object) -> float:
    """Ascending numeric comparator (the default): ``a - b``."""
    return a - b


def descending(a: object, b: object) -> float:
    """Descending numeric comparator: ``b - a``."""
    return b - a


COMPARATORS: dict[str, Callable[[object, object], float]] = {
    "ascending": ascending,
    "descending": descending,
}


def get_comparator(name: str | None) -> Callable[[object, object], float]:
    """Resolve a named comparator, defaulting to ascending.

    Raises ``KeyError`` for an unknown name so the web layer can map it to 400.
    """
    if name is None:
        return ascending
    if name not in COMPARATORS:
        raise KeyError(name)
    return COMPARATORS[name]
