import { expect, test } from '@playwright/test';
import { forEachSite } from '../utils/site-test';

forEachSite('Home and primary navigation', (site) => {
  test('home page renders core shell (header, main and footer)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await expect(page).toHaveTitle(/.+/);
  });

  test('header navigation can open an internal page and logo returns home', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const navLinks = page
      .locator('header nav a[href]')
      .filter({ hasNotText: /^\s*$/ })
      .filter({ has: page.locator(':scope[href^="/"]') });

    await expect(navLinks.first()).toBeVisible();

    const href = (await navLinks.first().getAttribute('href')) ?? '/';
    await navLinks.first().click();
    await page.waitForLoadState('domcontentloaded');

    expect(new URL(page.url()).pathname).toContain(new URL(href, site.baseUrl).pathname);

    const logo = page.locator('header a[href="/"], header a[aria-label*="home" i]').first();
    await expect(logo).toBeVisible();
    await logo.click();
    await page.waitForLoadState('domcontentloaded');

    expect(new URL(page.url()).host).toBe(new URL(site.baseUrl).host);
  });
});
