const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/Vinamra/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');

const baseURL = 'http://127.0.0.1:4177/test-results/mobile-ui/demo';
const outputDir = __dirname;
const viewports = [
  { name: '375x812', width: 375, height: 812 },
  { name: '768x1024', width: 768, height: 1024 },
];

function pageErrors(page) {
  const errors = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', error => errors.push(`page: ${error.message}`));
  page.on('requestfailed', request => errors.push(`request: ${request.url()} ${request.failure()?.errorText || ''}`));
  return errors;
}

async function inspect(page) {
  return page.evaluate(() => {
    const visible = element => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const dimensions = element => {
      const rect = element.getBoundingClientRect();
      return { width: Math.round(rect.width * 10) / 10, height: Math.round(rect.height * 10) / 10 };
    };
    const interactive = [...document.querySelectorAll('button, input:not([type="hidden"]), a[href]')].filter(visible);
    return {
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      bodyWidth: document.body.scrollWidth,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      controls: interactive.map(element => ({
        tag: element.tagName.toLowerCase(),
        text: (element.textContent || element.getAttribute('name') || '').trim().replace(/\s+/g, ' '),
        ...dimensions(element),
      })),
      brokenImages: [...document.images].filter(image => image.naturalWidth === 0).map(image => image.src),
      usersVisible: [...document.querySelectorAll('a')].filter(link => link.textContent.trim().startsWith('Users') && visible(link)).length,
      usersInDOM: [...document.querySelectorAll('a')].filter(link => link.textContent.trim().startsWith('Users')).length,
      menuOpen: document.querySelector('[data-mobile-menu]')?.classList.contains('is-open') || false,
      expanded: document.querySelector('[data-mobile-menu-toggle]')?.getAttribute('aria-expanded') || null,
    };
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-first-run', '--disable-default-apps'],
  });
  const results = { baseURL, generatedAt: new Date().toISOString(), browserVersion: browser.version(), viewports: [] };

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });

    const login = await context.newPage();
    const loginErrors = pageErrors(login);
    await login.goto(`${baseURL}/index.html`, { waitUntil: 'networkidle' });
    const loginState = await inspect(login);
    const labels = await login.evaluate(() => [...document.querySelectorAll('input')].map(input => ({ id: input.id, labels: [...input.labels].map(label => label.textContent.trim()) })));
    const submitPrevented = await login.evaluate(() => {
      const form = document.querySelector('[data-demo-form]');
      const event = new Event('submit', { bubbles: true, cancelable: true });
      return !form.dispatchEvent(event);
    });
    assert.equal(loginState.overflow, false, `${viewport.name} login must not overflow horizontally`);
    assert.deepEqual(loginState.brokenImages, [], `${viewport.name} login must have no broken images`);
    assert.deepEqual(labels, [{ id: 'login-username', labels: ['Username'] }, { id: 'login-password', labels: ['Password'] }]);
    assert.equal(submitPrevented, true, 'demo sign-in submission must be prevented');
    for (const control of loginState.controls.filter(control => ['input', 'button'].includes(control.tag))) {
      assert.ok(control.height >= 44, `${viewport.name} ${control.tag} ${control.text} is ${control.height}px high`);
    }
    await login.screenshot({ path: path.join(outputDir, `login-${viewport.name}.png`), fullPage: true });
    assert.deepEqual(loginErrors, [], `${viewport.name} login console/page/network errors`);

    const roleStates = {};
    for (const role of ['admin', 'staff']) {
      const page = await context.newPage();
      const errors = pageErrors(page);
      await page.goto(`${baseURL}/${role}.html`, { waitUntil: 'networkidle' });
      const closed = await inspect(page);
      assert.equal(closed.overflow, false, `${viewport.name} ${role} closed shell must not overflow horizontally`);
      assert.deepEqual(closed.brokenImages, [], `${viewport.name} ${role} shell must have no broken images`);
      await page.screenshot({ path: path.join(outputDir, `${role}-closed-${viewport.name}.png`), fullPage: true });

      let opened = null;
      let reclosed = null;
      const toggleVisible = await page.locator('[data-mobile-menu-toggle]').isVisible();
      if (toggleVisible) {
        const toggleBox = await page.locator('[data-mobile-menu-toggle]').boundingBox();
        assert.ok(toggleBox.height >= 44 && toggleBox.width >= 44, `${viewport.name} ${role} menu toggle must be at least 44px square`);
        await page.locator('[data-mobile-menu-toggle]').focus();
        await page.keyboard.press('Space');
        opened = await inspect(page);
        assert.equal(opened.menuOpen, true, `${viewport.name} ${role} menu must open from keyboard`);
        assert.equal(opened.expanded, 'true', `${viewport.name} ${role} aria-expanded must be true when open`);
        for (const control of opened.controls.filter(control => control.tag === 'a' && ['Dashboard', 'Inventory', 'Orders', 'Deliveries', 'Insights', 'Stock history', 'Users'].some(label => control.text.startsWith(label)))) {
          assert.ok(control.height >= 44, `${viewport.name} ${role} ${control.text} link is ${control.height}px high`);
        }
        await page.screenshot({ path: path.join(outputDir, `${role}-open-${viewport.name}.png`), fullPage: true });
        await page.keyboard.press('Space');
        reclosed = await inspect(page);
        assert.equal(reclosed.menuOpen, false, `${viewport.name} ${role} menu must close from keyboard`);
        assert.equal(reclosed.expanded, 'false', `${viewport.name} ${role} aria-expanded must be false when closed`);
      }
      assert.equal(closed.usersInDOM, role === 'admin' ? 1 : 0, `${role} Users DOM role guard`);
      assert.deepEqual(errors, [], `${viewport.name} ${role} console/page/network errors`);
      roleStates[role] = { closed, opened, reclosed, errors };
      await page.close();
    }
    results.viewports.push({ viewport, login: { state: loginState, labels, submitPrevented, errors: loginErrors }, roles: roleStates });
    await login.close();
    await context.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(outputDir, 'demo-browser-results.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({
    browserVersion: results.browserVersion,
    viewports: results.viewports.map(result => ({
      name: result.viewport.name,
      loginOverflow: result.login.state.overflow,
      loginControlHeights: result.login.state.controls.filter(control => ['input', 'button'].includes(control.tag)).map(control => control.height),
      adminMenuTested: Boolean(result.roles.admin.opened),
      staffMenuTested: Boolean(result.roles.staff.opened),
      adminUsersInDOM: result.roles.admin.closed.usersInDOM,
      staffUsersInDOM: result.roles.staff.closed.usersInDOM,
      errors: result.login.errors.length + result.roles.admin.errors.length + result.roles.staff.errors.length,
    })),
  }, null, 2));
})().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
