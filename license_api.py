import os
import secrets
from functools import wraps

from flask import Blueprint, current_app, jsonify, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

import db


bp = Blueprint("license_api", __name__, url_prefix="/api/license-owner")
MAX_FAILED_LOGINS = 10
FAILED_LOGIN_WINDOW_MINUTES = 15


class LoginRateLimitError(Exception):
    pass


def _serializer():
    return URLSafeTimedSerializer(current_app.config["SECRET_KEY"], salt="saiko-licence-owner-v1")


def _owner_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return jsonify(error="Owner authentication required."), 401
        try:
            payload = _serializer().loads(
                header.removeprefix("Bearer ").strip(),
                max_age=current_app.config["LICENSE_OWNER_TOKEN_MAX_AGE"],
            )
        except SignatureExpired:
            return jsonify(error="Owner session expired. Sign in again."), 401
        except BadSignature:
            return jsonify(error="Invalid owner session. Sign in again."), 401
        if payload.get("owner") is not True:
            return jsonify(error="Invalid owner session."), 401
        return view(*args, **kwargs)

    return wrapped


def _authenticate_owner(username, password, ip_address):
    expected_username = os.environ.get("LICENSE_ADMIN_USERNAME", "").strip()
    expected_password = os.environ.get("LICENSE_ADMIN_PASSWORD", "")
    if not expected_username or not expected_password:
        raise RuntimeError("Fixed licence-owner login is not configured on the inventory backend.")

    username = (username or "").strip()
    ip_address = (ip_address or "unknown")[:64]
    attempt_key = f"license-owner:{username}"[:80]
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM login_attempts WHERE attempted_at < now() - interval '1 day'")
            cur.execute(
                """
                SELECT COUNT(*) AS count FROM login_attempts
                WHERE username=%s AND ip_address=%s AND succeeded=false
                  AND attempted_at >= now() - (%s * interval '1 minute')
                """,
                (attempt_key, ip_address, FAILED_LOGIN_WINDOW_MINUTES),
            )
            if int(cur.fetchone()["count"]) >= MAX_FAILED_LOGINS:
                raise LoginRateLimitError("Too many sign-in attempts. Try again in 15 minutes.")
            valid = secrets.compare_digest(username, expected_username) and secrets.compare_digest(
                password or "", expected_password
            )
            if not valid:
                cur.execute(
                    "INSERT INTO login_attempts (username, ip_address, succeeded) VALUES (%s, %s, false)",
                    (attempt_key, ip_address),
                )
                conn.commit()
                return False
            cur.execute(
                "DELETE FROM login_attempts WHERE username=%s AND ip_address=%s",
                (attempt_key, ip_address),
            )
        conn.commit()
        return True
    finally:
        db.release_connection(conn)


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


@bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "")
    password = data.get("password", "")
    if not isinstance(username, str) or not isinstance(password, str):
        return jsonify(error="Login ID and password must be text."), 400
    try:
        valid = _authenticate_owner(
            username[:80], password[:512],
            request.access_route[0] if request.access_route else request.remote_addr,
        )
    except LoginRateLimitError as exc:
        return jsonify(error=str(exc)), 429
    except RuntimeError as exc:
        return jsonify(error=str(exc)), 503
    if not valid:
        return jsonify(error="Incorrect owner login ID or password."), 401
    return jsonify(token=_serializer().dumps({"owner": True}))


@bp.get("/license")
@_owner_required
def read_license():
    try:
        return jsonify(_dashboard())
    except RuntimeError as exc:
        return jsonify(error=str(exc)), 503


@bp.put("/license")
@_owner_required
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
