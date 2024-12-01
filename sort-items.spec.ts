import { test, expect } from '@playwright/test';

// Shared setup logic before each test
test.beforeEach(async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('[data-test="username"]', 'locked_out_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
});

// Test 1: Verify sorting order Z-A
test('Verify sorting order Z-A', async ({ page }) => {
  // Select "Z-A" sorting
  await page.selectOption('.product_sort_container', 'za');

  // Get the names of all items
  const itemNames = await page.locator('.inventory_item_name').allTextContents();

  // Create a sorted copy of the names array in descending order
  const sortedItemNames = [...itemNames].sort().reverse();

  // Verify the original array matches the sorted array
  expect(itemNames).toEqual(sortedItemNames);
});

// Test 2: Verify price order High-Low
test('Verify price order High-Low', async ({ page }) => {
  // Select "Price (High-Low)" sorting
  await page.selectOption('.product_sort_container', 'hilo');

  // Get all prices and convert them to numbers
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));

  // Create a sorted copy of the prices array in descending order
  const sortedPrices = [...numericPrices].sort((a, b) => b - a);

  // Verify the original array matches the sorted array
  expect(numericPrices).toEqual(sortedPrices);
});
