import { test, expect } from '@playwright/test';

test.describe('Performance Testing: performance_glitch_user', () => {
  test('Measure page load time', async ({ page }) => {
    const startTime = Date.now(); // Start timer

    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Login with performance_glitch_user
    await page.fill('[data-test="username"]', 'performance_glitch_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Wait for the "All Items" page to load
    await page.waitForSelector('.inventory_list');

    const loadTime = Date.now() - startTime; // Calculate load time in milliseconds
    console.log(`Page load time for performance_glitch_user: ${loadTime} ms`);

    // Adjust threshold for this user
    expect(loadTime).toBeLessThan(12000); // 12 seconds threshold for slow user
  });
});
