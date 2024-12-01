import { test, expect } from '@playwright/test';

test.describe('Visual Comparison Across All Pages', () => {

  // Helper function for login
  const login = async (page, username, password) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');
  };

  // Helper function for logout
  const logout = async (page) => {
    await page.click('#react-burger-menu-btn'); // Open hamburger menu
    await page.click('#logout_sidebar_link');   // Click logout
  };

  // Test case for standard_user
  test('Capture snapshots for standard_user', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    // Capture "All Items" page
    await expect(page).toHaveScreenshot('standard_user_all_items.png');

    // Navigate to a product page
    await page.click('.inventory_item:nth-of-type(1) .inventory_item_name'); // First product
    await expect(page).toHaveScreenshot('standard_user_product_page.png');

    // Navigate to the cart
    await page.click('.shopping_cart_link');
    await expect(page).toHaveScreenshot('standard_user_cart_page.png');

    await logout(page);
  });

  // Test case for visual_user
  test('Capture snapshots for visual_user', async ({ page }) => {
    await login(page, 'visual_user', 'secret_sauce');

    // Capture "All Items" page
    await expect(page).toHaveScreenshot('visual_user_all_items.png');

    // Navigate to a product page
    await page.click('.inventory_item:nth-of-type(1) .inventory_item_name'); // First product
    await expect(page).toHaveScreenshot('visual_user_product_page.png');

    // Navigate to the cart
    await page.click('.shopping_cart_link');
    await expect(page).toHaveScreenshot('visual_user_cart_page.png');

    await logout(page);
  });
});
