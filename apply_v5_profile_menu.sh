#!/usr/bin/env bash
set -euo pipefail

# Apply the V5 profile-menu UI changes to an existing Saiko Inventory V4/V5-style project.
# Usage:
#   chmod +x apply_v5_profile_menu.sh
#   ./apply_v5_profile_menu.sh /path/to/saiko_inventory_vercel
# If no path is given, the current directory is used.

ROOT="${1:-.}"
BASE="$ROOT/templates/base.html"
CSS="$ROOT/static/style.css"

if [[ ! -f "$BASE" ]]; then
  echo "Error: $BASE not found"
  exit 1
fi
if [[ ! -f "$CSS" ]]; then
  echo "Error: $CSS not found"
  exit 1
fi

cp "$BASE" "$BASE.bak"
cp "$CSS" "$CSS.bak"

echo "Backups created:"
echo "  $BASE.bak"
echo "  $CSS.bak"

python3 - "$BASE" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text()

old_sidebar = """      {% if session.get('role') == 'admin' %}<div class=\"side-section-label\">Admin</div><nav class=\"side-nav\"><a href=\"{{ url_for('users') }}\" class=\"{{ 'active' if request.endpoint in ['users','remove_user'] }}\"><span>Licensed users</span></a><a href=\"{{ url_for('admin_accounts') }}\" class=\"{{ 'active' if request.endpoint in ['admin_accounts','admin_account_toggle'] }}\"><span>Login accounts</span></a><a href=\"{{ url_for('admin_license') }}\" class=\"{{ 'active' if request.endpoint == 'admin_license' }}\"><span>License control</span></a></nav>{% endif %}\n"""
text = text.replace(old_sidebar, "")

old_actions = """      <div class=\"workspace-actions\"><span class=\"account-label\">{{ session.get('display_name', session.get('username','')) }} · {{ session.get('role','') }}</span>{% if session.get('role') == 'admin' %}<a class=\"user-shortcut {{ 'active' if request.endpoint in ['users','remove_user','admin_accounts'] }}\" href=\"{{ url_for('admin_accounts') }}\" aria-label=\"Admin accounts\" title=\"Admin accounts\"><span aria-hidden=\"true\">{{ session.get('display_name','S')[:1]|upper }}</span></a>{% endif %}<form method=\"post\" action=\"{{ url_for('logout') }}\" class=\"logout-form\"><button class=\"logout-button\" type=\"submit\">Logout</button></form></div>\n"""
new_actions = """      <div class=\"workspace-actions\" data-account-menu>
        <button class=\"user-shortcut {{ 'active' if request.endpoint in ['users','remove_user','admin_accounts','admin_account_toggle'] }}\" type=\"button\" aria-label=\"Open account menu\" aria-haspopup=\"true\" aria-expanded=\"false\" data-account-trigger>
          <span aria-hidden=\"true\">{{ session.get('display_name', session.get('username','S'))[:1]|upper }}</span>
        </button>
        <div class=\"account-menu\" role=\"menu\" data-account-panel hidden>
          <div class=\"account-menu-head\">
            <div class=\"account-avatar\">{{ session.get('display_name', session.get('username','S'))[:1]|upper }}</div>
            <div class=\"account-identity\">
              <strong>{{ session.get('display_name', session.get('username','User')) }}</strong>
              <span>@{{ session.get('username','') }}{% if session.get('role') %} · {{ session.get('role')|title }}{% endif %}</span>
            </div>
          </div>
          {% if session.get('role') == 'admin' %}
          <div class=\"account-menu-section\">
            <a href=\"{{ url_for('admin_accounts') }}\" role=\"menuitem\" class=\"{{ 'active' if request.endpoint in ['admin_accounts','admin_account_toggle'] }}\">
              <span class=\"account-menu-icon\" aria-hidden=\"true\">◎</span><span>Login accounts</span>
            </a>
            <a href=\"{{ url_for('users') }}\" role=\"menuitem\" class=\"{{ 'active' if request.endpoint in ['users','remove_user'] }}\">
              <span class=\"account-menu-icon\" aria-hidden=\"true\">♙</span><span>Licensed users</span>
            </a>
          </div>
          {% endif %}
          <div class=\"account-menu-section account-menu-bottom\">
            <form method=\"post\" action=\"{{ url_for('logout') }}\" class=\"logout-form\">
              <button class=\"account-menu-logout\" type=\"submit\" role=\"menuitem\"><span class=\"account-menu-icon\" aria-hidden=\"true\">↪</span><span>Logout</span></button>
            </form>
          </div>
        </div>
      </div>
"""
if old_actions in text:
    text = text.replace(old_actions, new_actions)
elif 'data-account-menu' not in text:
    raise SystemExit('Could not find the old workspace-actions block. The file may already be modified or differs from V4.')

marker = """    }());
  </script>
"""
menu_js = """    }());
    (function () {
      const root = document.querySelector('[data-account-menu]');
      if (!root) return;
      const trigger = root.querySelector('[data-account-trigger]');
      const panel = root.querySelector('[data-account-panel]');
      function closeMenu() { panel.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
      function openMenu() { panel.hidden = false; trigger.setAttribute('aria-expanded', 'true'); }
      trigger.addEventListener('click', function (event) {
        event.stopPropagation();
        panel.hidden ? openMenu() : closeMenu();
      });
      panel.addEventListener('click', function (event) { event.stopPropagation(); });
      document.addEventListener('click', closeMenu);
      document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { closeMenu(); trigger.focus(); } });
    }());
  </script>
"""
if 'data-account-trigger' in text and "const root = document.querySelector('[data-account-menu]')" not in text:
    if marker not in text:
        raise SystemExit('Could not find script insertion marker in base.html')
    text = text.replace(marker, menu_js, 1)

path.write_text(text)
PY

cat >> "$CSS" <<'CSS'

/* V5 account menu: admin tools live under the user circle instead of the sidebar. */
.workspace-actions { position: fixed; z-index: 35; top: 26px; right: 46px; display: block; }
.user-shortcut { border: 0; cursor: pointer; }
.account-menu[hidden] { display: none !important; }
.account-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 260px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--card);
  box-shadow: 0 18px 55px rgba(38, 25, 33, .16);
  animation: accountMenuIn .16s ease-out;
}
@keyframes accountMenuIn { from { opacity: 0; transform: translateY(-6px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
.account-menu-head { display: flex; align-items: center; gap: 12px; padding: 17px 17px 14px; }
.account-avatar { width: 40px; height: 40px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 50%; background: linear-gradient(135deg, var(--pink), #8b355f); color: #fff; font-family: "Playfair Display", Georgia, serif; font-weight: 800; }
.account-identity { min-width: 0; display: grid; gap: 2px; }
.account-identity strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--ink); font-size: 13px; }
.account-identity span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); font-size: 10px; }
.account-menu-section { padding: 7px; border-top: 1px solid var(--border); }
.account-menu-section a, .account-menu-logout { width: 100%; min-height: 42px; display: flex; align-items: center; gap: 10px; padding: 0 11px; border: 0; border-radius: 11px; background: transparent; color: var(--ink); text-decoration: none; box-shadow: none; font-size: 12px; font-weight: 600; text-align: left; }
.account-menu-section a:hover, .account-menu-section a.active, .account-menu-logout:hover { background: var(--pink-soft); color: var(--pink-dark); box-shadow: none; }
.account-menu-icon { width: 20px; display: inline-grid; place-items: center; color: var(--muted); font-size: 14px; }
.account-menu-bottom { padding-top: 7px; }
.account-menu-logout { cursor: pointer; }
.logout-form { margin: 0; }
body[data-theme="dark"] .account-menu { box-shadow: 0 20px 60px rgba(0,0,0,.38); }

@media (max-width: 720px) {
  .workspace-actions { top: 16px; right: 62px; z-index: 30; }
  .account-menu { width: min(270px, calc(100vw - 28px)); right: -46px; }
}
CSS

echo
echo "Applied V5 profile-menu UI changes successfully."
echo "Restart your Flask app and hard-refresh the browser."
echo "To undo, restore base.html.bak and style.css.bak."
