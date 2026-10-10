import { test, expect } from '@playwright/test';

test.describe('Solar Website Verification Test Suite', () => {
  test('Home Page loads 3D Canvas, Featured Products, and Navigation', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Check Header & Title with exact locator or first element
    await expect(page.locator('h1')).toContainText('Switch to');
    await expect(page.locator('text=Interactive 3D Photovoltaic Simulation')).toBeVisible();

    // Check Featured Products
    await expect(page.getByRole('heading', { name: 'Jinko Solar Tiger Neo N-Type 585W' })).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'verification_home.png', fullPage: true });
  });

  test('Category and Brand Filtering Works', async ({ page }) => {
    await page.goto('http://localhost:5173/category/solar-panels');
    await expect(page.locator('h1')).toContainText('Solar Panels');
    
    // Check brand filter buttons
    const jinkoBtn = page.getByRole('button', { name: 'Jinko Solar' });
    await expect(jinkoBtn).toBeVisible();

    // Click Jinko Solar brand filter
    await jinkoBtn.click();
    await expect(page.getByRole('heading', { name: 'Jinko Solar Tiger Neo N-Type 585W' })).toBeVisible();

    await page.screenshot({ path: 'verification_category.png', fullPage: true });
  });

  test('Admin Panel Login & Product Management', async ({ page }) => {
    await page.goto('http://localhost:5173/admin');
    
    // Perform Admin Login
    await page.fill('input[placeholder="ahmed"]', 'ahmed');
    await page.fill('input[type="password"]', 'solar123');
    await page.click('button:has-text("Secure Admin Login")');

    // Verify Dashboard
    await expect(page.getByRole('heading', { name: 'Ahmed Bhai Admin Dashboard' })).toBeVisible();

    // Go to product manager
    await page.click('text=Product Management');
    await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();

    await page.screenshot({ path: 'verification_admin.png', fullPage: true });
  });
});
