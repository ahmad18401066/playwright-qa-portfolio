import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);
});

test('cart shows the added item with the correct name and price', async ({ page }) => {
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
});

test('full checkout completes with a confirmation message', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Ahmad');
  await page.locator('[data-test="lastName"]').fill('Sheikh');
  await page.locator('[data-test="postalCode"]').fill('54600');
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.locator('.summary_total_label')).toContainText('$32.39');
  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('checkout with an empty first name shows an error', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="lastName"]').fill('Sheikh');
  await page.locator('[data-test="postalCode"]').fill('54600');
  await page.locator('[data-test="continue"]').click();
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('First Name is required');
});
