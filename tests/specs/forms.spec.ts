import { expect, test } from '@playwright/test';
import { FORM_PATH_HINTS } from '../data/path-hints';
import { forEachSite } from '../utils/site-test';
import { openFirstMatchingLink } from '../utils/common-locators';

forEachSite('Forms', () => {
  test('form validation blocks empty submit', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const opened = await openFirstMatchingLink(page, FORM_PATH_HINTS, /contact|register|apply|download|form/i);
    if (opened) {
      await page.waitForLoadState('domcontentloaded');
    }

    const form = page.locator('form').first();
    if (!(await form.isVisible().catch(() => false))) {
      test.skip(true, 'No form discovered in this site smoke path.');
    }

    const submit = page.getByRole('button', { name: /submit|send|register|download|continue/i }).first();
    if (!(await submit.isVisible().catch(() => false))) {
      test.skip(true, 'No form submit button discovered.');
    }

    await submit.click();

    const validation = page.locator('[aria-invalid="true"], [role="alert"], .error, [class*="validation" i]');
    await expect(validation.first()).toBeVisible();
  });
});
