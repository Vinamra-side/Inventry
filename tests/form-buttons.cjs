const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const template = fs.readFileSync(path.join(root, 'templates/new_bean.html'), 'utf8');
const actions = template.match(/<div class="form-buttons">.*?<\/div>/s)[0].replace(/\{\{.*?\}\}/g, '#inventory');
const server = http.createServer((req, res) => {
  if (req.url === '/style.css') {
    res.setHeader('Content-Type', 'text/css');
    return res.end(fs.readFileSync(path.join(root, 'static/style.css')));
  }
  res.end(`<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/style.css"><form class="stacked" style="margin:24px">${actions}</form>`);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless:true, channel:'chrome'});
    const page = await browser.newPage();
    for (const width of [1000, 360]) {
      await page.setViewportSize({width, height:600});
      await page.goto(`http://127.0.0.1:${server.address().port}`);
      for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => document.body.dataset.theme = theme, theme);
        const create = await page.getByRole('button', {name:'Create item'}).boundingBox();
        const cancel = await page.getByRole('link', {name:'Cancel'}).boundingBox();
        assert.ok(Math.abs(create.height - cancel.height) < 1, `${width}/${theme}: equal height`);
        assert.ok(cancel.height >= 44, 'Touch target remains at least 44px');
        if (width === 1000) {
          assert.ok(Math.abs(create.y - cancel.y) < 1, 'Desktop buttons aligned');
          assert.ok(create.width > cancel.width, 'Primary action remains wider');
        } else {
          assert.ok(Math.abs(create.width - cancel.width) < 1, 'Mobile buttons full width');
          assert.ok(cancel.y >= create.y + create.height, 'Mobile buttons stacked');
        }
      }
    }
    console.log('PASS: Create item and Cancel have matching heights in desktop/mobile and light/dark layouts.');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
