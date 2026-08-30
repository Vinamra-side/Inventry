import os
import time

from flask import Flask, flash, redirect, render_template, request, session, url_for
from werkzeug.middleware.proxy_fix import ProxyFix
from auth import admin_required, authenticate, create_user, ensure_bootstrap_admin, get_seat_status, list_app_users, login_required, set_user_active

import db
from config import Config
from license_verifier import verify_license_token
from services import (
    InsufficientStockError,
    InvalidQuantityError,
    LicenseLimitError,
    NotFoundError,
    add_bean,
    add_inventory,
    add_subscriber,
    cancel_order,
    create_order,
    get_bean,
    get_license_status,
    get_insights,
    list_beans,
    list_deliveries,
    list_orders,
    list_stock_history,
    list_subscribers,
    mark_order_delivered,
    remove_subscriber,
    set_license_status,
)

# How long a license check is trusted before re-checking the database.
# Keeps the on/off switch responsive (at most this many seconds delay)
# without hitting the database on every single request.
LICENSE_CACHE_SECONDS = 60

_license_cache = {"is_active": True, "note": None, "checked_at": 0.0}


def _license_is_active():
    now = time.time()
    if now - _license_cache["checked_at"] > LICENSE_CACHE_SECONDS:
        try:
            status = get_license_status()
            _license_cache["is_active"] = bool(status["is_active"]) if status else True
            _license_cache["note"] = status["note"] if status else None
        except Exception:
            # If the license check itself fails (e.g. a brief database
            # hiccup), fail open rather than locking staff out of the
            # app over an unrelated outage. Change this to fail closed
            # if you'd rather err the other way.
            pass
        _license_cache["checked_at"] = now
    return _license_cache["is_active"], _license_cache["note"]


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)

    # Vercel functions are ephemeral. Prefer running schema.sql once against
    # the external PostgreSQL database, then set INIT_SCHEMA=false. Keeping
    # this opt-in avoids a schema write on every cold start.
    if os.environ.get("INIT_SCHEMA", "false").lower() == "true":
        with app.app_context():
            db.init_schema()

    ensure_bootstrap_admin()
    register_routes(app)
    return app


def register_routes(app):
    @app.before_request
    def enforce_license():
        # Always allow the admin page itself, so a disabled license can
        # still be re-enabled through it, and allow static files.
        if request.endpoint in ("login", "logout", "static"):
            return None
        is_active, note = _license_is_active()
        signed = verify_license_token()
        license_required = bool(os.environ.get("LICENSE_TOKEN") or os.environ.get("LICENSE_PUBLIC_KEY"))
        if license_required and not signed.get("valid"):
            return render_template("license_inactive.html", note=signed.get("reason", "License inactive")), 503
        if not is_active:
            return render_template("license_inactive.html", note=note), 503


    @app.route("/login", methods=["GET", "POST"])
    def login():
        if session.get("user_id"):
            return redirect(url_for("dashboard"))
        if request.method == "POST":
            user = authenticate(request.form.get("username", ""), request.form.get("password", ""))
            if user:
                session.clear()
                session["user_id"] = user["id"]
                session["username"] = user["username"]
                session["display_name"] = user["display_name"] or user["username"]
                session["role"] = user["role"]
                return redirect(request.args.get("next") or url_for("dashboard"))
            flash("Incorrect username or password.", "error")
        return render_template("login.html")

    @app.route("/logout", methods=["POST"])
    def logout():
        session.clear()
        flash("You have been signed out.", "success")
        return redirect(url_for("login"))

    @app.route("/")
    @login_required
    def dashboard():
        beans = list_beans()
        recent_orders = list_orders()[:10]
        low_stock_beans = [b for b in beans if float(b["current_stock"]) <= float(b["low_stock_threshold"])]
        return render_template(
            "dashboard.html",
            beans=beans,
            recent_orders=recent_orders,
            low_stock_beans=low_stock_beans,
        )

    # ---- Beans -----------------------------------------------------

    @app.route("/beans/new", methods=["GET", "POST"])
    @login_required
    def new_bean():
        if request.method == "POST":
            try:
                add_bean(
                    name=request.form["name"],
                    unit=request.form.get("unit", "kg"),
                    low_stock_threshold=float(request.form.get("low_stock_threshold") or 2.0),
                )
                flash(f"Added {request.form['name']} to the bean catalog.", "success")
                return redirect(url_for("dashboard"))
            except ValueError as exc:
                flash(str(exc), "error")
        return render_template("new_bean.html")

    # ---- Inventory ---------------------------------------------------

    @app.route("/inventory", methods=["GET", "POST"])
    @login_required
    def inventory():
        beans = list_beans()
        if request.method == "POST":
            try:
                quantity = float(request.form["quantity"])
                bean_id = int(request.form["bean_id"])
                updated_bean = add_inventory(
                    bean_id=bean_id,
                    quantity=quantity,
                    added_by=request.form.get("added_by") or None,
                    note=request.form.get("note") or None,
                )
                flash(
                    f"Added {quantity:g} {updated_bean['unit']} to {updated_bean['name']}. "
                    f"New stock: {float(updated_bean['current_stock']):g} {updated_bean['unit']}.",
                    "success",
                )
            except (InvalidQuantityError, NotFoundError, ValueError) as exc:
                flash(str(exc), "error")
            return redirect(url_for("inventory"))

        return render_template("inventory.html", beans=beans)

    # ---- Orders --------------------------------------------------------

    @app.route("/orders", methods=["GET", "POST"])
    @login_required
    def orders():
        beans = list_beans()
        if request.method == "POST":
            try:
                quantity = float(request.form["quantity"])
                order = create_order(
                    bean_id=int(request.form["bean_id"]),
                    customer_name=request.form["customer_name"],
                    quantity=quantity,
                    notes=request.form.get("notes") or None,
                    delivery_date=request.form.get("delivery_date") or None,
                )
                flash(
                    f"Order recorded for {order['customer_name']}: "
                    f"{float(order['quantity']):g} {order['bean_unit']} of {order['bean_name']}.",
                    "success",
                )
            except (InsufficientStockError, InvalidQuantityError, NotFoundError, ValueError) as exc:
                flash(str(exc), "error")
            return redirect(url_for("orders"))

        all_orders = list_orders()
        return render_template("orders.html", beans=beans, orders=all_orders)

    @app.route("/deliveries")
    @login_required
    def deliveries():
        return render_template("deliveries.html", deliveries=list_deliveries())

    @app.route("/deliveries/<int:order_id>/complete", methods=["POST"])
    @login_required
    def complete_delivery(order_id):
        try:
            mark_order_delivered(order_id)
            flash(f"Order #{order_id} marked as delivered.", "success")
        except NotFoundError as exc:
            flash(str(exc), "error")
        return redirect(url_for("deliveries"))

    @app.route("/orders/<int:order_id>/cancel", methods=["POST"])
    @login_required
    def cancel_order_route(order_id):
        try:
            order = cancel_order(order_id)
            bean = get_bean(order["bean_id"])
            flash(
                f"Order #{order['id']} cancelled, {float(order['quantity']):g} {bean['unit']} returned to stock.",
                "success",
            )
        except NotFoundError as exc:
            flash(str(exc), "error")
        return redirect(url_for("orders"))

    # ---- Licensed users --------------------------------------------------

    @app.route("/users", methods=["GET", "POST"])
    @admin_required
    def users():
        if request.method == "POST":
            try:
                add_subscriber(
                    name=request.form["name"],
                    phone_number=request.form["phone_number"],
                )
                flash("User added.", "success")
            except (ValueError, LicenseLimitError) as exc:
                flash(str(exc), "error")
            return redirect(url_for("users"))

        all_subscribers = list_subscribers()
        return render_template("users.html", users=all_subscribers)

    @app.route("/users/<int:subscriber_id>/remove", methods=["POST"])
    @admin_required
    def remove_user(subscriber_id):
        try:
            remove_subscriber(subscriber_id)
            flash("User removed.", "success")
        except NotFoundError as exc:
            flash(str(exc), "error")
        return redirect(url_for("users"))

    @app.route("/insights")
    @login_required
    def insights():
        rows = get_insights()
        return render_template(
            "insights.html", insights=rows,
            total_reorder=sum(float(row["reorder_quantity"]) for row in rows),
        )

    @app.route("/stock-history")
    @login_required
    def stock_history():
        return render_template(
            "stock_history.html",
            movements=list_stock_history(request.args.get("bean"), request.args.get("type")),
            selected_type=request.args.get("type", ""),
            selected_bean=request.args.get("bean", ""),
        )

    # ---- Login accounts (admin only) ------------------------------------
    @app.route("/admin/accounts", methods=["GET", "POST"])
    @admin_required
    def admin_accounts():
        if request.method == "POST":
            try:
                create_user(request.form["username"], request.form["password"], request.form.get("role", "user"), request.form.get("display_name"))
                flash("Login account created.", "success")
            except ValueError as exc:
                flash(str(exc), "error")
            return redirect(url_for("admin_accounts"))
        return render_template("admin_accounts.html", accounts=list_app_users(), seats=get_seat_status())

    @app.route("/admin/accounts/<int:user_id>/toggle", methods=["POST"])
    @admin_required
    def admin_account_toggle(user_id):
        if user_id == session.get("user_id"):
            flash("You cannot disable your own account.", "error")
        else:
            try:
                set_user_active(user_id, request.form.get("active") == "true")
                flash("Account updated.", "success")
            except ValueError as exc:
                flash(str(exc), "error")
        return redirect(url_for("admin_accounts"))

    # ---- Remote license switch ------------------------------------------
    # Visit /admin/license?key=YOUR_ADMIN_KEY from your own browser, from
    # anywhere, to turn the app on or off for everyone using it. Nothing
    # needs to be sent to whoever runs the app.

    @app.route("/admin/license", methods=["GET", "POST"])
    @admin_required
    def admin_license():
        if request.method == "POST":
            try:
                max_users = int(request.form.get("max_users", ""))
                if max_users < 1:
                    raise ValueError
            except ValueError:
                flash("User limit must be a whole number of at least 1.", "error")
                return redirect(url_for("admin_license"))
            signed = verify_license_token()
            signed_limit = signed.get("payload", {}).get("max_users") if signed.get("valid") else None
            set_license_status(
                is_active=request.form.get("is_active") == "on",
                note=request.form.get("note") or None,
                max_users=None if signed_limit is not None else max_users,
            )
            _license_cache["checked_at"] = 0  # force an immediate re-check
            flash("License status updated.", "success")
            return redirect(url_for("admin_license"))

        status = get_license_status()
        return render_template("admin_license.html", status=status, signed=verify_license_token(), seats=get_seat_status())


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
