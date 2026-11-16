import { test, expect } from '@playwright/test';

const VALID_USER = { username: 'standard_user', password: 'secret_sauce' };

async function login(page, username: string, password: string) {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test('valid login takes the user to the products page', async ({ page }) => {
  await login(page, VALID_USER.username, VALID_USER.password);
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('wrong password shows an error message', async ({ page }) => {
  await login(page, VALID_USER.username, 'wrong_password');
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');
});

test('locked-out user cannot log in', async ({ page }) => {
  await login(page, 'locked_out_user', VALID_USER.password);
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('locked out');
});
