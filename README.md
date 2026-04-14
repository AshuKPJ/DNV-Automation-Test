# DNV End-to-End Regression Automation (Playwright)

This repository contains a maintainable Playwright smoke-regression suite for:

- `https://www.dnv.com`
- `https://www.dnv.br`
- `https://www.dnv.it`

The suite is intentionally split by feature area so each checklist domain is easy to maintain.

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npm test
npm run test:desktop
npm run test:mobile
npm run test:dnv-com
npm run test:dnv-br
npm run test:dnv-it
npm run test:report
```

## Folder Structure

```text
tests/
  data/
    path-hints.ts        # path and keyword hints for discovery
    sites.ts             # site matrix and locale config
  utils/
    common-locators.ts   # reusable discovery/open helpers
    site-test.ts         # per-site test generation
  specs/
    home-navigation.spec.ts
    listings.spec.ts
    content-pages.spec.ts
    search.spec.ts
    forms.spec.ts
    footer-misc.spec.ts
```

## Checklist Mapping

- **General Listings:** `tests/specs/listings.spec.ts`
- **Individual Content Pages:** `tests/specs/content-pages.spec.ts`
- **Search Functionality:** `tests/specs/search.spec.ts`
- **Forms (validation smoke):** `tests/specs/forms.spec.ts`
- **Header/Footer/Navigation:** `tests/specs/home-navigation.spec.ts`, `tests/specs/footer-misc.spec.ts`
- **Responsive coverage:** desktop + mobile projects in `playwright.config.ts`

## Notes

- Tests use resilient public-site selectors and fallbacks to avoid brittle CMS coupling.
- For strict deterministic CMS/editing-mode assertions, add dedicated test fixtures and stable `data-testid` attributes.

## Git: Commit all files

To commit all current changes to your local branch:

```bash
git add -A
git commit -m "Add/update Playwright regression suite files"
git push origin <your-branch-name>
```

If you want to verify what will be committed first:

```bash
git status
git diff --staged
```

## Why commits may not appear on GitHub

A local commit is not visible on GitHub until you push to a remote.

```bash
# Check current branch
git branch --show-current

# Check whether a GitHub remote exists
git remote -v

# If no remote is listed, add it (replace with your repo URL)
git remote add origin https://github.com/<user>/<repo>.git

# Push your branch
git push -u origin <your-branch-name>

# Or push directly to main (if that is your workflow)
git push origin HEAD:main
```
