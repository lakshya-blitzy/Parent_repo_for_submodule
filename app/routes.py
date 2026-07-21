"""Flask Blueprint exposing the is-sorted HTTP/JSON API.

Delivery layer only: it imports the pure algorithm from :mod:`app.core` and the
named-comparator resolver from :mod:`app.comparators`. Because JSON cannot
transport a function, ``POST /is-sorted`` accepts an optional *named* comparator
(``ascending`` default, ``descending``); library consumers pass arbitrary
callables directly to :func:`app.core.is_sorted`.
"""

from __future__ import annotations

from flask import Blueprint, jsonify, request

from app.comparators import get_comparator
from app.core import is_sorted

bp = Blueprint("is_sorted", __name__)

_VERSION = "1.0.5"


@bp.get("/")
def index():
    """Service info / index."""
    return jsonify(
        name="is-sorted",
        version=_VERSION,
        description="A compact module to check if an Array is sorted",
        endpoints={
            "POST /is-sorted": "{array:[...], comparator?} -> {sorted:bool}",
            "GET /health": "Health check",
            "GET /": "Service info",
        },
    )


@bp.get("/health")
def health():
    """Liveness/health probe."""
    return jsonify(status="ok")


@bp.post("/is-sorted")
def check_sorted():
    """Return whether the posted array is sorted per an optional named comparator."""
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict) or "array" not in payload:
        return jsonify(error="Request body must be JSON with an 'array' field"), 400

    name = payload.get("comparator")
    try:
        comparator = get_comparator(name)
    except KeyError:
        return jsonify(error=f"Unknown comparator: {name}"), 400

    # A non-list 'array' makes is_sorted raise TypeError -> mapped to 400 by errors.py.
    result = is_sorted(payload["array"], comparator)
    return jsonify(sorted=result)
