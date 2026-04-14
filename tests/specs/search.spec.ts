import { expect, test } from '@playwright/test';
import { forEachSite } from '../utils/site-test';

forEachSite('Search', () => {
  test('global search works for valid and nonsense queries', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const search = page.locator('header input[type="search"], input[aria-label*="search" i]').first();
    await expect(search).toBeVisible();

    await search.fill('sustainability');
    await search.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('main')).toBeVisible();

    await search.fill('!@#$%^&*()___nonexistent___12345');
    await search.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('main')).toBeVisible();
  });
});
