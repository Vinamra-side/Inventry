"""Read-only template preview with synthetic data; never imports the application."""
import json
import re
import sys
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent / 'preview-deps'))
from jinja2 import Environment, FileSystemLoader, select_autoescape

env = Environment(loader=FileSystemLoader(ROOT / 'templates'), autoescape=select_autoescape())
pages = [p.stem for p in (ROOT / 'templates').glob('*.html') if p.stem != 'base']
now = datetime(2026, 9, 23, 10, 30)
beans = [dict(id=i+1, name=name, unit='L' if kind == 'decoction' else 'kg', item_type=kind,
              bean_type=subtype, current_stock=stock, low_stock_threshold=2)
         for i, (name, kind, subtype, stock) in enumerate([
             ('Ratnagiri Arabica Plantation AAA', 'coffee_beans', 'green', 100),
             ('Arabica Cherry AA (Roasted)', 'coffee_beans', 'roasted', 85),
             ('Hazelnut Instant Coffee', 'instant_coffee', None, 0),
             ('Decoction 80/20', 'decoction', None, 12),
             ('Ceremonial Matcha', 'herbal_teas', None, 1)])]
items = [dict(name=b['name'], quantity=2, unit=b['unit'], available=b['current_stock'] > 2) for b in beans[:3]]
orders = [dict(id=i+1, customer_name='Demo Cafe — Bengaluru Coffee House', items=items,
               item_summary='3 items', external_source='zoho_billing_invoice', external_id='DEMO-123456789',
               invoice_number='DEMO-001', notes='Please deliver to the reception after 10 AM. Call before arrival; fragile glass bottles included.',
               status=status, created_at=now, delivered_at=now if status == 'delivered' else None)
          for i, status in enumerate(['pending_delivery', 'delivered', 'historical'])]
invoice = dict(invoice_id='DEMO-123456789', invoice_number='DEMO-001', customer_name='Demo Cafe',
               date='2026-09-01', due_date='2026-09-30', status='sent', currency_code='INR', total=1200,
               sub_total=1000, tax_total=200, balance=1200, historical_eligible=True, reference_number='DEMO',
               line_items=[dict(**item, description='Synthetic sample coffee', item_id='DEMO-ITEM', rate=200, item_total=400) for item in items],
               notes='Synthetic invoice for layout review only.', terms='Demo terms', billing_address={}, shipping_address={})

def url_for(endpoint, **kw):
    if endpoint == 'static': return '/static/' + kw['filename']
    return '/' + (endpoint if endpoint in pages else 'dashboard')

class Preview(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path.startswith('/static/'):
            target = (ROOT / path.lstrip('/')).resolve()
            if not target.is_relative_to(ROOT / 'static') or not target.is_file():
                self.send_error(404); return
            import mimetypes
            data = target.read_bytes()
            content_type = mimetypes.guess_type(str(target))[0] or 'application/octet-stream'
        else:
            page = path.strip('/') or 'inventory'
            if page not in pages: self.send_error(404); return
            context = dict(url_for=url_for, csrf_token=lambda: 'synthetic', get_flashed_messages=lambda **kw: [],
                           session=dict(role='user' if 'staff' in self.path else 'admin', user_id=1, username='demo', display_name='Demo User'),
                           request=dict(endpoint=page), beans=beans, green_beans=beans[:1], roasted_beans=beans[1:2],
                           low_stock_beans=beans[2:3], recent_orders=orders, orders=orders, deliveries=orders[:2],
                           page=1, has_next=True, error=None, invoice=invoice, invoices=[invoice], invoice_json=json.dumps(invoice, indent=2),
                           total_reorder=12, insights=[dict(name=b['name'],unit=b['unit'],demand_7d=3,demand_30d=12,avg_daily_demand=.4,days_to_stockout=5,reorder_quantity=6) for b in beans],
                           users=[dict(id=2,name='Demo Staff Member',phone_number='+91 0000000000')],
                           accounts=[dict(id=2,display_name='Demo Staff Member',username='demo_staff',role='user',is_active=True)],
                           seats=dict(active=2,limit=5,remaining=3,accounts=1,subscribers=1), selected_bean='',selected_type='',
                           movements=[dict(bean_name=b['name'],bean_unit=b['unit'],delta=12,movement_type='addition',reason='Demo stock receipt',recorded_by='Demo',created_at=now) for b in beans], note='Synthetic unavailable state.')
            original = env.get_template(page+'.html').render(**context)
            # Preserve form styling; inert prevents interaction even without JavaScript.
            html = re.sub(r'<form\b([^>]*)>', lambda m: '<form'+m.group(1)+' inert>', original)
            html = re.sub(r'<script[^>]*src="[^"]*pwa\.js[^>]*></script>', '', html)
            html = re.sub(r'<link[^>]*(?:fonts\.googleapis|fonts\.gstatic|rel="manifest")[^>]*>', '', html)
            nav = '<aside style="padding:10px 12px;background:#2b1823;color:#fff;font:13px Arial">Local preview · synthetic data · forms disabled <nav style="display:flex;gap:12px;overflow:auto;padding-top:8px">' + ''.join(f'<a style="color:#fff;white-space:nowrap" href="/{p}">{p.replace("_"," ")}</a>' for p in pages) + '</nav></aside>'
            nav = nav.replace('padding:10px 12px;', 'min-width:0;width:100%;box-sizing:border-box;padding:10px 12px;')
            html = html.replace('</body>', nav+'</body>')
            data=html.encode(); content_type='text/html; charset=utf-8'
        self.send_response(200); self.send_header('Content-Type',content_type); self.end_headers(); self.wfile.write(data)

if __name__ == '__main__':
    print('Preview: http://127.0.0.1:4188/inventory', flush=True)
    HTTPServer(('127.0.0.1',4188), Preview).serve_forever()
