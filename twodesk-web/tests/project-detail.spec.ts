import { test, expect } from '@playwright/test';

const BASE = '/en/projects/flow-the-hub';

test.describe('Project Detail Page — Flow the Hub', () => {
  test.describe('Hero Section', () => {
    test('should display a large hero image at full width', async ({ page }) => {
      await page.goto(BASE);

      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();

      const heroImage = heroSection.locator('img');
      await expect(heroImage).toBeVisible();

      // Hero section should take full width
      const width = await heroSection.evaluate((el) => el.getBoundingClientRect().width);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(width).toBeCloseTo(viewportWidth, -1);
    });

    test('should have hero image with appropriate height', async ({ page }) => {
      await page.goto(BASE);

      const heroSection = page.locator('section').first();
      const height = await heroSection.evaluate((el) => el.getBoundingClientRect().height);
      // Should be at least 300px (responsive: 50vh on mobile, 70vh on desktop)
      expect(height).toBeGreaterThan(300);
    });
  });

  test.describe('Project Info', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE);
    });

    test('should display the category label', async ({ page }) => {
      const categoryTag = page.locator('span.uppercase').filter({ hasText: /cafe/i });
      await expect(categoryTag.first()).toBeVisible();
    });

    test('should display the project title as a large heading', async ({ page }) => {
      const title = page.getByRole('heading', { name: 'Flow the Hub' });
      await expect(title).toBeVisible();

      const fontSize = await title.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      const fontSizePx = parseFloat(fontSize);
      // Should be large (at least 30px, likely 36-48px)
      expect(fontSizePx).toBeGreaterThanOrEqual(30);
    });

    test('should display the project description', async ({ page }) => {
      const description = page.getByText('A modern cafe hub designed to blend');
      await expect(description).toBeVisible();
    });

    test('should display Location info', async ({ page }) => {
      const locationLabel = page.getByText('Location', { exact: true });
      await expect(locationLabel).toBeVisible();

      const locationValue = page
        .locator('section')
        .nth(1)
        .getByText('Bangkok, Thailand');
      await expect(locationValue.first()).toBeVisible();
    });

    test('should display Year info with value "2024"', async ({ page }) => {
      const yearLabel = page.getByText('Year', { exact: true });
      await expect(yearLabel).toBeVisible();

      const yearValue = page.getByText('2024', { exact: true });
      await expect(yearValue).toBeVisible();
    });

    test('should display Category info in the sidebar', async ({ page }) => {
      const categoryLabel = page
        .locator('p.uppercase')
        .filter({ hasText: /^Category$/i });
      await expect(categoryLabel).toBeVisible();

      // The category value in the info section
      const categoryValue = page.locator('p.capitalize').filter({ hasText: /cafe/i });
      await expect(categoryValue).toBeVisible();
    });
  });

  test.describe('Image Gallery', () => {
    test('should display multiple gallery images', async ({ page }) => {
      await page.goto(BASE);

      // Gallery grid section — 2-column grid with images
      const galleryGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2').first();
      await expect(galleryGrid).toBeVisible();

      const galleryImages = galleryGrid.locator('img');
      const count = await galleryImages.count();
      // At least 3 gallery images (2 in 2-col + 1 full-width)
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should have gallery images visible', async ({ page }) => {
      await page.goto(BASE);

      const galleryGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2').first();
      const images = galleryGrid.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        await expect(images.nth(i)).toBeVisible();
      }
    });
  });

  test.describe('Next Project Section', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE);
    });

    test('should display "Next Project" label', async ({ page }) => {
      const nextLabel = page.getByText('Next Project');
      await expect(nextLabel).toBeVisible();
    });

    test('should display the next project title as a link', async ({ page }) => {
      // Flow the Hub is index 0, next is Office Sakaew
      const nextProjectLink = page.locator('a').filter({ hasText: 'Office Sakaew' });
      await expect(nextProjectLink).toBeVisible();
    });

    test('should navigate to next project when clicking the link', async ({ page }) => {
      await page.locator('a').filter({ hasText: 'Office Sakaew' }).click();
      await page.waitForURL('**/projects/office-sakaew');

      await expect(page).toHaveURL(/\/en\/projects\/office-sakaew/);
    });
  });

  test.describe('Navigation', () => {
    test('should have a back link to projects listing', async ({ page }) => {
      await page.goto(BASE);

      const backLink = page.locator('a').filter({ hasText: 'Back to Projects' });
      await expect(backLink).toBeVisible();

      await backLink.click();
      await page.waitForURL('**/projects');

      await expect(page).toHaveURL(/\/en\/projects$/);
    });

    test('should have functional navigation at the top', async ({ page }) => {
      await page.goto(BASE);

      const nav = page.locator('nav');
      await expect(nav.first()).toBeVisible();
    });
  });

  test.describe('Mobile (390px)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('should stack info grid vertically on mobile', async ({ page }) => {
      await page.goto(BASE);

      // On mobile, the flex layout should stack (flex-col)
      const infoSection = page.locator('.flex.flex-col.gap-8').first();
      await expect(infoSection).toBeVisible();

      const flexDirection = await infoSection.evaluate((el) => {
        return window.getComputedStyle(el).flexDirection;
      });
      expect(flexDirection).toBe('column');
    });

    test('should stack gallery images to 1 column on mobile', async ({ page }) => {
      await page.goto(BASE);

      const galleryGrid = page.locator('.grid.grid-cols-1').first();
      const columns = await galleryGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      const columnCount = columns.split(' ').length;
      expect(columnCount).toBe(1);
    });

    test('should still show all essential project info on mobile', async ({ page }) => {
      await page.goto(BASE);

      await expect(page.getByRole('heading', { name: 'Flow the Hub' })).toBeVisible();
      await expect(page.getByText('Location', { exact: true })).toBeVisible();
      await expect(page.getByText('Year', { exact: true })).toBeVisible();
      await expect(page.getByText('2024', { exact: true })).toBeVisible();
    });
  });
});
