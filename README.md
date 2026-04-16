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

## Clone to local machine and push to your GitHub repository

Use this when you want to copy this project to your computer and store it in your own GitHub repo.

```bash
# 1) Clone this repository
git clone https://github.com/<source-owner>/<source-repo>.git
cd <source-repo>

# 2) (Optional) create a new branch for your changes
git checkout -b feat/playwright-regression

# 3) Make changes, then commit
git add -A
git commit -m "Add Playwright regression suite updates"

# 4) Point origin to your own GitHub repository
# (first create an empty repo in GitHub UI)
git remote remove origin
git remote add origin https://github.com/<your-user>/<your-repo>.git

# 5) Push to GitHub
git push -u origin feat/playwright-regression

# 6) Create a Pull Request in GitHub UI from feat/playwright-regression -> main
```

If you want to push directly to `main` instead of a feature branch:

```bash
git push -u origin main
```

## Run tests locally in VS Code

1. Open this folder in VS Code.
2. Open an integrated terminal and install dependencies:

```bash
npm install
npx playwright install
```

3. Run all tests from terminal:

```bash
npm test
```

4. Run a single suite (example):

```bash
npx playwright test tests/specs/listings.spec.ts
```

5. Run one site only (example: dnv.com):

```bash
DNV_TARGET_SITE=dnv-com npx playwright test
```

6. Open the HTML report after a run:

```bash
npx playwright show-report
```

### Optional: use the VS Code Playwright extension

- Install extension: **Playwright Test for VSCode**.
- Open the Testing panel to run/debug individual tests.
- Use **Record New** for quick locator generation if needed.

## Troubleshooting: `npm install` ENOENT (package.json not found)

If you see an error like:

- `Could not read package.json`
- `open 'C:\\Users\\ASHJAD\\package.json'`

it means you are running `npm install` in the wrong folder.

### Fix (PowerShell)

```powershell
# Go to the project directory (where package.json exists)
cd C:\Users\ASHJAD\DNV-Automation-Test

# Confirm package.json is present
dir package.json

# Then install dependencies
npm install
npx playwright install

# Run tests
npm test
```

### If project is not on your machine yet

```powershell
cd C:\Users\ASHJAD
git clone https://github.com/<owner>/DNV-Automation-Test.git
cd .\DNV-Automation-Test
npm install
npx playwright install
npm test
```

### Windows note for `npm run test:dnv-*`

If you are on Windows PowerShell/CMD, use the npm scripts (`npm run test:dnv-com`, etc.) instead of setting env vars inline manually. These scripts use `cross-env` so they work on Windows, macOS, and Linux.

## Resolving merge conflicts for `README.md` and `package.json`

If GitHub shows conflicts between your branch and `main`:

```bash
# 1) Update local refs
git fetch origin

# 2) Checkout your feature branch
git checkout codex/create-end-to-end-automation-tests-with-playwright-yfejlo

# 3) Merge main into your branch
git merge origin/main
```

Git will stop on conflicts. Open `README.md` and `package.json`, then remove conflict markers:

- `<<<<<<< HEAD`
- `=======`
- `>>>>>>> origin/main`

Keep the final combined content you want, then run:

```bash
# 4) Mark conflicts as resolved
git add README.md package.json

# 5) Complete merge commit
git commit -m "Resolve merge conflicts with main for README and package scripts"

# 6) Push updated branch
git push origin codex/create-end-to-end-automation-tests-with-playwright-yfejlo
```

After push, GitHub PR conflict status will refresh and should be resolved.
