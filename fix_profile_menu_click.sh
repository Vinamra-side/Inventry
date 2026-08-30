#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
BASE="$ROOT/templates/base.html"
CSS="$ROOT/static/style.css"

[[ -f "$BASE" ]] || { echo "ERROR: $BASE not found"; exit 1; }
[[ -f "$CSS" ]] || { echo "ERROR: $CSS not found"; exit 1; }

STAMP="$(date +%Y%m%d_%H%M%S)"
cp "$BASE" "$BASE.bak.$STAMP"
cp "$CSS" "$CSS.bak.$STAMP"

echo "Backups created with suffix .bak.$STAMP"

python3 - "$BASE" <<'PY'
from pathlib import Path
import re, sys

p = Path(sys.argv[1])
s = p.read_text()

# Remove old Admin sidebar section if it exists.
s = re.sub(
    r'\s*\{% if session\.get\([\'\"]role[\'\"]\) == [\'\"]admin[\'\"] %\}.*?<div class="side-section-label">Admin</div>.*?\{% endif %\}\s*',
    '\n', s, flags=re.S
)

# Replace the complete current workspace-actions profile block with a native <details>
# dropdown. This avoids JS click-handler issues entirely.
start = s.find('<div class="workspace-actions"')
if start == -1:
    raise SystemExit('ERROR: Could not find workspace-actions in templates/base.html')

# Find the next mobile-topbar and replace everything immediately before it.
mobile = s.find('<header class="mobile-topbar">', start)
if mobile == -1:
    raise SystemExit('ERROR: Could not find mobile-topbar after workspace-actions')

new = '''<div class="workspace-actions">
        <details class="profile-menu" data-profile-menu>
          <summary class="user-shortcut {{ 'active' if request.endpoint in ['users','remove_user','admin_accounts','admin_account_toggle'] }}" aria-label="Open account menu" title="Account menu">
            <span aria-hidden="true">{{ session.get('display_name', session.get('username','S'))[:1]|upper }}</span>
          </summary>

          <div class="account-menu" role="menu">
            <div class="account-menu-head">
              <div class="account-avatar">{{ session.get('display_name', session.get('username','S'))[:1]|upper }}</div>
              <div class="account-identity">
                <strong>{{ session.get('display_name', session.get('username','User')) }}</strong>
                <span>@{{ session.get('username','') }}{% if session.get('role') %} · {{ session.get('role')|title }}{% endif %}</span>
              </div>
            </div>

            {% if session.get('role') == 'admin' %}
            <div class="account-menu-section">
              <a href="{{ url_for('admin_accounts') }}" role="menuitem" class="{{ 'active' if request.endpoint in ['admin_accounts','admin_account_toggle'] }}">
                <span class="account-menu-icon" aria-hidden="true">◎</span><span>Login accounts</span>
              </a>
              <a href="{{ url_for('users') }}" role="menuitem" class="{{ 'active' if request.endpoint in ['users','remove_user'] }}">
                <span class="account-menu-icon" aria-hidden="true">♙</span><span>Licensed users</span>
              </a>
            </div>
            {% endif %}

            <div class="account-menu-section account-menu-bottom">
              <form method="post" action="{{ url_for('logout') }}" class="logout-form">
                <button class="account-menu-logout" type="submit" role="menuitem">
                  <span class="account-menu-icon" aria-hidden="true">↪</span><span>Logout</span>
                </button>
              </form>
            </div>
          </div>
        </details>
      </div>
      '''

s = s[:start] + new + s[mobile:]

# Remove the old account-menu JS IIFE, if present. Native details needs no JS.
s = re.sub(
    r"\s*\(function \(\) \{\s*const root = document\.querySelector\('\[data-account-menu\]'\);.*?\}\(\)\);",
    '', s, flags=re.S
)

# More tolerant fallback removal for the exact previous block.
old_js_start = "    (function () {\n      const root = document.querySelector('[data-account-menu]');"
if old_js_start in s:
    a = s.find(old_js_start)
    b = s.find("    }());", a)
    if b != -1:
        b += len("    }());")
        s = s[:a] + s[b:]

# Add a tiny optional outside-click closer without depending on the menu for opening.
needle = '</body>'
outside = '''  <script>
    document.addEventListener('click', function (event) {
      document.querySelectorAll('details.profile-menu[open]').forEach(function (menu) {
        if (!menu.contains(event.target)) menu.removeAttribute('open');
      });
    });
  </script>\n'''
if "details.profile-menu[open]" not in s:
    s = s.replace(needle, outside + needle)

p.write_text(s)
PY

cat >> "$CSS" <<'CSS'

/* ===== Saiko profile menu robust fix (native <details>, no JS required to open) ===== */
.workspace-actions {
  position: fixed !important;
  z-index: 9999 !important;
  top: 26px !important;
  right: 46px !important;
  display: block !important;
}
.profile-menu {
  position: relative !important;
  display: block !important;
}
.profile-menu > summary {
  list-style: none !important;
}
.profile-menu > summary::-webkit-details-marker {
  display: none !important;
}
.profile-menu .user-shortcut {
  box-sizing: border-box !important;
  width: 46px !important;
  height: 46px !important;
  min-width: 46px !important;
  min-height: 46px !important;
  max-width: 46px !important;
  max-height: 46px !important;
  padding: 0 !important;
  margin: 0 !important;
  display: grid !important;
  place-items: center !important;
  border: 3px solid #9fd8ff !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, var(--pink, #d94b9b), #9c2868) !important;
  color: #fff !important;
  font-family: "Playfair Display", Georgia, serif !important;
  font-size: 19px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  cursor: pointer !important;
  user-select: none !important;
  box-shadow: 0 8px 22px rgba(185,53,127,.28) !important;
}
.profile-menu[open] .user-shortcut,
.profile-menu .user-shortcut:hover {
  transform: scale(1.04);
  box-shadow: 0 10px 28px rgba(185,53,127,.38) !important;
}
.profile-menu .account-menu {
  position: absolute !important;
  top: 58px !important;
  right: 0 !important;
  display: block !important;
  width: 270px !important;
  padding: 0 !important;
  overflow: hidden !important;
  border: 1px solid var(--border, rgba(120,100,112,.18)) !important;
  border-radius: 18px !important;
  background: var(--card, #fff) !important;
  color: var(--ink, #241c21) !important;
  box-shadow: 0 22px 60px rgba(38,25,33,.20) !important;
  z-index: 10000 !important;
}
.account-menu-head {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 17px !important;
}
.account-avatar {
  width: 40px !important;
  height: 40px !important;
  flex: 0 0 40px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, var(--pink, #d94b9b), #8b355f) !important;
  color: #fff !important;
  font-family: "Playfair Display", Georgia, serif !important;
  font-weight: 800 !important;
}
.account-identity { min-width: 0 !important; display: grid !important; gap: 2px !important; }
.account-identity strong { overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; color: var(--ink) !important; font-size: 13px !important; }
.account-identity span { overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; color: var(--muted) !important; font-size: 10px !important; }
.account-menu-section { padding: 7px !important; border-top: 1px solid var(--border) !important; }
.account-menu-section a,
.account-menu-logout {
  box-sizing: border-box !important;
  width: 100% !important;
  min-height: 42px !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 0 11px !important;
  border: 0 !important;
  border-radius: 11px !important;
  background: transparent !important;
  color: var(--ink) !important;
  text-decoration: none !important;
  box-shadow: none !important;
  font: inherit !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-align: left !important;
  cursor: pointer !important;
}
.account-menu-section a:hover,
.account-menu-section a.active,
.account-menu-logout:hover {
  background: var(--pink-soft, rgba(217,75,155,.10)) !important;
  color: var(--pink-dark, #a42d72) !important;
}
.account-menu-icon { width: 20px !important; display: inline-grid !important; place-items: center !important; color: var(--muted) !important; }
.logout-form { margin: 0 !important; }
body[data-theme="dark"] .profile-menu .account-menu { box-shadow: 0 22px 60px rgba(0,0,0,.46) !important; }

@media (max-width: 720px) {
  .workspace-actions { top: 16px !important; right: 62px !important; }
  .profile-menu .account-menu { right: -46px !important; width: min(270px, calc(100vw - 28px)) !important; }
}
CSS

echo
echo "Profile menu fixed."
echo "1) Restart Flask"
echo "2) Hard refresh browser: Cmd+Shift+R (Mac) / Ctrl+Shift+R"
echo "3) Click the S user circle; the menu should open natively."
