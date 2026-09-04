"""
Business logic layer.

All stock-changing operations go through this module so the rules stay
enforced in one place instead of being re-implemented in every route:

- add_inventory(): records stock received from an external shipment.
- roast_beans(): converts green stock into roasted stock at an 85% yield.
- create_order(): deducts stock automatically when recording an order.
  Fails cleanly if there is
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
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from uuid import uuid4

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
ALLOWED_ITEM_TYPES = {"coffee_beans", "instant_coffee", "decoction", "herbal_teas"}
ALLOWED_BEAN_TYPES = {"green", "roasted"}
PHONE_PATTERN = re.compile(r"^\+?[0-9][0-9 -]{6,19}$")
_order_items_schema_ready = False


def _ensure_order_items_schema(conn):
    """Create/backfill line-item storage once per application process."""
    global _order_items_schema_ready
    if _order_items_schema_ready:
        return
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
                bean_id INTEGER NOT NULL REFERENCES beans(id),
                quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
                UNIQUE (order_id, bean_id)
            )
            """
        )
        cur.execute("CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_order_items_bean_id ON order_items(bean_id)")
        cur.execute("ALTER TABLE orders ADD COLUMN IF NOT EXISTS external_source VARCHAR(30)")
        cur.execute("ALTER TABLE orders ADD COLUMN IF NOT EXISTS external_id VARCHAR(120)")
        cur.execute(
            """
            CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_external_source_id
            ON orders(external_source, external_id)
            WHERE external_source IS NOT NULL AND external_id IS NOT NULL
            """
        )
        cur.execute(
            """
            INSERT INTO order_items (order_id, bean_id, quantity)
            SELECT id, bean_id, quantity FROM orders
            ON CONFLICT (order_id, bean_id) DO NOTHING
            """
        )
    conn.commit()
    _order_items_schema_ready = True


def _attach_order_items(cur, orders):
    """Attach ordered item dictionaries and a concise display summary."""
    if not orders:
        return []
    result = [dict(order) for order in orders]
    order_map = {order["id"]: order for order in result}
    for order in result:
        order["items"] = []
    cur.execute(
        """
        SELECT order_items.order_id, order_items.bean_id, order_items.quantity,
               beans.name, beans.unit
        FROM order_items
        JOIN beans ON beans.id = order_items.bean_id
        WHERE order_items.order_id = ANY(%s)
        ORDER BY order_items.id ASC
        """,
        (list(order_map),),
    )
    for item in cur.fetchall():
        order_map[item["order_id"]]["items"].append(dict(item))
    for order in result:
        order["item_summary"] = ", ".join(
            f"{item['name']} · {float(item['quantity']):g} {item['unit']}"
            for item in order["items"]
        )
    return result


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
            cur.execute("ALTER TABLE beans ADD COLUMN IF NOT EXISTS zoho_item_id VARCHAR(120)")
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
        _ensure_order_items_schema(conn)
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM beans WHERE id = %s FOR UPDATE", (bean_id,))
            bean = cur.fetchone()
            if bean is None:
                raise NotFoundError(f"No item found with id {bean_id}.")

            # Orders containing this item are removed as complete records so a
            # surviving order can never silently lose one of its line items.
            cur.execute("SELECT DISTINCT order_id FROM order_items WHERE bean_id = %s", (bean_id,))
            order_ids = [row["order_id"] for row in cur.fetchall()]
            if order_ids:
                cur.execute("DELETE FROM stock_movements WHERE order_id = ANY(%s)", (order_ids,))
                cur.execute("DELETE FROM orders WHERE id = ANY(%s)", (order_ids,))

            # Remove remaining dependent records in foreign-key order.
            cur.execute("DELETE FROM stock_movements WHERE bean_id = %s", (bean_id,))
            cur.execute("DELETE FROM inventory_additions WHERE bean_id = %s", (bean_id,))
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
                raise NotFoundError(f"No item found with id {bean_id}.")

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


def roast_beans(green_id, roasted_id, quantity, recorded_by=None):
    """Atomically convert green stock to roasted stock at a fixed 85% yield.

    Both catalog records must already exist and use the same unit. Each stock
    change is recorded with one shared batch reference. No order is created.
    """
    try:
        green_id, roasted_id = int(green_id), int(roasted_id)
        amount = Decimal(str(quantity))
    except (TypeError, ValueError, InvalidOperation) as exc:
        raise InvalidQuantityError("Select both beans and enter a valid quantity.") from exc
    if not amount.is_finite() or amount <= 0 or amount > Decimal("99999999.99"):
        raise InvalidQuantityError("Green bean quantity must be positive and within the stock limit.")
    if amount != amount.quantize(Decimal("0.01")):
        raise InvalidQuantityError("Use at most two decimal places for the quantity.")
    output = (amount * Decimal("0.85")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    if green_id == roasted_id:
        raise ValueError("Choose different green and roasted catalog items.")
    recorded_by = (recorded_by or "").strip() or None
    if recorded_by and len(recorded_by) > 120:
        raise ValueError("Recorded by must be 120 characters or fewer.")
    batch = str(uuid4())
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            # Consistent lock ordering prevents concurrent roasts/orders from
            # overspending stock and avoids two-item lock-order deadlocks.
            cur.execute("SELECT * FROM beans WHERE id IN (%s, %s) ORDER BY id FOR UPDATE", (green_id, roasted_id))
            rows = {row["id"]: row for row in cur.fetchall()}
            if green_id not in rows or roasted_id not in rows:
                raise NotFoundError("One of the selected beans no longer exists.")
            green, roasted = rows[green_id], rows[roasted_id]
            if green.get("item_type") != "coffee_beans" or green.get("bean_type") != "green":
                raise ValueError("The source must be a green coffee bean.")
            if roasted.get("item_type") != "coffee_beans" or roasted.get("bean_type") != "roasted":
                raise ValueError("The destination must be a roasted coffee bean.")
            if green["unit"] != roasted["unit"]:
                raise ValueError("Green and roasted beans must use the same unit. No unit conversion is applied.")
            if Decimal(str(green["current_stock"])) < amount:
                raise InsufficientStockError("Not enough green bean stock for this roast.")
            if Decimal(str(roasted["current_stock"])) + output > Decimal("99999999.99"):
                raise InvalidQuantityError("The roasted stock would exceed the stock limit.")
            reason = f"Roast {batch}: {amount} {green['unit']} green → {output} {green['unit']} roasted (15% loss)"
            cur.execute("UPDATE beans SET current_stock = current_stock - %s WHERE id = %s", (amount, green_id))
            cur.execute("UPDATE beans SET current_stock = current_stock + %s WHERE id = %s", (output, roasted_id))
            cur.execute("INSERT INTO inventory_additions (bean_id, quantity, added_by, note) VALUES (%s, %s, %s, %s)",
                        (roasted_id, output, recorded_by, reason))
            for item_id, delta, kind in ((green_id, -amount, "roast_input"), (roasted_id, output, "roast_output")):
                cur.execute("INSERT INTO stock_movements (bean_id, delta, movement_type, reason, recorded_by) VALUES (%s, %s, %s, %s, %s)",
                            (item_id, delta, kind, reason, recorded_by))
        conn.commit()
        return {"input": amount, "output": output, "unit": green["unit"], "name": roasted["name"], "batch": batch}
    except Exception:
        conn.rollback()
        raise
    finally:
        release_connection(conn)


def create_order(
    bean_id=None,
    customer_name=None,
    quantity=None,
    notes=None,
    delivery_date=None,
    items=None,
    external_source=None,
    external_id=None,
):
    customer_name = _validate_text(customer_name, "Customer name", 120)
    notes = (notes or "").strip() or None
    if notes and len(notes) > 255:
        raise ValueError("Notes must be 255 characters or fewer.")
    if items is None:
        items = [{"bean_id": bean_id, "quantity": quantity}]
    if not items:
        raise ValueError("Add at least one item to the order.")

    # Combine duplicate selections into a single line and validate all values.
    quantities = {}
    for item in items:
        try:
            item_id = int(item.get("bean_id"))
            item_quantity = float(item.get("quantity"))
        except (TypeError, ValueError, AttributeError) as exc:
            raise InvalidQuantityError("Each order item needs a valid quantity.") from exc
        if not math.isfinite(item_quantity) or item_quantity <= 0:
            raise InvalidQuantityError("Each order quantity must be greater than zero.")
        quantities[item_id] = quantities.get(item_id, 0.0) + item_quantity
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
        _ensure_order_items_schema(conn)
        with conn.cursor() as cur:
            external_source = (external_source or "").strip() or None
            external_id = (external_id or "").strip() or None
            if external_source and external_id:
                cur.execute(
                    "SELECT pg_advisory_xact_lock(hashtext(%s))",
                    (f"{external_source}:{external_id}",),
                )
                cur.execute(
                    "SELECT * FROM orders WHERE external_source = %s AND external_id = %s",
                    (external_source, external_id),
                )
                existing = cur.fetchone()
                if existing:
                    existing_order = _attach_order_items(cur, [existing])[0]
                    existing_order["created_from_external"] = False
                    conn.commit()
                    return existing_order

            # Lock in stable id order to prevent both overselling and deadlocks
            # when concurrent orders contain several of the same items.
            selected = []
            for item_id in sorted(quantities):
                cur.execute("SELECT * FROM beans WHERE id = %s FOR UPDATE", (item_id,))
                bean = cur.fetchone()
                if bean is None:
                    raise NotFoundError(f"No item found with id {item_id}.")
                item_quantity = quantities[item_id]
                if float(bean["current_stock"]) < item_quantity:
                    raise InsufficientStockError(
                        f"Only {bean['current_stock']} {bean['unit']} of {bean['name']} left, "
                        f"cannot fulfil an order for {item_quantity:g} {bean['unit']}."
                    )
                selected.append((bean, item_quantity))

            primary_bean, primary_quantity = selected[0]

            cur.execute(
                """
                INSERT INTO orders (
                    bean_id, customer_name, quantity, notes, status, delivery_date,
                    external_source, external_id
                )
                VALUES (%s, %s, %s, %s, 'pending_delivery', %s, %s, %s)
                RETURNING *
                """,
                (
                    primary_bean["id"], customer_name, primary_quantity, notes,
                    delivery_date, external_source, external_id,
                ),
            )
            order = cur.fetchone()

            for bean, item_quantity in selected:
                cur.execute(
                    "INSERT INTO order_items (order_id, bean_id, quantity) VALUES (%s, %s, %s)",
                    (order["id"], bean["id"], item_quantity),
                )
                cur.execute(
                    """
                    INSERT INTO stock_movements (bean_id, delta, movement_type, reason, order_id)
                    VALUES (%s, %s, 'order', %s, %s)
                    """,
                    (bean["id"], -item_quantity, notes or f"Order for {customer_name}", order["id"]),
                )
                cur.execute(
                    "UPDATE beans SET current_stock = current_stock - %s WHERE id = %s",
                    (item_quantity, bean["id"]),
                )
        conn.commit()
        order = dict(order)
        order["items"] = [
            {"bean_id": bean["id"], "name": bean["name"], "unit": bean["unit"], "quantity": item_quantity}
            for bean, item_quantity in selected
        ]
        order["item_summary"] = ", ".join(
            f"{item['name']} · {float(item['quantity']):g} {item['unit']}" for item in order["items"]
        )
        order["created_from_external"] = True
        return order
    finally:
        release_connection(conn)


def cancel_order(order_id):
    conn = get_connection()
    try:
        _ensure_order_items_schema(conn)
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
                "SELECT bean_id, quantity FROM order_items WHERE order_id = %s ORDER BY bean_id FOR UPDATE",
                (order_id,),
            )
            order_items = cur.fetchall()
            for item in order_items:
                cur.execute(
                    "UPDATE beans SET current_stock = current_stock + %s WHERE id = %s",
                    (item["quantity"], item["bean_id"]),
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
            for item in order_items:
                cur.execute(
                    """
                    INSERT INTO stock_movements (bean_id, delta, movement_type, reason, order_id)
                    VALUES (%s, %s, 'cancellation', %s, %s)
                    """,
                    (item["bean_id"], item["quantity"], "Cancelled order", order_id),
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
        _ensure_order_items_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*
                FROM orders
                ORDER BY orders.created_at DESC
                LIMIT %s OFFSET %s
                """,
                (limit, offset),
            )
            return _attach_order_items(cur, cur.fetchall())
    finally:
        release_connection(conn)


def list_deliveries(limit=101, offset=0):
    limit = max(1, min(int(limit), 200))
    offset = max(0, int(offset))
    conn = get_connection()
    try:
        _ensure_order_items_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*
                FROM orders
                WHERE orders.status IN ('pending_delivery', 'delivered', 'fulfilled')
                ORDER BY orders.delivery_date NULLS LAST, orders.created_at DESC
                LIMIT %s OFFSET %s
                """,
                (limit, offset),
            )
            return _attach_order_items(cur, cur.fetchall())
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
        _ensure_order_items_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*
                FROM orders
                WHERE orders.status IN ('fulfilled', 'delivered')
                  AND orders.created_at::date = CURRENT_DATE
                ORDER BY orders.created_at ASC
                """
            )
            return _attach_order_items(cur, cur.fetchall())
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
        if movement_type in ("addition", "order", "cancellation", "roast_input", "roast_output"):
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
