import os

from dotenv import load_dotenv

load_dotenv()


def _secret_key():
    value = os.environ.get("SECRET_KEY")
    if value:
        return value
    if os.environ.get("VERCEL"):
        raise RuntimeError("SECRET_KEY must be set in Vercel environment variables.")
    return "dev-secret-key-change-in-production"


class Config:
    SECRET_KEY = _secret_key()
    BUSINESS_NAME = "Saiko"
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = os.environ.get(
        "SESSION_COOKIE_SECURE", "true" if os.environ.get("VERCEL") else "false"
    ).lower() == "true"
    SEND_FILE_MAX_AGE_DEFAULT = 86400
    LICENSE_OWNER_TOKEN_MAX_AGE = int(os.environ.get("LICENSE_OWNER_TOKEN_MAX_AGE", str(30 * 24 * 60 * 60)))
