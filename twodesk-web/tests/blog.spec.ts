import { test, expect } from '@playwright/test';

const BASE = '/en/blog';

test.describe('Blog Listing Page', () => {
  test.describe('Page Header', () => {
    test('should display "INSIGHTS" label', async ({ page }) => {
      await page.goto(BASE);

      const label = page.getByText('Insights', { exact: true });
      await expect(label).toBeVisible();
    });

    test('should display "From the Studio" heading', async ({ page }) => {
      await page.goto(BASE);

      const heading = page.getByRole('heading', { name: 'From the Studio' });
      await expect(heading).toBeVisible();
    });

    test('should display description about design insights', async ({ page }) => {
      await page.goto(BASE);

      const description = page.getByText(
        'Thoughts on design, behind-the-scenes stories, and practical tips from our team.'
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('Article Grid', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE);
    });

    test('should display at least 3 articles', async ({ page }) => {
      const articleLinks = page.locator('a[href*="/blog/"]');
      const count = await articleLinks.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should display article cards with image, category, date, title, and excerpt', async ({
      page,
    }) => {
      // First article card
      const firstCard = page.locator('a[href*="/blog/5-interior-trends"]');
      await expect(firstCard).toBeVisible();

      // Image
      const img = firstCard.locator('img');
      await expect(img).toBeVisible();

      // Category and date
      const meta = firstCard.getByText('Design Trends');
      await expect(meta).toBeVisible();

      const dateMeta = firstCard.getByText('Mar 2025');
      await expect(dateMeta).toBeVisible();

      // Title
      await expect(
        firstCard.getByText("5 Interior Trends Shaping Bangkok's Cafe Scene")
      ).toBeVisible();

      // Excerpt
      await expect(
        firstCard.getByText("From raw concrete to biophilic design")
      ).toBeVisible();
    });

    test('should display the "Behind the Scenes" article', async ({ page }) => {
      const btsCard = page.locator('a[href*="/blog/flow-the-hub-bts"]');
      await expect(btsCard).toBeVisible();

      await expect(
        btsCard.getByText('How We Designed Flow the Hub from Scratch')
      ).toBeVisible();

      await expect(btsCard.getByText('Behind the Scenes')).toBeVisible();
      await expect(btsCard.getByText('Feb 2025')).toBeVisible();
    });

    test('should display the "Tips" article', async ({ page }) => {
      const tipsCard = page.locator('a[href*="/blog/hiring-design-studio"]');
      await expect(tipsCard).toBeVisible();

      await expect(
        tipsCard.getByText('What to Prepare Before Hiring a Design Studio')
      ).toBeVisible();

      await expect(tipsCard.getByText('Tips')).toBeVisible();
      await expect(tipsCard.getByText('Jan 2025')).toBeVisible();
    });

    test('should display each article with an image', async ({ page }) => {
      const articleLinks = page.locator('a[href*="/blog/"]');
      const count = await articleLinks.count();

      for (let i = 0; i < count; i++) {
        const img = articleLinks.nth(i).locator('img');
        await expect(img).toBeVisible();
      }
    });
  });

  test.describe('Clicking Articles', () => {
    test('should navigate to article detail page when clicking an article', async ({ page }) => {
      await page.goto(BASE);

      await page.locator('a[href*="/blog/5-interior-trends"]').click();
      await page.waitForURL('**/blog/5-interior-trends');

      await expect(page).toHaveURL(/\/en\/blog\/5-interior-trends/);
    });

    test('should navigate to "Behind the Scenes" article detail', async ({ page }) => {
      await page.goto(BASE);

      await page.locator('a[href*="/blog/flow-the-hub-bts"]').click();
      await page.waitForURL('**/blog/flow-the-hub-bts');

      await expect(page).toHaveURL(/\/en\/blog\/flow-the-hub-bts/);
    });
  });

  test.describe('Article Grid — Desktop Layout', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('should display articles in 3-column grid on desktop', async ({ page }) => {
      await page.goto(BASE);

      const grid = page.locator('.grid').filter({ has: page.locator('a[href*="/blog/"]') });
      await expect(grid).toBeVisible();

      const columns = await grid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      const columnCount = columns.split(' ').length;
      expect(columnCount).toBe(3);
    });
  });

  test.describe('Mobile (390px)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('should display articles in 1-column grid on mobile', async ({ page }) => {
      await page.goto(BASE);

      const grid = page.locator('.grid').filter({ has: page.locator('a[href*="/blog/"]') });
      await expect(grid).toBeVisible();

      const columns = await grid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      const columnCount = columns.split(' ').length;
      expect(columnCount).toBe(1);
    });

    test('should show all articles on mobile', async ({ page }) => {
      await page.goto(BASE);

      await expect(
        page.getByText("5 Interior Trends Shaping Bangkok's Cafe Scene")
      ).toBeVisible();
      await expect(
        page.getByText('How We Designed Flow the Hub from Scratch')
      ).toBeVisible();
      await expect(
        page.getByText('What to Prepare Before Hiring a Design Studio')
      ).toBeVisible();
    });

    test('should display article images on mobile', async ({ page }) => {
      await page.goto(BASE);

      const articleLinks = page.locator('a[href*="/blog/"]');
      const count = await articleLinks.count();

      for (let i = 0; i < count; i++) {
        const img = articleLinks.nth(i).locator('img');
        await expect(img).toBeVisible();
      }
    });
  });
});
