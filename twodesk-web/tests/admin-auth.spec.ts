import { test, expect } from '@playwright/test';

// proxy.ts ต้อง redirect ไป /admin/login เมื่อไม่มี session
test.describe('admin pages require login', () => {
  const protectedPaths = ['/admin', '/admin/projects', '/admin/settings/team'];

  for (const path of protectedPaths) {
    test(`${path} → redirect to /admin/login`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/admin\/login/);
    });
  }

  test('/admin/login renders the sign-in form', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
