const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Vinamra/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');

const baseURL = 'https://saiko-inventory.vercel.app';
const outputDir = __dirname;
const viewports = [
  { name: 'mobile-375x812', width: 375, height: 812 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'desktop-1280x800', width: 1280, height: 800 },
];
const protectedRoutes = [
  '/', '/inventory', '/orders', '/deliveries', '/insights', '/stock-history',
  '/users', '/admin/accounts', '/zoho-invoices',
];

function safeName(url) {
  return url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-first-run', '--disable-default-apps'],
  });
  const results = {
    target: baseURL,
    generatedAt: new Date().toISOString(),
    browserVersion: browser.version(),
    safety: 'GET navigation and local UI inspection only; no form submissions or state-changing requests.',
    viewports: [],
    routeChecks: [],
    assetChecks: [],
  };

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      colorScheme: 'light',
      reducedMotion: 'reduce',
      serviceWorkers: 'block',
    });
    const page = await context.newPage();
    const consoleMessages = [];
    const failedRequests = [];
    const responses = [];
    page.on('console', msg => {
      if (['warning', 'error'].includes(msg.type())) consoleMessages.push({ type: msg.type(), text: msg.text() });
    });
    page.on('requestfailed', request => failedRequests.push({ url: request.url(), method: request.method(), error: request.failure()?.errorText || '' }));
    page.on('response', response => {
      if (response.status() >= 400) responses.push({ url: response.url(), status: response.status(), method: response.request().method() });
    });

    const response = await page.goto(`${baseURL}/`, { waitUntil: 'networkidle', timeout: 45000 });
    const screenshotPath = path.join(outputDir, `${viewport.name}-login-before.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const dom = await page.evaluate(() => {
      const rectInfo = el => {
        const r = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute('type'),
          name: el.getAttribute('name'),
          text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
          ariaLabel: el.getAttribute('aria-label'),
          id: el.id || null,
          width: Math.round(r.width * 10) / 10,
          height: Math.round(r.height * 10) / 10,
          display: style.display,
          visibility: style.visibility,
          overflowX: style.overflowX,
        };
      };
      const labels = [...document.querySelectorAll('label')].map(label => ({
        text: label.textContent.trim(),
        htmlFor: label.htmlFor || null,
        wrapsControl: Boolean(label.querySelector('input,select,textarea')),
      }));
      const controls = [...document.querySelectorAll('button,a[href],input:not([type="hidden"]),select,textarea,summary')]
        .filter(el => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
        }).map(rectInfo);
      const inputNames = [...document.querySelectorAll('input:not([type="hidden"]),select,textarea')].map(el => ({
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute('type'),
        name: el.getAttribute('name'),
        id: el.id || null,
        ariaLabel: el.getAttribute('aria-label'),
        ariaLabelledBy: el.getAttribute('aria-labelledby'),
        associatedLabels: el.labels ? [...el.labels].map(label => label.textContent.trim()) : [],
      }));
      const brokenImages = [...document.images].filter(img => img.src && !img.src.startsWith('data:') && img.naturalWidth === 0).map(img => img.src);
      const all = [...document.querySelectorAll('body *')];
      const overflowingElements = all.filter(el => {
        const r = el.getBoundingClientRect();
        return r.right > window.innerWidth + 1 || r.left < -1;
      }).slice(0, 20).map(el => ({ tag: el.tagName.toLowerCase(), className: String(el.className || ''), rect: { left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right), width: Math.round(el.getBoundingClientRect().width) } }));
      return {
        url: location.href,
        title: document.title,
        documentLanguage: document.documentElement.lang,
        viewport: { width: innerWidth, height: innerHeight },
        scroll: { bodyWidth: document.body.scrollWidth, documentWidth: document.documentElement.scrollWidth, horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1 },
        bodyTextSize: getComputedStyle(document.body).fontSize,
        landmarks: { main: document.querySelectorAll('main').length, nav: document.querySelectorAll('nav').length, header: document.querySelectorAll('header').length, footer: document.querySelectorAll('footer').length },
        headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ level: Number(h.tagName.slice(1)), text: h.textContent.trim() })),
        labels,
        inputNames,
        controls,
        undersizedControls: controls.filter(c => c.width < 44 || c.height < 44),
        brokenImages,
        overflowingElements,
        mobileToggle: document.querySelector('[data-mobile-menu-toggle]') ? rectInfo(document.querySelector('[data-mobile-menu-toggle]')) : null,
        mobileMenu: document.querySelector('[data-mobile-menu]') ? rectInfo(document.querySelector('[data-mobile-menu]')) : null,
        usersLinks: [...document.querySelectorAll('a')].filter(a => a.textContent.trim() === 'Users').map(a => ({ href: a.href, visible: a.getBoundingClientRect().width > 0 && a.getBoundingClientRect().height > 0 })),
      };
    });

    const focusOrder = [];
    for (let i = 0; i < 4; i += 1) {
      await page.keyboard.press('Tab');
      focusOrder.push(await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        const style = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute('type'),
          name: el.getAttribute('name'),
          text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
          outlineStyle: style.outlineStyle,
          outlineWidth: style.outlineWidth,
          boxShadow: style.boxShadow,
        };
      }));
    }

    results.viewports.push({
      viewport,
      initialStatus: response?.status() || null,
      finalURL: page.url(),
      responseHeaders: response?.headers() || {},
      screenshot: path.basename(screenshotPath),
      dom,
      focusOrder,
      consoleMessages,
      failedRequests,
      errorResponses: responses,
    });
    await context.close();
  }

  const routeContext = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const routePage = await routeContext.newPage();
  for (const route of protectedRoutes) {
    try {
      const response = await routePage.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      results.routeChecks.push({ route, status: response?.status() || null, finalURL: routePage.url(), title: await routePage.title(), error: null });
    } catch (error) {
      results.routeChecks.push({ route, status: null, finalURL: routePage.url(), title: await routePage.title().catch(() => ''), error: String(error.message || error).split('\n')[0] });
    }
  }
  const assets = ['/manifest.webmanifest', '/service-worker.js', '/static/style.css', '/static/saiko-logo-clean.png', '/static/app-icon-192.png'];
  for (const asset of assets) {
    const response = await routeContext.request.get(`${baseURL}${asset}`, { timeout: 45000 });
    results.assetChecks.push({ asset, status: response.status(), contentType: response.headers()['content-type'] || null, cacheControl: response.headers()['cache-control'] || null });
  }
  await routeContext.close();
  await browser.close();
  fs.writeFileSync(path.join(outputDir, 'production-ui-results.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({
    browserVersion: results.browserVersion,
    viewports: results.viewports.map(v => ({ name: v.viewport.name, status: v.initialStatus, finalURL: v.finalURL, overflow: v.dom.scroll.horizontalOverflow, undersized: v.dom.undersizedControls.length, missingInputLabels: v.dom.inputNames.filter(i => i.associatedLabels.length === 0 && !i.ariaLabel && !i.ariaLabelledBy).length, consoleMessages: v.consoleMessages.length, failedRequests: v.failedRequests.length, errorResponses: v.errorResponses.length })),
    routeChecks: results.routeChecks,
    assetChecks: results.assetChecks,
  }, null, 2));
})().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
