import { test, expect } from '@playwright/test';

test.describe('Poster Screenshot Tests', () => {
  test('should match snapshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot and compare to snapshot
    await expect(page).toHaveScreenshot('poster-page.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
