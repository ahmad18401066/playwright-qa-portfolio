# Playwright QA Portfolio

A small, real test-automation project by **Ahmad Shawal Sheikh** (QA Engineer, Lahore).
It shows end-to-end UI testing and API testing with **Playwright + TypeScript**.

## What it covers

**UI tests — SauceDemo (https://www.saucedemo.com)**
- Login: valid login, wrong password error, locked-out user error
- Products: 6 products listed, add to cart updates the cart badge, sort by price (low to high)
- Cart & checkout: cart shows the right item and price, full checkout ends with "Thank you for your order!", checkout with an empty first name shows an error

**API tests — JSONPlaceholder (https://jsonplaceholder.typicode.com)**
- GET /posts returns 100 posts (status 200)
- GET /posts/1 returns the post with id 1
- POST /posts creates a post (status 201)

Total: **12 tests** (9 UI + 3 API).

## How to run

```bash
npm ci
npx playwright install chromium
npx playwright test
```

Other commands:

```bash
npx playwright test tests/api.spec.ts   # API tests only
npx playwright test tests/auth.spec.ts tests/inventory.spec.ts tests/checkout.spec.ts  # UI tests only
npx playwright show-report              # open the HTML report
```

## Notes

- This project tests **public demo sites only** (SauceDemo and JSONPlaceholder).
- No real company data, no client data, and no internal details from any employer are used here.
- Tests run in Chromium on GitHub Actions (see `.github/workflows/playwright.yml`).
- Running behind a corporate proxy? Set the `HTTPS_PROXY` environment variable before running the tests — `playwright.config.ts` picks it up automatically (and only then ignores TLS errors for the test browser).
