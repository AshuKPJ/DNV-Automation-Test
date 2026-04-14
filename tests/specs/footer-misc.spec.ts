import { expect, test } from '@playwright/test';
import { forEachSite } from '../utils/site-test';

forEachSite('Footer and browser navigation', () => {
  test('footer links render and browser back/forward keeps navigation stable', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const footerLinks = page.locator('footer a[href]');
    await expect(footerLinks.first()).toBeVisible();

    const startUrl = page.url();
    await footerLinks.first().click();
    await page.waitForLoadState('domcontentloaded');

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toBe(startUrl);

    await page.goForward();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('main')).toBeVisible();
  });
});
