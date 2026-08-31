"""
Database connection helper.

Connects to any PostgreSQL-compatible database using the connection string
from the DATABASE_URL environment variable. Get this string from your
Supabase project: Project Settings -> Database -> Connection string
(URI). It looks like:

    postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres

Set it as an environment variable before running the app, for example
in a .env file (see .env.example) or directly in your shell:

    export DATABASE_URL="postgresql://postgres:your-password@db.xxxx.supabase.co:5432/postgres"
"""

import os

import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
from flask import g, has_app_context

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")


def get_connection():
    if not DATABASE_URL:
        raise RuntimeError(
            "DATABASE_URL is not set. Copy .env.example to .env and fill in "
            "your PostgreSQL connection string."
        )
    if has_app_context():
        conn = g.get("database_connection")
        if conn is None or conn.closed:
            conn = psycopg2.connect(
                DATABASE_URL,
                cursor_factory=psycopg2.extras.RealDictCursor,
                connect_timeout=10,
            )
            g.database_connection = conn
        return conn
    return psycopg2.connect(
        DATABASE_URL,
        cursor_factory=psycopg2.extras.RealDictCursor,
        connect_timeout=10,
    )


def release_connection(conn):
    """Close standalone connections while retaining one connection per request."""
    if has_app_context() and g.get("database_connection") is conn:
        return
    if conn is not None and not conn.closed:
        conn.close()


def close_request_connection(error=None):
    """Close the request-scoped connection and discard failed transactions."""
    conn = g.pop("database_connection", None)
    if conn is None:
        return
    try:
        if error is not None and not conn.closed:
            conn.rollback()
    finally:
        if not conn.closed:
            conn.close()


def init_schema():
    """Creates all tables if they do not already exist. Safe to run every
    time the app starts."""
    with open(os.path.join(os.path.dirname(__file__), "schema.sql"), "r") as f:
        schema_sql = f.read()

    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(schema_sql)
        conn.commit()
    finally:
        release_connection(conn)
