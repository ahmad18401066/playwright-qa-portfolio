import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
});

test('inventory lists 6 products', async ({ page }) => {
  await expect(page.locator('.inventory_item')).toHaveCount(6);
  await expect(page.locator('.inventory_item_name').first()).toBeVisible();
});

test('adding a product to the cart updates the cart badge', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('sorting by price low to high shows the cheapest item first', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  const firstPrice = page.locator('.inventory_item_price').first();
  await expect(firstPrice).toHaveText('$7.99');
});
