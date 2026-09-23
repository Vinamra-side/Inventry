const {chromium} = require('C:/Users/Vinamra/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const pages = fs.readdirSync('templates').filter(p => p.endsWith('.html') && p !== 'base.html').map(p => p.slice(0,-5));
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const results=[];
 try {
 for(const {width,theme} of [320,390,720,768,1280].flatMap(width=>['light','dark'].map(theme=>({width,theme})))) {
  const context=await browser.newContext({viewport:{width,height:844},colorScheme:theme,serviceWorkers:'block'});
  await context.route('**/*',route=>new URL(route.request().url()).hostname === '127.0.0.1' && route.request().method()==='GET' ? route.continue() : route.abort());
  const page=await context.newPage();
  for(const name of pages){
   const errors=[]; const listener=e=>errors.push(e.message); page.on('pageerror',listener);
   const response=await page.goto('http://127.0.0.1:4188/'+name,{waitUntil:'networkidle',timeout:15000});
   assert.equal(response.status(),200,`${name} must render`);
   assert.equal(await page.locator('h1').count(),1,`${name} must contain the application heading`);
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1, title:document.title, bad:[...document.querySelectorAll('main *, .inactive-card')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&!e.closest('.table-wrap,pre,[role="tablist"]')}).map(e=>e.className).slice(0,8)}));
   results.push({width,theme,page:name,...state,errors});
   if(width===390) await page.screenshot({path:path.join(__dirname, name+'-'+theme+'-updated.png'),fullPage:true});
   if(width<=720 && await page.locator('[data-mobile-menu-toggle]').count()){
    await page.locator('[data-mobile-menu-toggle]').click();
    assert.equal(await page.locator('[data-mobile-menu]').isVisible(),true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('[data-mobile-menu]').isVisible(),false);
    for(const selector of ['.notification-button','.user-shortcut']){
     await page.locator(selector).click();
     const box=await page.locator(selector==='.notification-button'?'.notification-panel':'.account-menu').boundingBox();
     assert.ok(box.x>=0&&box.x+box.width<=width+1,`${name} ${width} ${selector} overflows`);
     await page.keyboard.press('Escape');
    }
   }
   page.off('pageerror',listener);
  }
  await context.close();
 }
 const fallback=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const nojs=await fallback.newPage(); await nojs.goto('http://127.0.0.1:4188/orders');
 assert.equal(await nojs.locator('[data-mobile-menu]').isVisible(),true);
 await fallback.close();
 fs.writeFileSync(path.join(__dirname,'all-pages-results.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify({checked:results.length,failures:results.filter(r=>r.overflow||r.errors.length||r.bad.length)},null,2));
 assert.ok(results.every(r=>!r.overflow&&!r.errors.length&&!r.bad.length),'Layout/JS failures');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
