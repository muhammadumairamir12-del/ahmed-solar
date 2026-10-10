import { test, expect } from '@playwright/test';

test.describe('Ahmed Assistant UI & Integration Verification', () => {
  test('Ahmed Assistant floating button renders and opens chat modal', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Verify WhatsApp button is visible
    const whatsappBtn = page.locator('a[aria-label="Contact on WhatsApp"]');
    await expect(whatsappBtn).toBeVisible();

    // Verify Ahmed Assistant launcher button is visible
    const assistantLauncher = page.locator('button[title*="Ahmed Assistant"]');
    await expect(assistantLauncher).toBeVisible();

    // Take screenshot of floating launcher
    await page.screenshot({ path: 'verification_launcher.png' });

    // Click to open Ahmed Assistant modal
    await assistantLauncher.click();

    // Verify chat modal header
    const assistantTitle = page.locator('#assistant-modal-title');
    await expect(assistantTitle).toContainText('Ahmed Assistant');

    // Verify welcome message
    await expect(page.locator('text=AT Solar Power Solutions')).toBeVisible();

    // Verify quick suggestion buttons
    await expect(page.getByRole('button', { name: 'Book Free Site Visit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Get a Solar Quote' })).toBeVisible();

    // Take screenshot of open chat modal
    await page.screenshot({ path: 'verification_assistant_open.png' });

    // Minimize modal
    const closeBtn = page.locator('button[title="Minimize Chat"]');
    await closeBtn.click();

    // Confirm modal is closed
    await expect(page.locator('#assistant-modal-title')).not.toBeVisible();
  });

  test('Admin dashboard displays AI Solar Leads section', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');

    // Login as admin
    await page.fill('input[placeholder="ahmed"]', 'ahmed');
    await page.fill('input[type="password"]', 'solar123');
    await page.click('button:has-text("Secure Admin Login")');

    // Verify leads metric card
    await expect(page.locator('text=AI Solar Leads')).toBeVisible();

    // Verify leads table header
    await expect(page.getByRole('heading', { name: 'Ahmed Assistant — AI Solar Leads' })).toBeVisible();

    // Take screenshot of admin dashboard with leads section
    await page.screenshot({ path: 'verification_admin_leads.png' });
  });
});
