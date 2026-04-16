import { expect, test } from '@playwright/test';
import { CONTENT_PATH_HINTS } from '../data/path-hints';
import { forEachSite } from '../utils/site-test';
import { openFirstMatchingLink } from '../utils/common-locators';

forEachSite('Content pages', () => {
  test('content page has heading, text structure and media', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const opened = await openFirstMatchingLink(
      page,
      CONTENT_PATH_HINTS,
      /read more|learn more|details|news|article|service|publication|event|training|video/i,
    );

    expect(opened).toBeTruthy();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1').first()).toBeVisible();
    expect(await page.locator('p, li, h2, h3').count()).toBeGreaterThan(0);

    const media = page.locator('img, video, iframe[src*="youtube" i], iframe[src*="vimeo" i]');
    expect(await media.count()).toBeGreaterThan(0);
  });
});
