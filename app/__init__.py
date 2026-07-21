"""Application-factory package for the is-sorted Flask app.

Exposes :func:`create_app`, which the root ``wsgi.py`` imports as
``from app import create_app``. Keeps construction small: register the routes
blueprint and the centralized error handlers, then return the app.
"""

from __future__ import annotations

from flask import Flask

from app.errors import register_error_handlers
from app.routes import bp

__all__ = ["create_app"]


def create_app() -> Flask:
    """Construct and configure the Flask application (application-factory pattern)."""
    app = Flask(__name__)
    app.register_blueprint(bp)
    register_error_handlers(app)
    return app
