import { expect, test } from '@playwright/test';
import { LISTING_PATH_HINTS } from '../data/path-hints';
import { forEachSite } from '../utils/site-test';
import { openFirstMatchingLink } from '../utils/common-locators';

forEachSite('Listings', () => {
  test('listing pages return cards, filter/search controls and load-more behavior', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const opened = await openFirstMatchingLink(
      page,
      LISTING_PATH_HINTS,
      /services?|events?|trainings?|news|articles?|cases?|publications?|videos?/i,
    );

    expect(opened).toBeTruthy();
    await page.waitForLoadState('domcontentloaded');

    const cards = page.locator('article, [class*="card" i], [class*="tile" i], main li');
    await expect(cards.first()).toBeVisible();

    const searchControl = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    if (await searchControl.isVisible().catch(() => false)) {
      await searchControl.fill('wind');
      await searchControl.press('Enter');
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('main')).toBeVisible();
    }

    const loadMore = page.getByRole('button', { name: /load more|show more|more/i }).first();
    if (await loadMore.isVisible().catch(() => false)) {
      const before = await cards.count();
      await loadMore.click();
      await page.waitForTimeout(1000);
      const after = await cards.count();
      expect(after).toBeGreaterThanOrEqual(before);
    }
  });
});
