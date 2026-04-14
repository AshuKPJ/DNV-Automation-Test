import { Locator, Page } from '@playwright/test';

export async function clickFirstVisible(locator: Locator): Promise<boolean> {
  const count = await locator.count();
  for (let index = 0; index < count; index += 1) {
    const candidate = locator.nth(index);
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.click();
      return true;
    }
  }

  return false;
}

export async function openFirstMatchingLink(page: Page, hints: string[], textRegex: RegExp): Promise<boolean> {
  const byText = page.locator('a[href]').filter({ hasText: textRegex });
  if (await clickFirstVisible(byText)) {
    return true;
  }

  const byPath = page.locator(hints.map((hint) => `a[href*="${hint}"]`).join(', '));
  return clickFirstVisible(byPath);
}
