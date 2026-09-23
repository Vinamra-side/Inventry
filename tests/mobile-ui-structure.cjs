const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const loginTemplate = fs.readFileSync(path.join(root, 'templates', 'login.html'), 'utf8');
const baseTemplate = fs.readFileSync(path.join(root, 'templates', 'base.html'), 'utf8');
const stylesheet = fs.readFileSync(path.join(root, 'static', 'style.css'), 'utf8');

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, 'i'));
  return match ? match[1] : null;
}

function inputTag(name) {
  return loginTemplate.match(new RegExp(`<input\\b(?=[^>]*\\bname=["']${name}["'])[^>]*>`, 'i'))?.[0] || '';
}

function cssRuleDeclarations(selectorPattern) {
  const rules = [];
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  for (const match of stylesheet.matchAll(rulePattern)) {
    const selectors = match[1].split(',').map(selector => selector.trim());
    if (selectors.some(selector => selectorPattern.test(selector))) rules.push(match[2]);
  }
  return rules.join('\n');
}

test('login fields have programmatically associated labels', () => {
  const problems = [];
  for (const field of ['username', 'password']) {
    const tag = inputTag(field);
    if (!tag) {
      problems.push(`missing ${field} input`);
      continue;
    }
    const id = attribute(tag, 'id');
    if (!id) {
      problems.push(`${field} input has no stable id`);
      continue;
    }
    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`<label\\b[^>]*\\bfor=["']${escapedId}["'][^>]*>`, 'i').test(loginTemplate)) {
      problems.push(`${field} label does not reference input#${id}`);
    }
  }
  assert.deepEqual(problems, [], problems.join('; '));
});

test('login submit target is at least 44px high', () => {
  const submit = loginTemplate.match(/<button\b(?=[^>]*\btype=["']submit["'])[^>]*>/i)?.[0] || '';
  assert.ok(submit, 'expected a submit button in the login form');

  // These selectors all apply to the login submit button. A dedicated rule is
  // preferable, but a shared stacked-form/button rule is also an acceptable fix.
  const declarations = cssRuleDeclarations(
    /^(?:button|\.auth-page\s+button|\.auth-card(?:\s+form\.stacked)?\s+button|form\.stacked\s+button)$/,
  );
  const sizes = [...declarations.matchAll(/(?:min-height|height)\s*:\s*([0-9.]+)px\b/gi)]
    .map(match => Number(match[1]));
  assert.ok(
    sizes.some(size => size >= 44),
    'login submit button needs an effective height or min-height of at least 44px',
  );
});

test('mobile navigation toggle has a visible, accessible menu affordance', () => {
  const toggle = baseTemplate.match(
    /<button\b(?=[^>]*\bdata-mobile-menu-toggle\b)([^>]*)>([\s\S]*?)<\/button>/i,
  );
  assert.ok(toggle, 'expected a mobile navigation toggle button');
  const accessibleName = attribute(toggle[0], 'aria-label') || attribute(toggle[0], 'title');
  assert.ok(accessibleName?.trim(), 'mobile navigation toggle must have an accessible name');

  const visibleContent = toggle[2]
    .replace(/<[^>]+aria-hidden=["']true["'][^>]*>[\s\S]*?<\/[^>]+>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
  const visibleGraphic = /<(?:svg|img)\b(?![^>]*aria-hidden=["']true["'])[^>]*>/i.test(toggle[2]);
  assert.ok(
    visibleContent || visibleGraphic,
    'mobile navigation toggle must render visible menu text or a non-hidden graphic',
  );
});

test('mobile navigation exposes Users only to administrators', () => {
  const mobileMenu = baseTemplate.match(
    /<nav\b(?=[^>]*\bdata-mobile-menu\b)[^>]*>([\s\S]*?)<\/nav>/i,
  );
  assert.ok(mobileMenu, 'expected the mobile navigation region');
  assert.match(mobileMenu[1], /url_for\(["']users["']\)/, 'expected an administrator Users link');
  assert.match(
    mobileMenu[1],
    /{%\s*if\s+session\.get\(["']role["']\)\s*==\s*["']admin["']\s*%}[\s\S]*?url_for\(["']users["']\)[\s\S]*?{%\s*endif\s*%}/,
    'Users link must be enclosed by the admin-role template condition defined in AUTH_SETUP.md',
  );
});
