import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Testing', () => {
  test('Check accessibility on All Items page', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Login as standard_user
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Inject Axe into the page
    await injectAxe(page);

    // Run accessibility checks on the All Items page
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
});
 
