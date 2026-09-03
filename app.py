import os
import secrets
from urllib.parse import urlsplit

from flask import Flask, abort, flash, redirect, render_template, request, send_from_directory, session, url_for
from werkzeug.middleware.proxy_fix import ProxyFix
from auth import LoginRateLimitError, admin_required, authenticate, create_user, ensure_bootstrap_admin, get_seat_status, list_app_users, login_required, set_user_active

import db
from config import Config
from licensing_integration import bp as licensing_integration_blueprint
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
    remove_bean,
    remove_subscriber,
)

def _license_is_active():
    try:
        status = get_license_status()
        return (bool(status["is_active"]), status["note"]) if status else (True, None)
    except Exception:
        # Fail open during a brief database outage rather than locking staff out.
        return True, None


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
    app.teardown_appcontext(db.close_request_connection)

    @app.context_processor
    def inject_csrf_token():
        def csrf_token():
            token = session.get("csrf_token")
            if not token:
                token = secrets.token_urlsafe(32)
                session["csrf_token"] = token
            return token
        return {"csrf_token": csrf_token}

    @app.before_request
    def protect_post_requests():
        if request.path.startswith("/api/licensing-integration/"):
            return None
        if request.method != "POST":
            return None
        expected = session.get("csrf_token", "")
        supplied = request.form.get("csrf_token", "") or request.headers.get("X-CSRF-Token", "")
        if not expected or not secrets.compare_digest(expected, supplied):
            abort(400, description="Invalid or missing security token. Refresh the page and try again.")

    @app.after_request
    def set_response_headers(response):
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "same-origin")
        if request.endpoint == "static" and response.status_code == 200:
            response.headers["Cache-Control"] = "public, max-age=86400"
        if request.path.startswith("/api/licensing-integration/"):
            response.headers["Cache-Control"] = "no-store"
        return response

    # Vercel functions are ephemeral. Prefer running schema.sql once against
    # the external PostgreSQL database, then set INIT_SCHEMA=false. Keeping
    # this opt-in avoids a schema write on every cold start.
    if os.environ.get("INIT_SCHEMA", "false").lower() == "true":
        with app.app_context():
            db.init_schema()

    if os.environ.get("BOOTSTRAP_ADMIN", "false").lower() == "true":
        ensure_bootstrap_admin()
    app.register_blueprint(licensing_integration_blueprint)
    register_routes(app)
    return app


def register_routes(app):
    @app.before_request
    def enforce_license():
        if request.path.startswith("/api/licensing-integration/"):
            return None
        if request.endpoint in ("login", "logout", "static", "manifest", "service_worker"):
            return None
        is_active, note = _license_is_active()
        if not is_active:
            return render_template("license_inactive.html", note=note), 503

    @app.route("/manifest.webmanifest")
    def manifest():
        return send_from_directory(app.static_folder, "manifest.webmanifest", mimetype="application/manifest+json")

    @app.route("/service-worker.js")
    def service_worker():
        response = send_from_directory(app.static_folder, "service-worker.js", mimetype="application/javascript")
        response.direct_passthrough = False
        deployment = os.environ.get("VERCEL_GIT_COMMIT_SHA") or os.environ.get("VERCEL_DEPLOYMENT_ID") or "local"
        response.set_data(response.get_data(as_text=True) + f"\n// deployment:{deployment}\n")
        response.headers["Cache-Control"] = "no-cache"
        response.headers["Service-Worker-Allowed"] = "/"
        return response


    @app.route("/login", methods=["GET", "POST"])
    def login():
        if session.get("user_id"):
            return redirect(url_for("dashboard"))
        if request.method == "POST":
            try:
                user = authenticate(
                    request.form.get("username", ""),
                    request.form.get("password", ""),
                    request.access_route[0] if request.access_route else request.remote_addr,
                )
            except LoginRateLimitError as exc:
                flash(str(exc), "error")
                return render_template("login.html"), 429
            if user:
                session.clear()
                session["user_id"] = user["id"]
                session["username"] = user["username"]
                session["display_name"] = user["display_name"] or user["username"]
                session["role"] = user["role"]
                next_url = request.args.get("next", "")
                parsed = urlsplit(next_url)
                if not next_url.startswith("/") or parsed.scheme or parsed.netloc or next_url.startswith("//"):
                    next_url = url_for("dashboard")
                return redirect(next_url)
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
        recent_orders = list_orders(limit=10)
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
                    item_type=request.form.get("item_type", "coffee_beans"),
                    bean_type=request.form.get("bean_type") or None,
                )
                flash(f"Added {request.form['name']} to the item catalog.", "success")
                return redirect(url_for("inventory"))
            except ValueError as exc:
                flash(str(exc), "error")
        return render_template("new_bean.html")

    @app.route("/beans/<int:bean_id>/remove", methods=["POST"])
    @login_required
    def remove_bean_route(bean_id):
        try:
            bean = remove_bean(bean_id)
            flash(f"Removed {bean['name']} from inventory.", "success")
        except NotFoundError as exc:
            flash(str(exc), "error")
        return redirect(url_for("inventory"))

    # ---- Inventory ---------------------------------------------------

    @app.route("/inventory", methods=["GET", "POST"])
    @login_required
    def inventory():
        beans = list_beans()
        green_beans = [
            bean for bean in beans
            if dict(bean).get("item_type") == "coffee_beans"
            and dict(bean).get("bean_type") == "green"
        ]
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

        return render_template("inventory.html", beans=beans, green_beans=green_beans)

    # ---- Orders --------------------------------------------------------

    @app.route("/orders", methods=["GET", "POST"])
    @login_required
    def orders():
        beans = list_beans()
        if request.method == "POST":
            try:
                bean_ids = request.form.getlist("bean_id")
                quantities = request.form.getlist("quantity")
                if len(bean_ids) != len(quantities):
                    raise ValueError("Each selected item needs a quantity.")
                order = create_order(
                    customer_name=request.form["customer_name"],
                    items=[
                        {"bean_id": bean_id, "quantity": quantity}
                        for bean_id, quantity in zip(bean_ids, quantities)
                    ],
                    notes=request.form.get("notes") or None,
                )
                flash(
                    f"Order recorded for {order['customer_name']} with "
                    f"{len(order['items'])} item{'s' if len(order['items']) != 1 else ''}.",
                    "success",
                )
            except (InsufficientStockError, InvalidQuantityError, NotFoundError, ValueError) as exc:
                flash(str(exc), "error")
            return redirect(url_for("orders"))

        page = max(1, request.args.get("page", 1, type=int))
        page_size = 50
        rows = list_orders(limit=page_size + 1, offset=(page - 1) * page_size)
        return render_template(
            "orders.html",
            beans=beans,
            orders=rows[:page_size],
            page=page,
            has_next=len(rows) > page_size,
        )

    @app.route("/deliveries")
    @login_required
    def deliveries():
        page = max(1, request.args.get("page", 1, type=int))
        page_size = 100
        rows = list_deliveries(limit=page_size + 1, offset=(page - 1) * page_size)
        return render_template(
            "deliveries.html",
            deliveries=rows[:page_size],
            page=page,
            has_next=len(rows) > page_size,
        )

    @app.route("/deliveries/<int:order_id>/complete", methods=["POST"])
    @login_required
    def complete_delivery(order_id):
        try:
            mark_order_delivered(order_id)
            flash(f"Order #{order_id} marked as delivered.", "success")
        except (NotFoundError, ValueError) as exc:
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
        except (NotFoundError, ValueError) as exc:
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
        page = max(1, request.args.get("page", 1, type=int))
        page_size = 100
        rows = list_stock_history(
            request.args.get("bean"),
            request.args.get("type"),
            limit=page_size + 1,
            offset=(page - 1) * page_size,
        )
        return render_template(
            "stock_history.html",
            movements=rows[:page_size],
            selected_type=request.args.get("type", ""),
            selected_bean=request.args.get("bean", ""),
            page=page,
            has_next=len(rows) > page_size,
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

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
