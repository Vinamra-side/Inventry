// Browser regression test against compiled assets and synthetic stock only.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const categories = ['green', 'green', 'roasted', 'instant_coffee'];
const fixture = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/static/style.css"><link rel="stylesheet" href="/static/inventory-ui/inventory.css"></head>
<body data-theme="dark"><main style="padding:20px;max-width:950px;margin:auto">
<div id="inventory-category-tabs"></div><section class="panel" id="stock-catalog" role="tabpanel" tabindex="0">
<div class="panel-head"><h2 data-catalog-title>All item stock</h2><span data-catalog-count></span></div>
<div class="stock-cards">${categories.map((cat, i) => `<div class="stock-card" data-stock-category="${cat}"><strong>${cat} ${i}</strong><div class="stock-number">10.00 <small>kg</small></div><form data-remove-form hidden><button>Remove</button></form></div>`).join('')}</div>
<p data-catalog-empty hidden></p></section></main><script type="module" src="/static/inventory-ui/inventory.js"></script></body></html>`;
const server = http.createServer((req, res) => {
  if (req.url === '/') return res.end(fixture);
  const files = {'/static/style.css':'text/css','/static/inventory-ui/inventory.css':'text/css','/static/inventory-ui/inventory.js':'text/javascript'};
  if (!files[req.url]) { res.statusCode = 404; return res.end(); }
  res.setHeader('Content-Type', files[req.url]);
  res.end(fs.readFileSync(path.join(root, req.url)));
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({headless:true, channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome'});
  try {
    const page = await browser.newPage({ viewport: {width: 1100, height: 750} });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    const tabs = page.getByRole('tab');
    await tabs.first().waitFor();
    await page.waitForFunction(() => document.querySelector('[data-catalog-count]').textContent === '2 items');
    assert.equal(await page.locator('[data-stock-category]:visible').count(), 2);
    await tabs.nth(1).click();
    await page.waitForFunction(() => document.querySelector('#stock-catalog').dataset.category === 'roasted');
    assert.equal(await page.locator('[data-stock-category]:visible').count(), 1);
    await tabs.nth(1).press('ArrowRight');
    assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
    await tabs.nth(2).press('End');
    await page.locator('[data-catalog-empty]').waitFor({state:'visible'});
    assert.equal(await page.locator('[data-stock-category]:visible').count(), 0);
    await tabs.nth(3).press('Home');
    await page.waitForFunction(() => document.querySelector('#stock-catalog').dataset.category === 'green');
    await tabs.nth(2).hover();
    assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'true');
    await page.mouse.move(5, 5);
    // No global Tailwind reset or filtering should unhide removal forms.
    assert.equal(await page.locator('[data-remove-form]:visible').count(), 0);
    await page.setViewportSize({width:360,height:780});
    await page.emulateMedia({ reducedMotion:'reduce' });
    await tabs.nth(3).click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await page.evaluate(() => document.body.dataset.theme = 'light');
    await tabs.first().click();
    assert.equal(await page.locator('[data-stock-category]:visible').count(), 2);
    await page.mouse.move(1, 1);
    await page.waitForFunction(() => {
      const selected = document.querySelector('[role="tab"][aria-selected="true"]').getBoundingClientRect();
      const cursor = document.querySelector('.slide-tab-cursor').getBoundingClientRect();
      return Math.abs(selected.left - cursor.left) < 2 && Math.abs(selected.width - cursor.width) < 2;
    });
    assert.deepEqual(errors, []);
    console.log('PASS: category filtering, counts, empty state, keyboard, hover, removal forms, mobile overflow, light/dark and reduced-motion mount; no JS errors.');
    if (process.env.TABS_SCREENSHOT) {
      await page.setViewportSize({width:1100,height:750});
      await page.evaluate(() => document.body.dataset.theme = 'dark');
      await page.screenshot({path:process.env.TABS_SCREENSHOT,fullPage:true});
    }
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
