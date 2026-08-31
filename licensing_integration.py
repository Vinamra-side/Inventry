import os
import secrets
from functools import wraps

from flask import Blueprint, jsonify, request

import db


bp = Blueprint("licensing_integration", __name__, url_prefix="/api/licensing-integration")


def _integration_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        expected = os.environ.get("LICENSING_INTEGRATION_KEY", "")
        if not expected:
            return jsonify(error="Licensing integration is not configured."), 503
        supplied = request.headers.get("X-Licensing-Key", "")
        if not supplied or not secrets.compare_digest(supplied, expected):
            return jsonify(error="Invalid licensing integration key."), 401
        return view(*args, **kwargs)

    return wrapped


def _dashboard():
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM license_status WHERE id=1")
            status = cur.fetchone()
            cur.execute(
                """
                SELECT
                  (SELECT COUNT(*) FROM app_users WHERE is_active=true) AS accounts,
                  (SELECT COUNT(*) FROM subscribers WHERE is_active=true) AS subscribers
                """
            )
            counts = cur.fetchone()
        if status is None:
            raise RuntimeError("The inventory database has not been initialized.")
        accounts = int(counts["accounts"])
        subscribers = int(counts["subscribers"])
        active = accounts + subscribers
        limit = int(status["max_users"])
        return {
            "is_active": bool(status["is_active"]),
            "max_users": limit,
            "note": status["note"] or "",
            "updated_at": status["updated_at"].isoformat() if status["updated_at"] else None,
            "seats": {
                "active": active,
                "accounts": accounts,
                "subscribers": subscribers,
                "limit": limit,
                "remaining": max(0, limit - active),
            },
        }
    finally:
        db.release_connection(conn)


def _update_license(is_active, max_users, note):
    note = (note or "").strip() or None
    if note and len(note) > 255:
        raise ValueError("Inactive message must be 255 characters or fewer.")
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM license_status WHERE id=1 FOR UPDATE")
            if cur.fetchone() is None:
                raise RuntimeError("The inventory database has not been initialized.")
            cur.execute(
                """
                SELECT
                  (SELECT COUNT(*) FROM app_users WHERE is_active=true) +
                  (SELECT COUNT(*) FROM subscribers WHERE is_active=true) AS active
                """
            )
            active = int(cur.fetchone()["active"])
            if max_users < active:
                raise ValueError(f"Seat limit cannot be below the {active} active users currently using seats.")
            cur.execute(
                """
                UPDATE license_status
                SET is_active=%s, max_users=%s, note=%s, updated_at=now()
                WHERE id=1
                """,
                (is_active, max_users, note),
            )
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        db.release_connection(conn)


@bp.get("/license")
@_integration_required
def read_license():
    try:
        return jsonify(_dashboard())
    except RuntimeError as exc:
        return jsonify(error=str(exc)), 503


@bp.put("/license")
@_integration_required
def write_license():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify(error="A JSON request body is required."), 400
    is_active = data.get("is_active")
    max_users = data.get("max_users")
    note = data.get("note", "")
    if not isinstance(is_active, bool):
        return jsonify(error="is_active must be true or false."), 400
    if isinstance(max_users, bool) or not isinstance(max_users, int) or max_users < 1:
        return jsonify(error="Seat limit must be a whole number of at least 1."), 400
    if not isinstance(note, str):
        return jsonify(error="Inactive message must be text."), 400
    try:
        _update_license(is_active, max_users, note)
        return jsonify(message="Licence settings updated.", license=_dashboard())
    except ValueError as exc:
        return jsonify(error=str(exc)), 400
    except RuntimeError as exc:
        return jsonify(error=str(exc)), 503
