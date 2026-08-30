import os
from functools import wraps
from flask import flash, redirect, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash
import db
from license_verifier import verify_license_token


def get_license_user_limit():
    """Return the enforced seat limit. A valid signed license is authoritative.
    For local/dev installs without signed licensing, fall back to license_status.
    """
    signed = verify_license_token()
    if signed.get("valid"):
        try:
            return max(1, int(signed.get("payload", {}).get("max_users", 1))), "signed"
        except (TypeError, ValueError):
            return 1, "signed"
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT max_users FROM license_status WHERE id=1")
            row = cur.fetchone()
    return (max(1, int(row["max_users"])) if row else 1), "database"


def get_active_user_count():
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) AS c FROM app_users WHERE is_active=true")
            return int(cur.fetchone()["c"])


def get_seat_status():
    limit, source = get_license_user_limit()
    active = get_active_user_count()
    return {"active": active, "limit": limit, "remaining": max(0, limit-active), "source": source}


def get_user_by_username(username):
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM app_users WHERE lower(username)=lower(%s) LIMIT 1", (username,))
            return cur.fetchone()


def get_user_by_id(user_id):
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, username, display_name, role, is_active FROM app_users WHERE id=%s", (user_id,))
            return cur.fetchone()


def authenticate(username, password):
    user = get_user_by_username(username.strip())
    if not user or not user['is_active'] or not check_password_hash(user['password_hash'], password):
        return None
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("UPDATE app_users SET last_login_at=now() WHERE id=%s", (user['id'],))
        conn.commit()
    return user


def create_user(username, password, role='user', display_name=None):
    username = username.strip()
    if len(username) < 3 or len(password) < 8:
        raise ValueError('Username must be at least 3 characters and password at least 8 characters.')
    if role not in ('admin', 'user'):
        raise ValueError('Invalid role.')
    limit, _ = get_license_user_limit()
    if get_active_user_count() >= limit:
        raise ValueError(f"License user limit reached ({limit} active login accounts). Disable an account or issue a license with more users.")
    try:
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("INSERT INTO app_users (username,password_hash,display_name,role) VALUES (%s,%s,%s,%s) RETURNING id", (username, generate_password_hash(password), display_name or username, role))
                row=cur.fetchone()
            conn.commit()
            return row
    except Exception as exc:
        if 'unique' in str(exc).lower() or 'duplicate' in str(exc).lower():
            raise ValueError('That username already exists.')
        raise


def list_app_users():
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id,username,display_name,role,is_active,created_at,last_login_at FROM app_users ORDER BY created_at")
            return cur.fetchall()


def set_user_active(user_id, active):
    if active:
        limit, _ = get_license_user_limit()
        if get_active_user_count() >= limit:
            raise ValueError(f"License user limit reached ({limit} active login accounts). Disable an account or issue a license with more users.")
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("UPDATE app_users SET is_active=%s WHERE id=%s", (active,user_id))
        conn.commit()


def ensure_bootstrap_admin():
    username=os.environ.get('ADMIN_USERNAME')
    password=os.environ.get('ADMIN_PASSWORD')
    if not username or not password:
        return
    try:
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT COUNT(*) AS c FROM app_users")
                count=cur.fetchone()['c']
            if count:
                return
        create_user(username,password,'admin',os.environ.get('ADMIN_DISPLAY_NAME') or 'Administrator')
    except Exception:
        # schema may not have been run yet; deployment docs explain setup
        return


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get('user_id'):
            return redirect(url_for('login', next=request.full_path if request.query_string else request.path))
        return view(*args, **kwargs)
    return wrapped


def admin_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get('user_id'):
            return redirect(url_for('login'))
        if session.get('role') != 'admin':
            flash('Administrator access required.', 'error')
            return redirect(url_for('dashboard'))
        return view(*args, **kwargs)
    return wrapped
