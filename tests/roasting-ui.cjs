const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const template = fs.readFileSync(path.join(root, 'templates/inventory.html'), 'utf8');
let form = template.match(/<form class="stacked"[^>]*data-roast-form>[\s\S]*?<\/form>/)[0];
form = form.replace(/\{% for bean in green_beans %\}[\s\S]*?\{% endfor %\}/, '<option value="1" data-unit="kg">Arabica green · 100 kg available</option>');
form = form.replace(/\{% for bean in roasted_beans %\}[\s\S]*?\{% endfor %\}/, '<option value="2" data-unit="kg">Arabica roasted · kg</option><option value="3" data-unit="g">Arabica roasted · g</option>');
form = form.replace(/\{\{[\s\S]*?\}\}/g, 'test');
form = form.replace(/\{% if not [^%]+%\}[\s\S]*?\{% endif %\}/g, '');
const restock = template.match(/<section class="panel form-panel restock-panel">[\s\S]*?<\/section>/)[0]
  .replace(/\{% for bean in beans %\}[\s\S]*?\{% endfor %\}/g, '<option value="1">Arabica green</option>')
  .replace(/\{\{[\s\S]*?\}\}/g, 'test');
const fixture = `<!doctype html><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/style.css"><body data-theme="dark"><main style="padding:100px 20px 20px;max-width:1050px;margin:auto"><div class="inventory-forms">${restock}<section class="panel roasting-panel"><h2>Add Roasted Beans</h2>${form}</section></div></main><script src="/roasting.js"></script>`;
const server = http.createServer((req, res) => {
  const file = {'/style.css':'style.css','/roasting.js':'roasting.js'}[req.url];
  if (file) {
    res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : 'text/javascript');
    return res.end(fs.readFileSync(path.join(root, 'static', file)));
  }
  res.end(fixture);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless:true, channel:'chrome'});
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    const restockBox = await page.locator('.restock-panel').boundingBox();
    const roastBox = await page.locator('.roasting-panel').boundingBox();
    assert.equal(restockBox.y, roastBox.y, 'Both panels start at the same height');
    assert.ok(roastBox.y + roastBox.height < 720, 'Roast controls fit in the desktop viewport');
    await page.locator('#green_quantity').fill('100');
    assert.equal(await page.locator('#roasted_id').inputValue(), 'auto');
    assert.equal(await page.locator('[data-roast-form] button').isEnabled(), true);
    assert.match(await page.locator('[data-roast-preview]').textContent(), /100.00 kg green → 85.00 kg roasted/);
    await page.locator('#green_quantity').fill('1.10');
    assert.match(await page.locator('[data-roast-preview]').textContent(), /0.94 kg roasted/);
    await page.locator('#roasted_id').selectOption('3');
    assert.equal(await page.locator('#roasted_id').evaluate(el => el.checkValidity()), false);
    await page.locator('#roasted_id').selectOption('2');
    assert.equal(await page.locator('#roasted_id').evaluate(el => el.checkValidity()), true);
    await page.setViewportSize({width:360,height:800});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.locator('[data-roast-form]').evaluate(el => el.addEventListener('submit', e => e.preventDefault()));
    await page.getByRole('button', {name:'Add Roasted Beans'}).click();
    assert.equal(await page.locator('[data-roast-form] button').isDisabled(), true);
    await page.locator('#green_id').evaluate(el => { el.innerHTML = '<option value="">No green beans</option>'; el.dispatchEvent(new Event('change', {bubbles:true})); });
    assert.equal(await page.locator('[data-roast-form] button').isDisabled(), true);
    assert.equal(await page.locator('#green_quantity').isVisible(), true);
    assert.deepEqual(errors, []);
    console.log('PASS: 85% yield preview, rounding, unit mismatch, mobile layout, duplicate-click prevention; no JS errors.');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
