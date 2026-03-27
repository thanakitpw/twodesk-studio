import { test, expect } from '@playwright/test';

const BASE = '/en/blog/5-interior-trends';

test.describe('Blog Article Detail — 5 Interior Trends', () => {
  test.describe('Article Header', () => {
    test('should display a hero/featured image', async ({ page }) => {
      await page.goto(BASE);

      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();

      const heroImage = heroSection.locator('img');
      await expect(heroImage).toBeVisible();

      // Should take full width
      const width = await heroSection.evaluate((el) => el.getBoundingClientRect().width);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(width).toBeCloseTo(viewportWidth, -1);
    });

    test('should display the article title as a large heading', async ({ page }) => {
      await page.goto(BASE);

      const title = page.getByRole('heading', {
        name: "5 Interior Trends Shaping Bangkok's Cafe Scene",
      });
      await expect(title).toBeVisible();

      const fontSize = await title.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      const fontSizePx = parseFloat(fontSize);
      // Should be a large heading (at least 28px)
      expect(fontSizePx).toBeGreaterThanOrEqual(28);
    });

    test('should display category and date', async ({ page }) => {
      await page.goto(BASE);

      const meta = page.getByText('Design Trends');
      await expect(meta.first()).toBeVisible();

      const date = page.getByText('Mar 2025');
      await expect(date.first()).toBeVisible();
    });
  });

  test.describe('Article Body', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE);
    });

    test('should display multiple paragraphs of content', async ({ page }) => {
      const article = page.locator('article');
      await expect(article).toBeVisible();

      const paragraphs = article.locator('p');
      const count = await paragraphs.count();
      // At least the category meta + 4 body paragraphs
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('should contain the article excerpt in the body', async ({ page }) => {
      const excerptText = page.getByText(
        "From raw concrete to biophilic design"
      );
      await expect(excerptText).toBeVisible();
    });

    test('should contain design-related body content', async ({ page }) => {
      await expect(
        page.getByText('Good design begins long before the first sketch')
      ).toBeVisible();

      await expect(
        page.getByText('clarity of purpose, honesty of materials')
      ).toBeVisible();
    });

    test('should have readable font size for body text', async ({ page }) => {
      const article = page.locator('article');
      const bodyDiv = article.locator('.space-y-6');
      await expect(bodyDiv).toBeVisible();

      const fontSize = await bodyDiv.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      const fontSizePx = parseFloat(fontSize);
      // Should be 14-18px for readable body text
      expect(fontSizePx).toBeGreaterThanOrEqual(14);
      expect(fontSizePx).toBeLessThanOrEqual(20);
    });

    test('should have good line height for readability', async ({ page }) => {
      const article = page.locator('article');
      const bodyParagraph = article.locator('.space-y-6 p').first();
      await expect(bodyParagraph).toBeVisible();

      const lineHeight = await bodyParagraph.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const lh = parseFloat(style.lineHeight);
        const fs = parseFloat(style.fontSize);
        return lh / fs;
      });
      // Line-height ratio should be at least 1.4 for readability
      expect(lineHeight).toBeGreaterThanOrEqual(1.4);
    });

    test('should have spacing between paragraphs', async ({ page }) => {
      const article = page.locator('article');
      const bodyDiv = article.locator('.space-y-6');

      // Tailwind space-y-6 = 1.5rem gap
      const gap = await bodyDiv.evaluate((el) => {
        // space-y uses margin-top on children except first
        const children = el.children;
        if (children.length > 1) {
          return window.getComputedStyle(children[1]).marginTop;
        }
        return '0px';
      });
      const gapPx = parseFloat(gap);
      expect(gapPx).toBeGreaterThanOrEqual(20);
    });
  });

  test.describe('Navigation', () => {
    test('should have a "Back to Blog" link that navigates to blog listing', async ({ page }) => {
      await page.goto(BASE);

      const backLink = page.locator('a').filter({ hasText: 'Back to Blog' });
      await expect(backLink).toBeVisible();

      await backLink.click();
      await page.waitForURL('**/blog');

      await expect(page).toHaveURL(/\/en\/blog$/);
    });

    test('should have functional navigation at the top', async ({ page }) => {
      await page.goto(BASE);

      const nav = page.locator('nav');
      await expect(nav.first()).toBeVisible();
    });
  });

  test.describe('Mobile (390px)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('should display content at full width on mobile', async ({ page }) => {
      await page.goto(BASE);

      const article = page.locator('article');
      await expect(article).toBeVisible();

      const articleWidth = await article.evaluate((el) => el.getBoundingClientRect().width);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      // Article should use most of the viewport (accounting for padding)
      expect(articleWidth).toBeGreaterThan(viewportWidth * 0.7);
    });

    test('should scale hero image down on mobile', async ({ page }) => {
      await page.goto(BASE);

      const heroSection = page.locator('section').first();
      const heroImage = heroSection.locator('img');
      await expect(heroImage).toBeVisible();

      // Hero section should still be full width on mobile
      const width = await heroSection.evaluate((el) => el.getBoundingClientRect().width);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(width).toBeCloseTo(viewportWidth, -1);
    });

    test('should maintain readable text on mobile', async ({ page }) => {
      await page.goto(BASE);

      const article = page.locator('article');
      const bodyParagraph = article.locator('.space-y-6 p').first();
      await expect(bodyParagraph).toBeVisible();

      const fontSize = await bodyParagraph.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      const fontSizePx = parseFloat(fontSize);
      // Should remain at least 14px on mobile
      expect(fontSizePx).toBeGreaterThanOrEqual(14);
    });

    test('should display title, category, and date on mobile', async ({ page }) => {
      await page.goto(BASE);

      await expect(
        page.getByRole('heading', {
          name: "5 Interior Trends Shaping Bangkok's Cafe Scene",
        })
      ).toBeVisible();

      await expect(page.getByText('Design Trends').first()).toBeVisible();
      await expect(page.getByText('Mar 2025').first()).toBeVisible();
    });

    test('should show back to blog link on mobile', async ({ page }) => {
      await page.goto(BASE);

      const backLink = page.locator('a').filter({ hasText: 'Back to Blog' });
      await expect(backLink).toBeVisible();
    });
  });
});
