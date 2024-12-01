import { test, expect } from '@playwright/test';

// Shared setup logic before each test
test.beforeEach(async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
});

test('Validate checkout journey', async ({ page }) => {
  // Step 1: Add items to the cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

  // Step 2: Go to the cart
  await page.click('.shopping_cart_link');
  
  // Verify items in the cart
  const cartItems = await page.locator('.cart_item').count();
  expect(cartItems).toBe(2); // Verify 2 items are in the cart

  // Step 3: Proceed to checkout
  await page.click('[data-test="checkout"]');

  // Step 4: Fill in checkout information
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  // Step 5: Verify total price (including tax)
  const itemPrices = await page.locator('.inventory_item_price').allTextContents();
  const totalPrice = itemPrices.reduce((total, price) => total + parseFloat(price.replace('$', '')), 0);

  // Get the displayed tax
  const tax = parseFloat((await page.locator('.summary_tax_label').textContent()).replace('Tax: $', ''));

  // Get the displayed total price
  const displayedTotal = parseFloat((await page.locator('.summary_total_label').textContent()).replace('Total: $', ''));

  // Verify that the displayed total matches calculated total + tax
  expect(displayedTotal).toBe(totalPrice + tax);

  // Step 6: Complete the purchase
  await page.click('[data-test="finish"]');
  const confirmationMessage = await page.locator('.complete-header').textContent();

  // Updated the expected message to match actual text
  expect(confirmationMessage).toBe('Thank you for your order!');
});
