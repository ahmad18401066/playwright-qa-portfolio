import { defineConfig, devices } from '@playwright/test';

// If the machine runs behind a proxy (for example a corporate egress proxy),
// Playwright picks it up from the HTTPS_PROXY / https_proxy environment
// variable at run time. The proxy is never hard-coded into this file.
// On a normal machine without a proxy set, this is a no-op.
function proxyFromEnv() {
  const raw = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return {
      server: `${url.protocol}//${url.host}`,
      username: decodeURIComponent(url.username) || undefined,
      password: decodeURIComponent(url.password) || undefined,
    };
  } catch {
    return { server: raw };
  }
}

const proxy = proxyFromEnv();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Only used when a proxy is set via the environment (see above).
    // A proxy that re-signs TLS traffic needs cert errors ignored for
    // the test browser only; without a proxy this stays off.
    proxy,
    ignoreHTTPSErrors: !!proxy,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
