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

from db import get_connection


class InsufficientStockError(Exception):
    """Raised when an order requests more of a bean than is in stock."""


class InvalidQuantityError(Exception):
    """Raised when a quantity is zero or negative."""


class NotFoundError(Exception):
    """Raised when a referenced bean, order, or subscriber does not exist."""


class LicenseLimitError(Exception):
    """Raised when an active licence has no remaining user seats."""


def _row_to_bean(row):
    return dict(row) if row else None


def list_beans():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM beans ORDER BY name ASC")
            return cur.fetchall()
    finally:
        conn.close()


def get_bean(bean_id):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM beans WHERE id = %s", (bean_id,))
            return cur.fetchone()
    finally:
        conn.close()


def add_bean(name, unit="kg", low_stock_threshold=2.0):
    name = name.strip()
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM beans WHERE LOWER(name) = LOWER(%s)", (name,))
            if cur.fetchone():
                raise ValueError(f"A bean named '{name}' already exists.")

            cur.execute(
                """
                INSERT INTO beans (name, unit, low_stock_threshold)
                VALUES (%s, %s, %s)
                RETURNING *
                """,
                (name, unit, low_stock_threshold),
            )
            bean = cur.fetchone()
        conn.commit()
        return bean
    finally:
        conn.close()


def add_inventory(bean_id, quantity, added_by=None, note=None):
    if quantity is None or quantity <= 0:
        raise InvalidQuantityError("Quantity to add must be greater than zero.")

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
        conn.close()


def create_order(bean_id, customer_name, quantity, notes=None, delivery_date=None):
    if quantity is None or quantity <= 0:
        raise InvalidQuantityError("Order quantity must be greater than zero.")

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
        conn.close()


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
        conn.close()


def list_orders():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*, beans.name AS bean_name, beans.unit AS bean_unit
                FROM orders
                JOIN beans ON beans.id = orders.bean_id
                ORDER BY orders.created_at DESC
                """
            )
            return cur.fetchall()
    finally:
        conn.close()


def list_deliveries():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*, beans.name AS bean_name, beans.unit AS bean_unit
                FROM orders JOIN beans ON beans.id = orders.bean_id
                WHERE orders.status IN ('pending_delivery', 'delivered', 'fulfilled')
                ORDER BY orders.delivery_date NULLS LAST, orders.created_at DESC
                """
            )
            return cur.fetchall()
    finally:
        conn.close()


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
        conn.close()


def list_todays_fulfilled_orders():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT orders.*, beans.name AS bean_name, beans.unit AS bean_unit
                FROM orders
                JOIN beans ON beans.id = orders.bean_id
                WHERE orders.status IN ('fulfilled', 'pending_delivery', 'delivered')
                  AND orders.created_at::date = CURRENT_DATE
                ORDER BY orders.created_at ASC
                """
            )
            return cur.fetchall()
    finally:
        conn.close()


def add_subscriber(name, phone_number):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT max_users FROM license_status WHERE id = 1")
            license_row = cur.fetchone()
            cur.execute("SELECT COUNT(*) AS count FROM subscribers WHERE is_active = true")
            active_count = cur.fetchone()["count"]
            if license_row and active_count >= license_row["max_users"]:
                raise LicenseLimitError(
                    f"This licence allows {license_row['max_users']} active users. "
                    "Increase the seat limit in License Control before adding another."
                )
            cur.execute("SELECT id FROM subscribers WHERE phone_number = %s", (phone_number.strip(),))
            if cur.fetchone():
                raise ValueError(f"A subscriber with phone number {phone_number} already exists.")

            cur.execute(
                """
                INSERT INTO subscribers (name, phone_number)
                VALUES (%s, %s)
                RETURNING *
                """,
                (name.strip(), phone_number.strip()),
            )
            subscriber = cur.fetchone()
        conn.commit()
        return subscriber
    finally:
        conn.close()


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
        conn.close()


def list_active_subscribers():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM subscribers WHERE is_active = true ORDER BY name ASC")
            return cur.fetchall()
    finally:
        conn.close()


def list_subscribers():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM subscribers ORDER BY name ASC")
            return cur.fetchall()
    finally:
        conn.close()


def list_stock_history(sku=None, movement_type=None):
    """Return the immutable stock ledger, with optional safe filters."""
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
                """,
                params,
            )
            return cur.fetchall()
    finally:
        conn.close()


def get_insights():
    """Calculate demand, stockout, and reorder signals from fulfilled orders."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT beans.*, COALESCE(SUM(orders.quantity) FILTER (
                    WHERE orders.status IN ('fulfilled', 'pending_delivery', 'delivered') AND orders.created_at >= now() - interval '7 days'
                ), 0) AS demand_7d,
                COALESCE(SUM(orders.quantity) FILTER (
                    WHERE orders.status IN ('fulfilled', 'pending_delivery', 'delivered') AND orders.created_at >= now() - interval '30 days'
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
        conn.close()


def get_license_status():
    """Returns the single license_status row, or None if the table has
    not been created yet (e.g. schema hasn't run)."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM license_status WHERE id = 1")
            return cur.fetchone()
    finally:
        conn.close()


def set_license_status(is_active, note=None, max_users=None):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE license_status
                SET is_active = %s, note = %s,
                    max_users = COALESCE(%s, max_users), updated_at = now()
                WHERE id = 1
                RETURNING *
                """,
                (is_active, note, max_users),
            )
            row = cur.fetchone()
        conn.commit()
        return row
    finally:
        conn.close()
