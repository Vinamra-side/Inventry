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

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")


def get_connection():
    if not DATABASE_URL:
        raise RuntimeError(
            "DATABASE_URL is not set. Copy .env.example to .env and fill in "
            "your PostgreSQL connection string."
        )
    return psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)


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
        conn.close()
