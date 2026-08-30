"""Verify Saiko signed licenses using an embedded/configured RSA public key.

The private signing key never belongs in the Vercel application. Put the
public key in LICENSE_PUBLIC_KEY and the issued token in LICENSE_TOKEN.
"""
import base64
import json
import os
from datetime import datetime, timezone

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding


def _b64d(value):
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


def verify_license_token(token=None, public_key_pem=None):
    token = token or os.environ.get("LICENSE_TOKEN", "").strip()
    public_key_pem = public_key_pem or os.environ.get("LICENSE_PUBLIC_KEY", "").strip()
    if not token or not public_key_pem:
        return {"valid": False, "reason": "license_not_configured"}

    try:
        payload_b64, signature_b64 = token.split(".", 1)
        payload_bytes = _b64d(payload_b64)
        signature = _b64d(signature_b64)
        public_key = serialization.load_pem_public_key(public_key_pem.encode())
        public_key.verify(
            signature,
            payload_bytes,
            padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH),
            hashes.SHA256(),
        )
        payload = json.loads(payload_bytes.decode("utf-8"))
        expires_at = payload.get("expires_at")
        if expires_at:
            expiry = datetime.fromisoformat(expires_at.replace("Z", "+00:00"))
            if expiry <= datetime.now(timezone.utc):
                return {"valid": False, "reason": "license_expired", "payload": payload}
        return {"valid": True, "reason": "ok", "payload": payload}
    except Exception as exc:
        return {"valid": False, "reason": "invalid_license", "error": str(exc)}
