"""Centralized error handling for the is-sorted Flask app.

Maps the domain :class:`app.core.InputTypeError` raised by
:func:`app.core.is_sorted` (the ported input-guard contract from the original
``index.js``) to an HTTP 400 JSON response, preserving the
``"Expected Array, got <type>"`` message, and provides JSON handlers for
404/405/500.

Only the dedicated ``InputTypeError`` domain subtype is mapped to 400. Any
unrelated or internal ``TypeError`` (programmer, dependency, or comparator
defects) is deliberately NOT caught here; it flows to the sanitized HTTP 500
handler so server failures are never misreported as client errors and raw
exception messages are never disclosed. The core module still *raises* the
exception (``InputTypeError`` is-a ``TypeError``) so unit-level parity is
preserved; only the web layer converts it to a 400.
"""

from __future__ import annotations

from flask import Flask, jsonify

from app.core import InputTypeError

__all__ = ["register_error_handlers"]


def register_error_handlers(app: Flask) -> None:
    """Register JSON error handlers on the given Flask application."""

    @app.errorhandler(InputTypeError)
    def _handle_input_type_error(err):
        # Only the domain input-guard failure from app.core.is_sorted maps to a
        # 400; its "Expected Array, got <type>" message is caller-facing and safe
        # to surface. Unrelated/internal TypeErrors are NOT caught here and flow
        # to the sanitized 500 handler below (no raw messages disclosed).
        return jsonify(error=str(err)), 400

    @app.errorhandler(400)
    def _handle_bad_request(err):
        return jsonify(error=getattr(err, "description", "Bad Request")), 400

    @app.errorhandler(404)
    def _handle_not_found(err):
        return jsonify(error="Not Found"), 404

    @app.errorhandler(405)
    def _handle_method_not_allowed(err):
        return jsonify(error="Method Not Allowed"), 405

    @app.errorhandler(500)
    def _handle_server_error(err):
        return jsonify(error="Internal Server Error"), 500
