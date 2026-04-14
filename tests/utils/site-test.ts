import { test } from '@playwright/test';
import { SITES } from '../data/sites';

type Site = (typeof SITES)[number];
const target = process.env.DNV_TARGET_SITE;

export const selectedSites: Site[] = target
  ? SITES.filter((site) => site.baseUrl.includes(target) || site.name === target)
  : SITES;

export function forEachSite(suiteName: string, run: (site: Site) => void): void {
  if (selectedSites.length === 0) {
    throw new Error(`No sites selected. DNV_TARGET_SITE=\"${target}\" did not match configured sites.`);
  }

  for (const site of selectedSites) {
    test.describe(`${suiteName} | ${site.baseUrl}`, () => {
      test.use({
        baseURL: site.baseUrl,
        locale: site.locale,
      });
      run(site);
    });
  }
}
