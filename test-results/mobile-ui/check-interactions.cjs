const {chromium}=require('C:/Users/Vinamra/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
 const context=await browser.newContext({viewport:{width:390,height:844}});
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'&&r.request().method()==='GET'?r.continue():r.abort());
 const page=await context.newPage();
 const go=async name=>{await page.goto('http://127.0.0.1:4188/'+name);await page.locator('h1').waitFor();};
 await go('orders');
 // Activate controls only in this isolated test; all non-GET requests stay blocked.
 await page.locator('form[inert]').evaluateAll(forms=>forms.forEach(f=>f.removeAttribute('inert')));
 await page.locator('[data-add-order-item]').click(); assert.equal(await page.locator('.order-line').count(),2);
 await page.locator('[data-remove-order-item]').last().click(); assert.equal(await page.locator('.order-line').count(),1);
 await page.locator('.order-note summary').first().click(); assert.equal(await page.locator('.order-note').first().getAttribute('open'),'');
 await page.locator('.mobile-theme-toggle').click(); assert.equal(await page.locator('body').getAttribute('data-theme'),'dark');
 await go('orders?staff=1'); assert.equal(await page.locator('[data-mobile-menu] a').filter({hasText:'Users'}).count(),0);
 await go('new_bean'); await page.locator('form[inert]').evaluateAll(forms=>forms.forEach(f=>f.removeAttribute('inert')));
 await page.locator('#item_type').selectOption('decoction'); assert.equal(await page.locator('#unit').inputValue(),'L'); assert.equal(await page.locator('[data-bean-type-group]').isVisible(),false);
 await go('inventory'); await page.getByRole('tab',{name:'Herbal Teas',exact:true}).click(); assert.match(await page.locator('[data-catalog-title]').innerText(),/Herbal Teas/);
 assert.equal(await page.locator('[data-stock-category]:visible').count(),1);
 console.log('PASS: add/remove order rows, expand notes, theme toggle, staff navigation, item type/unit, category filtering');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
