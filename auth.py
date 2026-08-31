import os
from functools import wraps

from flask import flash, redirect, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

import db


MAX_FAILED_LOGINS = 10
FAILED_LOGIN_WINDOW_MINUTES = 15


class LoginRateLimitError(Exception):
    """Raised when a username/IP pair has too many recent failed logins."""


def _license_limit(cur):
    cur.execute("SELECT max_users FROM license_status WHERE id = 1")
    row = cur.fetchone()
    return (max(1, int(row["max_users"])) if row else 1), "ui"


def _active_counts(cur):
    cur.execute(
        """
        SELECT
          (SELECT COUNT(*) FROM app_users WHERE is_active=true) AS accounts,
          (SELECT COUNT(*) FROM subscribers WHERE is_active=true) AS subscribers
        """
    )
    row = cur.fetchone()
    return int(row["accounts"]), int(row["subscribers"])


def get_license_user_limit():
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            return _license_limit(cur)
    finally:
        db.release_connection(conn)


def get_active_user_count():
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            accounts, subscribers = _active_counts(cur)
            return accounts + subscribers
    finally:
        db.release_connection(conn)


def get_seat_status():
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            limit, source = _license_limit(cur)
            accounts, subscribers = _active_counts(cur)
        active = accounts + subscribers
        return {
            "active": active,
            "accounts": accounts,
            "subscribers": subscribers,
            "limit": limit,
            "remaining": max(0, limit - active),
            "source": source,
        }
    finally:
        db.release_connection(conn)


def get_user_by_username(username):
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM app_users WHERE lower(username)=lower(%s) LIMIT 1", (username,))
            return cur.fetchone()
    finally:
        db.release_connection(conn)


def get_user_by_id(user_id):
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, username, display_name, role, is_active FROM app_users WHERE id=%s",
                (user_id,),
            )
            return cur.fetchone()
    finally:
        db.release_connection(conn)


def authenticate(username, password, ip_address=None):
    username = (username or "").strip()
    ip_address = (ip_address or "unknown")[:64]
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM login_attempts WHERE attempted_at < now() - interval '1 day'")
            cur.execute(
                """
                SELECT COUNT(*) AS count FROM login_attempts
                WHERE lower(username)=lower(%s) AND ip_address=%s AND succeeded=false
                  AND attempted_at >= now() - (%s * interval '1 minute')
                """,
                (username, ip_address, FAILED_LOGIN_WINDOW_MINUTES),
            )
            if int(cur.fetchone()["count"]) >= MAX_FAILED_LOGINS:
                raise LoginRateLimitError("Too many sign-in attempts. Try again in 15 minutes.")

            cur.execute("SELECT * FROM app_users WHERE lower(username)=lower(%s) LIMIT 1", (username,))
            user = cur.fetchone()
            valid = bool(user and user["is_active"] and check_password_hash(user["password_hash"], password or ""))
            if not valid:
                cur.execute(
                    "INSERT INTO login_attempts (username, ip_address, succeeded) VALUES (%s, %s, false)",
                    (username, ip_address),
                )
                conn.commit()
                return None

            cur.execute("UPDATE app_users SET last_login_at=now() WHERE id=%s", (user["id"],))
            cur.execute(
                "DELETE FROM login_attempts WHERE lower(username)=lower(%s) AND ip_address=%s",
                (username, ip_address),
            )
        conn.commit()
        return user
    finally:
        db.release_connection(conn)


def create_user(username, password, role="user", display_name=None):
    username = (username or "").strip()
    display_name = (display_name or username).strip()
    if len(username) < 3 or len(username) > 80:
        raise ValueError("Username must be between 3 and 80 characters.")
    if len(password or "") < 8:
        raise ValueError("Password must be at least 8 characters.")
    if not display_name or len(display_name) > 120:
        raise ValueError("Display name is required and must be 120 characters or fewer.")
    if role not in ("admin", "user"):
        raise ValueError("Invalid role.")

    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM license_status WHERE id=1 FOR UPDATE")
            limit, _ = _license_limit(cur)
            accounts, subscribers = _active_counts(cur)
            if accounts + subscribers >= limit:
                raise ValueError(
                    f"License user limit reached ({limit} active users across accounts and licensed users)."
                )
            cur.execute(
                """
                INSERT INTO app_users (username, password_hash, display_name, role)
                VALUES (%s, %s, %s, %s) RETURNING id
                """,
                (username, generate_password_hash(password), display_name, role),
            )
            row = cur.fetchone()
        conn.commit()
        return row
    except Exception as exc:
        conn.rollback()
        if "unique" in str(exc).lower() or "duplicate" in str(exc).lower():
            raise ValueError("That username already exists.") from exc
        raise
    finally:
        db.release_connection(conn)


def list_app_users():
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, username, display_name, role, is_active, created_at, last_login_at
                FROM app_users ORDER BY created_at
                """
            )
            return cur.fetchall()
    finally:
        db.release_connection(conn)


def set_user_active(user_id, active):
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM license_status WHERE id=1 FOR UPDATE")
            if active:
                limit, _ = _license_limit(cur)
                accounts, subscribers = _active_counts(cur)
                if accounts + subscribers >= limit:
                    raise ValueError(f"License user limit reached ({limit} active users).")
            cur.execute("UPDATE app_users SET is_active=%s WHERE id=%s RETURNING id", (active, user_id))
            if cur.fetchone() is None:
                raise ValueError("Login account not found.")
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        db.release_connection(conn)


def ensure_bootstrap_admin():
    username = os.environ.get("ADMIN_USERNAME")
    password = os.environ.get("ADMIN_PASSWORD")
    if not username or not password:
        return
    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) AS count FROM app_users")
            count = int(cur.fetchone()["count"])
        if count == 0:
            create_user(username, password, "admin", os.environ.get("ADMIN_DISPLAY_NAME") or "Administrator")
    finally:
        db.release_connection(conn)


def _current_active_user():
    user_id = session.get("user_id")
    if not user_id:
        return None
    user = get_user_by_id(user_id)
    if not user or not user["is_active"]:
        session.clear()
        return None
    session["username"] = user["username"]
    session["display_name"] = user["display_name"] or user["username"]
    session["role"] = user["role"]
    return user


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not _current_active_user():
            return redirect(url_for("login", next=request.full_path if request.query_string else request.path))
        return view(*args, **kwargs)

    return wrapped

def admin_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        user = _current_active_user()
        if not user:
            return redirect(url_for("login"))
        if user["role"] != "admin":
            flash("Administrator access required.", "error")
            return redirect(url_for("dashboard"))
        return view(*args, **kwargs)

    return wrapped
