"""
Business logic layer.

All stock-changing operations go through this module so the rules stay
enforced in one place instead of being re-implemented in every route:

- add_inventory(): the only way stock increases.
- create_order(): the only way stock decreases, and only automatically,
  as a side effect of recording an order. Fails cleanly if there is
  not enough stock for the requested bean.
- cancel_order(): reverses a specific order's deduction. This is not a
  manual stock edit, it is undoing an automatic one, and keeps stock
  numbers accurate when an order does not go through.

Every write here happens inside a single transaction (one connection,
committed once at the end) so a stock update and its log entry can
never end up out of sync if something fails partway through.
"""

import math
import re
from datetime import date

from db import get_connection, release_connection


class InsufficientStockError(Exception):
    """Raised when an order requests more of a bean than is in stock."""


class InvalidQuantityError(Exception):
    """Raised when a quantity is zero or negative."""


class NotFoundError(Exception):
    """Raised when a referenced bean, order, or subscriber does not exist."""


class LicenseLimitError(Exception):
    """Raised when an active licence has no remaining user seats."""


ALLOWED_UNITS = {"kg", "g", "lb"}
ALLOWED_ITEM_TYPES = {"coffee_beans", "instant_coffee", "decoction"}
ALLOWED_BEAN_TYPES = {"green", "roasted"}
PHONE_PATTERN = re.compile(r"^\+?[0-9][0-9 -]{6,19}$")


def _validate_text(value, label, max_length):
    value = (value or "").strip()
    if not value:
        raise ValueError(f"{label} is required.")
    if len(value) > max_length:
        raise ValueError(f"{label} must be {max_length} characters or fewer.")
    return value


def _license_limit(cur):
    cur.execute("SELECT max_users FROM license_status WHERE id = 1")
    row = cur.fetchone()
    return max(1, int(row["max_users"])) if row else 1


def _combined_active_user_count(cur):
    cur.execute(
        """
        SELECT
          (SELECT COUNT(*) FROM app_users WHERE is_active = true) +
          (SELECT COUNT(*) FROM subscribers WHERE is_active = true) AS count
        """
    )
    return int(cur.fetchone()["count"])


def _row_to_bean(row):
    return dict(row) if row else None


def list_beans():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM beans ORDER BY name ASC")
            return cur.fetchall()
    finally:
        release_connection(conn)


def get_bean(bean_id):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM beans WHERE id = %s", (bean_id,))
            return cur.fetchone()
    finally:
        release_connection(conn)


def add_bean(name, unit="kg", low_stock_threshold=2.0, item_type="coffee_beans", bean_type=None):
    name = _validate_text(name, "Item name", 120)
    unit = (unit or "").strip()
    if unit not in ALLOWED_UNITS:
        raise ValueError("Unit must be kg, g, or lb.")
    item_type = (item_type or "").strip()
    if item_type not in ALLOWED_ITEM_TYPES:
        raise ValueError("Select a valid item type.")
    bean_type = (bean_type or "").strip() or None
    if item_type == "coffee_beans" and bean_type not in ALLOWED_BEAN_TYPES:
        raise ValueError("Select Green bean or Roasted bean.")
    if item_type != "coffee_beans":
        bean_type = None
    if not math.isfinite(float(low_stock_threshold)) or float(low_stock_threshold) < 0:
        raise ValueError("Low-stock threshold must be zero or greater.")
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            # Keep existing deployments compatible without requiring a separate
            # migration step before the first new catalog item is added.
            cur.execute("ALTER TABLE beans ADD COLUMN IF NOT EXISTS item_type VARCHAR(30) NOT NULL DEFAULT 'coffee_beans'")
            cur.execute("ALTER TABLE beans ADD COLUMN IF NOT EXISTS bean_type VARCHAR(20)")
            cur.execute("SELECT id FROM beans WHERE LOWER(name) = LOWER(%s)", (name,))
            if cur.fetchone():
                raise ValueError(f"An item named '{name}' already exists.")

            cur.execute(
                """
                INSERT INTO beans (name, unit, low_stock_threshold, item_type, bean_type)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING *
                """,
                (name, unit, low_stock_threshold, item_type, bean_type),
            )
            bean = cur.fetchone()
        conn.commit()
        return bean
    finally:
        release_connection(conn)


def remove_bean(bean_id):
    """Permanently remove a catalog item and its associated history."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM beans WHERE id = %s FOR UPDATE", (bean_id,))
            bean = cur.fetchone()
            if bean is None:
                raise NotFoundError(f"No item found with id {bean_id}.")

            # Remove dependent records in foreign-key order before the item.
            cur.execute("DELETE FROM stock_movements WHERE bean_id = %s", (bean_id,))
            cur.execute("DELETE FROM inventory_additions WHERE bean_id = %s", (bean_id,))
            cur.execute("DELETE FROM orders WHERE bean_id = %s", (bean_id,))
            cur.execute("DELETE FROM beans WHERE id = %s", (bean_id,))
        conn.commit()
        return bean
    finally:
        release_connection(conn)


def add_inventory(bean_id, quantity, added_by=None, note=None):
    if quantity is None or not math.isfinite(float(quantity)) or quantity <= 0:
        raise InvalidQuantityError("Quantity to add must be greater than zero.")
    added_by = (added_by or "").strip() or None
    note = (note or "").strip() or None
    if added_by and len(added_by) > 120:
        raise ValueError("Added by must be 120 characters or fewer.")
    if note and len(note) > 255:
        raise ValueError("Note must be 255 characters or fewer.")

    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM beans WHERE id = %s FOR UPDATE", (bean_id,))
            bean = cur.fetchone()
            if bean is None:
                raise NotFoundError(f"No bean found with id {bean_id}.")

            cur.execute(
                """
                INSERT INTO inventory_additions (bean_id, quantity, added_by, note)
                VALUES (%s, %s, %s, %s)
                """,
                (bean_id, quantity, added_by, note),
            )
            cur.execute(
                """
                INSERT INTO stock_movements (bean_id, delta, movement_type, reason, recorded_by)
                VALUES (%s, %s, 'addition', %s, %s)
                """,
                (bean_id, quantity, note or "Stock added", added_by),
            )
            cur.execute(
                """
                UPDATE beans SET current_stock = current_stock + %s
                WHERE id = %s
                RETURNING *
                """,
                (quantity, bean_id),
            )
            updated_bean = cur.fetchone()
        conn.commit()
        return updated_bean
    finally:
        release_connection(conn)


def create_order(bean_id, customer_name, quantity, notes=None, delivery_date=None):
    if quantity is None or not math.isfinite(float(quantity)) or quantity <= 0:
        raise InvalidQuantityError("Order quantity must be greater than zero.")
    customer_name = _validate_text(customer_name, "Customer name", 120)
    notes = (notes or "").strip() or None
    if notes and len(notes) > 255:
        raise ValueError("Notes must be 255 characters or fewer.")
    if delivery_date:
        if isinstance(delivery_date, str):
            try:
                delivery_date = date.fromisoformat(delivery_date)
            except ValueError as exc:
                raise ValueError("Delivery date must be a valid date.") from exc
        elif not isinstance(delivery_date, date):
            raise ValueError("Delivery date must be a valid date.")

    conn = get_connection()
    try:
        with conn.cursor() as cur:
            # FOR UPDATE locks this row until commit, so two simultaneous
            # orders for the same bean cannot both pass the stock check
            # and oversell it.
            cur.execute("SELECT * FROM beans WHERE id = %s FOR UPDATE", (bean_id,))
            bean = cur.fetchone()
            if bean is None:
                raise NotFoundError(f"No bean found with id {bean_id}.")

            if float(bean["current_stock"]) < float(quantity):
                raise InsufficientStockError(
                    f"Only {bean['current_stock']} {bean['unit']} of {bean['name']} left, "
                    f"cannot fulfil an order for {quantity} {bean['unit']}."
                )

            cur.execute(
                """
                INSERT INTO orders (bean_id, customer_name, quantity, notes, status, delivery_date)
                VALUES (%s, %s, %s, %s, 'pending_delivery', %s)
                RETURNING *
                """,
                (bean_id, customer_name, quantity, notes, delivery_date),
            )
            order = cur.fetchone()

            cur.execute(
                """
                INSERT INTO stock_movements (bean_id, delta, movement_type, reason, order_id)
                VALUES (%s, %s, 'order', %s, %s)
                """,
                (bean_id, -quantity, notes or f"Order for {customer_name}", order["id"]),
            )

            cur.execute(
                "UPDATE beans SET current_stock = current_stock - %s WHERE id = %s",
                (quantity, bean_id),
            )
        conn.commit()
        order = dict(order)
        order["bean_name"] = bean["name"]
        order["bean_unit"] = bean["unit"]
        return order
    finally:
        release_connection(conn)


def cancel_order(order_id):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM orders WHERE id = %s FOR UPDATE", (order_id,))
            order = cur.fetchone()
            if order is None:
                raise NotFoundError(f"No order found with id {order_id}.")

            if order["status"] == "cancelled":
                return order
            if order["status"] != "pending_delivery":
                raise ValueError("Only orders awaiting delivery can be cancelled.")

            cur.execute(
                "UPDATE beans SET current_stock = current_stock + %s WHERE id = %s",
                (order["quantity"], order["bean_id"]),
            )
            cur.execute(
                """
                UPDATE orders SET status = 'cancelled', cancelled_at = now()
                WHERE id = %s
                RETURNING *
                """,
                (order_id,),
            )
            updated_order = cur.fetchone()
            cur.execute(
                """
                INSERT INTO stock_movements (bean_id, delta, movement_type, reason, order_id)
                VALUES (%s, %s, 'cancellation', %s, %s)
                """,
                (order["bean_id"], order["quantity"], "Cancelled order", order_id),
            )
        conn.commit()
        return updated_order
    finally:
        release_connection(conn)


def list_orders(limit=50, offset=0):
    limit = max(1, min(int(limit), 200))
    offset = max(0, int(offset))
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*, beans.name AS bean_name, beans.unit AS bean_unit
                FROM orders
                JOIN beans ON beans.id = orders.bean_id
                ORDER BY orders.created_at DESC
                LIMIT %s OFFSET %s
                """,
                (limit, offset),
            )
            return cur.fetchall()
    finally:
        release_connection(conn)


def list_deliveries(limit=101, offset=0):
    limit = max(1, min(int(limit), 200))
    offset = max(0, int(offset))
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*, beans.name AS bean_name, beans.unit AS bean_unit
                FROM orders JOIN beans ON beans.id = orders.bean_id
                WHERE orders.status IN ('pending_delivery', 'delivered', 'fulfilled')
                ORDER BY orders.delivery_date NULLS LAST, orders.created_at DESC
                LIMIT %s OFFSET %s
                """,
                (limit, offset),
            )
            return cur.fetchall()
    finally:
        release_connection(conn)


def mark_order_delivered(order_id):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE orders SET status = 'delivered', delivered_at = now()
                WHERE id = %s AND status = 'pending_delivery'
                RETURNING *
                """,
                (order_id,),
            )
            order = cur.fetchone()
            if order is None:
                raise NotFoundError("This order is not awaiting delivery.")
        conn.commit()
        return order
    finally:
        release_connection(conn)


def list_todays_fulfilled_orders():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*, beans.name AS bean_name, beans.unit AS bean_unit
                FROM orders
                JOIN beans ON beans.id = orders.bean_id
                WHERE orders.status IN ('fulfilled', 'delivered')
                  AND orders.created_at::date = CURRENT_DATE
                ORDER BY orders.created_at ASC
                """
            )
            return cur.fetchall()
    finally:
        release_connection(conn)


def add_subscriber(name, phone_number):
    name = _validate_text(name, "Name", 120)
    phone_number = (phone_number or "").strip()
    if len(phone_number) > 20 or not PHONE_PATTERN.fullmatch(phone_number):
        raise ValueError("Enter a valid phone number using 7 to 20 characters.")
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            # Serialize seat changes so concurrent requests cannot exceed the limit.
            cur.execute("SELECT id FROM license_status WHERE id = 1 FOR UPDATE")
            limit = _license_limit(cur)
            active_count = _combined_active_user_count(cur)
            if active_count >= limit:
                raise LicenseLimitError(
                    f"This licence allows {limit} active users. "
                    "Increase the seat limit in License Control before adding another."
                )
            cur.execute("SELECT id FROM subscribers WHERE phone_number = %s", (phone_number,))
            if cur.fetchone():
                raise ValueError(f"A subscriber with phone number {phone_number} already exists.")

            cur.execute(
                """
                INSERT INTO subscribers (name, phone_number)
                VALUES (%s, %s)
                RETURNING *
                """,
                (name, phone_number),
            )
            subscriber = cur.fetchone()
        conn.commit()
        return subscriber
    finally:
        release_connection(conn)


def remove_subscriber(subscriber_id):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM subscribers WHERE id = %s RETURNING id", (subscriber_id,))
            deleted = cur.fetchone()
            if deleted is None:
                raise NotFoundError(f"No subscriber found with id {subscriber_id}.")
        conn.commit()
    finally:
        release_connection(conn)


def list_active_subscribers():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM subscribers WHERE is_active = true ORDER BY name ASC")
            return cur.fetchall()
    finally:
        release_connection(conn)


def list_subscribers():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM subscribers ORDER BY name ASC")
            return cur.fetchall()
    finally:
        release_connection(conn)


def list_stock_history(sku=None, movement_type=None, limit=101, offset=0):
    """Return the immutable stock ledger, with optional safe filters."""
    limit = max(1, min(int(limit), 200))
    offset = max(0, int(offset))
    conn = get_connection()
    try:
        clauses, params = [], []
        if sku:
            clauses.append("LOWER(beans.name) LIKE LOWER(%s)")
            params.append(f"%{sku.strip()}%")
        if movement_type in ("addition", "order", "cancellation"):
            clauses.append("stock_movements.movement_type = %s")
            params.append(movement_type)
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        with conn.cursor() as cur:
            cur.execute(
                f"""
                SELECT stock_movements.*, beans.name AS bean_name, beans.unit AS bean_unit
                FROM stock_movements JOIN beans ON beans.id = stock_movements.bean_id
                {where}
                ORDER BY stock_movements.created_at DESC
                LIMIT %s OFFSET %s
                """,
                [*params, limit, offset],
            )
            return cur.fetchall()
    finally:
        release_connection(conn)


def get_insights():
    """Calculate demand, stockout, and reorder signals from fulfilled orders."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT beans.*, COALESCE(SUM(orders.quantity) FILTER (
                    WHERE orders.status IN ('fulfilled', 'delivered') AND orders.created_at >= now() - interval '7 days'
                ), 0) AS demand_7d,
                COALESCE(SUM(orders.quantity) FILTER (
                    WHERE orders.status IN ('fulfilled', 'delivered') AND orders.created_at >= now() - interval '30 days'
                ), 0) AS demand_30d
                FROM beans LEFT JOIN orders ON orders.bean_id = beans.id
                GROUP BY beans.id ORDER BY beans.name
                """
            )
            rows = []
            for row in cur.fetchall():
                item = dict(row)
                daily = float(item["demand_30d"]) / 30
                item["avg_daily_demand"] = daily
                item["days_to_stockout"] = float(item["current_stock"]) / daily if daily else None
                item["reorder_quantity"] = max(0, float(item["low_stock_threshold"]) * 2 - float(item["current_stock"]))
                rows.append(item)
            return rows
    finally:
        release_connection(conn)


def get_license_status():
    """Returns the single license_status row, or None if the table has
    not been created yet (e.g. schema hasn't run)."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM license_status WHERE id = 1")
            return cur.fetchone()
    finally:
        release_connection(conn)
