import { test, expect } from '@playwright/test';

test.describe('Extended Visual Regression Testing with Reporting', () => {

  // Utility function to stabilize the page by hiding dynamic elements
  const stabilizePage = async (page) => {
    await page.evaluate(() => {
      const elementsToHide = document.querySelectorAll('.dynamic-element-class, .ad-banner-class');
      elementsToHide.forEach(el => el.style.visibility = 'hidden');
    });
    await page.waitForTimeout(1000); // Wait for animations to complete
  };

  // Helper function to log in
  const login = async (page, username) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
  };

  // Test for capturing screenshots across all pages for standard_user
  test('Visual comparison for all pages (standard_user)', async ({ page }) => {
    await login(page, 'standard_user');
    await stabilizePage(page);

    // Capture "All Items" page
    await expect(page).toHaveScreenshot('standard_user_all_items.png');

    // Navigate to a product page
    await page.click('.inventory_item:nth-of-type(1) .inventory_item_name');
    await stabilizePage(page); // Stabilize dynamic content
    await expect(page).toHaveScreenshot('standard_user_product_page.png');

    // Navigate to the cart page
    await page.click('.shopping_cart_link');
    await stabilizePage(page); // Stabilize dynamic content
    await expect(page).toHaveScreenshot('standard_user_cart_page.png');

    // Proceed to checkout
    await page.click('[data-test="checkout"]');
    await stabilizePage(page);
    await expect(page).toHaveScreenshot('standard_user_checkout_page.png');
  });

  // Test for visual comparison for visual_user
  test('Visual comparison for all pages (visual_user)', async ({ page }) => {
    await login(page, 'visual_user');
    await stabilizePage(page);

    // Capture "All Items" page
    await expect(page).toHaveScreenshot('visual_user_all_items.png');

    // Navigate to a product page
    await page.click('.inventory_item:nth-of-type(1) .inventory_item_name');
    await stabilizePage(page);
    await expect(page).toHaveScreenshot('visual_user_product_page.png');

    // Navigate to the cart page
    await page.click('.shopping_cart_link');
    await stabilizePage(page);
    await expect(page).toHaveScreenshot('visual_user_cart_page.png');

    // Proceed to checkout
    await page.click('[data-test="checkout"]');
    await stabilizePage(page);
    await expect(page).toHaveScreenshot('visual_user_checkout_page.png');
  });

  // Test for visual comparison for problem_user
  test('Visual comparison for all pages (problem_user)', async ({ page }) => {
    await login(page, 'problem_user');
    await stabilizePage(page);

    // Capture "All Items" page
    await expect(page).toHaveScreenshot('problem_user_all_items.png');

    // Navigate to a product page
    await page.click('.inventory_item:nth-of-type(1) .inventory_item_name');
    await stabilizePage(page);
    await expect(page).toHaveScreenshot('problem_user_product_page.png');

    // Navigate to the cart page
    await page.click('.shopping_cart_link');
    await stabilizePage(page);
    await expect(page).toHaveScreenshot('problem_user_cart_page.png');

    // Proceed to checkout
    await page.click('[data-test="checkout"]');
    await stabilizePage(page);
    await expect(page).toHaveScreenshot('problem_user_checkout_page.png');
  });
});
