"""Centralized error handling for the is-sorted Flask app.

Maps the domain ``TypeError`` raised by :func:`app.core.is_sorted` (the ported
input-guard contract from the original ``index.js``) to an HTTP 400 JSON
response, and provides JSON handlers for 404/405/500. The core module itself
still *raises* ``TypeError`` so unit-level parity is preserved; only the web
layer converts it to a 400.
"""

from __future__ import annotations

from flask import Flask, jsonify

__all__ = ["register_error_handlers"]


def register_error_handlers(app: Flask) -> None:
    """Register JSON error handlers on the given Flask application."""

    @app.errorhandler(TypeError)
    def _handle_type_error(err):
        # Preserves the "Expected Array, got <type>" message from the core guard.
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
