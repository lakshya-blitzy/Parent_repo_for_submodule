"""Named comparator registry for the HTTP delivery layer.

JSON cannot transport a function, so the HTTP API accepts a *named* comparator
resolved through this registry. Library consumers still pass arbitrary
callables directly to ``app.core.is_sorted``.

Ported from the ``comparators`` map in the original ``test/index.js``
(``descending: (a, b) => b - a``) plus the module's default ascending order.
"""

from __future__ import annotations

from collections.abc import Callable
from types import MappingProxyType

__all__ = ["ascending", "descending", "COMPARATORS", "get_comparator"]


def ascending(a: object, b: object) -> float:
    """Ascending numeric comparator (the default): ``a - b``."""
    return a - b


def descending(a: object, b: object) -> float:
    """Descending numeric comparator: ``b - a``."""
    return b - a


# Name of the comparator used when the caller supplies no name (or ``None``).
DEFAULT_COMPARATOR = "ascending"

# Private, mutable definition. The public ``COMPARATORS`` below is a read-only
# view of this dict, so importers cannot substitute or remove callables for
# subsequent requests/tests — the registry is a stable, process-wide allowlist.
_COMPARATORS: dict[str, Callable[[object, object], float]] = {
    "ascending": ascending,
    "descending": descending,
}

# Public, read-only allowlist. Attempting to assign or delete a key raises
# ``TypeError`` at runtime, keeping the mapping immutable across the process.
COMPARATORS: MappingProxyType[str, Callable[[object, object], float]] = MappingProxyType(
    _COMPARATORS
)


def get_comparator(name: str | None) -> Callable[[object, object], float]:
    """Resolve a named comparator, defaulting to ascending.

    A single lookup path is used so that ``None`` (the default) and the explicit
    name ``"ascending"`` always resolve to the *same* callable and can never
    diverge. Raises ``KeyError`` for an unknown name so the web layer can map it
    to an HTTP 400.
    """
    if name is None:
        name = DEFAULT_COMPARATOR
    return COMPARATORS[name]
