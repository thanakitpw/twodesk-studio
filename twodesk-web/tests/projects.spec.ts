import { test, expect } from '@playwright/test';

const BASE = '/en/projects';

test.describe('Projects Listing Page', () => {
  test.describe('Page Header', () => {
    test('should display the page heading and description', async ({ page }) => {
      await page.goto(BASE);

      const heading = page.getByRole('heading', { name: 'Our Projects' });
      await expect(heading).toBeVisible();

      const description = page.getByText(
        'A curated selection of our work across commercial, hospitality, and residential spaces.'
      );
      await expect(description).toBeVisible();

      const label = page.getByText('Projects', { exact: true }).first();
      await expect(label).toBeVisible();
    });
  });

  test.describe('Category Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE);
    });

    test('should display all filter buttons', async ({ page }) => {
      const filterLabels = ['All', 'Commercial', 'Cafe / Restaurant', 'Residential', 'Others'];
      for (const label of filterLabels) {
        const button = page.getByRole('button', { name: label });
        await expect(button).toBeVisible();
      }
    });

    test('should have "All" button active by default with filled dark background', async ({
      page,
    }) => {
      const allButton = page.getByRole('button', { name: 'All' });
      await expect(allButton).toHaveCSS('background-color', 'rgb(26, 26, 26)');
      await expect(allButton).toHaveCSS('color', 'rgb(255, 255, 255)');
    });

    test('should have inactive filter buttons with outline/border style', async ({ page }) => {
      const commercialButton = page.getByRole('button', { name: 'Commercial' });
      await expect(commercialButton).toHaveCSS('background-color', 'rgb(255, 255, 255)');

      const residentialButton = page.getByRole('button', { name: 'Residential' });
      await expect(residentialButton).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    });

    test('should filter to commercial projects when "Commercial" is clicked', async ({ page }) => {
      await page.getByRole('button', { name: 'Commercial' }).click();

      // Commercial button should now be active
      const commercialButton = page.getByRole('button', { name: 'Commercial' });
      await expect(commercialButton).toHaveCSS('background-color', 'rgb(26, 26, 26)');

      // Only commercial project visible
      await expect(page.getByText('Office Sakaew')).toBeVisible();

      // Non-commercial projects hidden
      await expect(page.getByText('Flow the Hub')).not.toBeVisible();
      await expect(page.getByText('Bbambbm Cafe')).not.toBeVisible();
      await expect(page.getByText('MM Bridal House')).not.toBeVisible();
    });

    test('should filter to cafe projects when "Cafe / Restaurant" is clicked', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Cafe / Restaurant' }).click();

      await expect(page.getByText('Flow the Hub')).toBeVisible();
      await expect(page.getByText('Bbambbm Cafe')).toBeVisible();

      await expect(page.getByText('Office Sakaew')).not.toBeVisible();
      await expect(page.getByText('MM Bridal House')).not.toBeVisible();
    });

    test('should filter to residential projects when "Residential" is clicked', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Residential' }).click();

      await expect(page.getByText('MM Bridal House')).toBeVisible();

      await expect(page.getByText('Flow the Hub')).not.toBeVisible();
      await expect(page.getByText('Office Sakaew')).not.toBeVisible();
      await expect(page.getByText('Bbambbm Cafe')).not.toBeVisible();
    });

    test('should show all projects again when "All" is clicked after filtering', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Residential' }).click();
      await expect(page.getByText('Flow the Hub')).not.toBeVisible();

      await page.getByRole('button', { name: 'All' }).click();

      await expect(page.getByText('Flow the Hub')).toBeVisible();
      await expect(page.getByText('Office Sakaew')).toBeVisible();
      await expect(page.getByText('Bbambbm Cafe')).toBeVisible();
      await expect(page.getByText('MM Bridal House')).toBeVisible();
    });
  });

  test.describe('Project Grid', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE);
    });

    test('should display at least 4 projects', async ({ page }) => {
      await expect(page.getByText('Flow the Hub')).toBeVisible();
      await expect(page.getByText('Office Sakaew')).toBeVisible();
      await expect(page.getByText('Bbambbm Cafe')).toBeVisible();
      await expect(page.getByText('MM Bridal House')).toBeVisible();
    });

    test('should show project cards with image, category tag, title, and location', async ({
      page,
    }) => {
      // Check first project card structure
      const firstCard = page.locator('a[href*="/projects/flow-the-hub"]');
      await expect(firstCard).toBeVisible();

      // Image
      const img = firstCard.locator('img');
      await expect(img).toBeVisible();

      // Category tag
      const categoryTag = firstCard.locator('span.uppercase');
      await expect(categoryTag).toBeVisible();
      await expect(categoryTag).toHaveText(/cafe/i);

      // Title
      await expect(firstCard.getByText('Flow the Hub')).toBeVisible();

      // Location
      await expect(firstCard.getByText('Bangkok, Thailand')).toBeVisible();
    });

    test('should display colored category tags for each project', async ({ page }) => {
      // Cafe tag color (blue text)
      const cafeCard = page.locator('a[href*="/projects/flow-the-hub"]');
      const cafeTag = cafeCard.locator('span.uppercase');
      await expect(cafeTag).toHaveCSS('color', 'rgb(26, 115, 232)');

      // Commercial tag color (red text)
      const commercialCard = page.locator('a[href*="/projects/office-sakaew"]');
      const commercialTag = commercialCard.locator('span.uppercase');
      await expect(commercialTag).toHaveCSS('color', 'rgb(217, 48, 37)');

      // Residential tag color (green text)
      const residentialCard = page.locator('a[href*="/projects/mm-bridal-house"]');
      const residentialTag = residentialCard.locator('span.uppercase');
      await expect(residentialTag).toHaveCSS('color', 'rgb(30, 142, 62)');
    });

    test('should navigate to project detail page when clicking a project card', async ({
      page,
    }) => {
      await page.locator('a[href*="/projects/flow-the-hub"]').click();
      await page.waitForURL('**/projects/flow-the-hub');

      await expect(page).toHaveURL(/\/en\/projects\/flow-the-hub/);
    });
  });

  test.describe('Project Grid — Desktop Layout', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('should display projects in 2-column grid on desktop', async ({ page }) => {
      await page.goto(BASE);

      const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2');
      await expect(grid).toBeVisible();

      // Verify computed grid-template-columns resolves to 2 columns at desktop
      const columns = await grid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      const columnCount = columns.split(' ').length;
      expect(columnCount).toBe(2);
    });
  });

  test.describe('Mobile (390px)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('should display projects in 1-column grid on mobile', async ({ page }) => {
      await page.goto(BASE);

      const grid = page.locator('.grid.grid-cols-1');
      await expect(grid).toBeVisible();

      const columns = await grid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      const columnCount = columns.split(' ').length;
      expect(columnCount).toBe(1);
    });

    test('should wrap filter buttons on mobile', async ({ page }) => {
      await page.goto(BASE);

      const filterContainer = page.locator('.flex.flex-wrap.gap-3');
      await expect(filterContainer).toBeVisible();

      // Verify flex-wrap is set
      const flexWrap = await filterContainer.evaluate((el) => {
        return window.getComputedStyle(el).flexWrap;
      });
      expect(flexWrap).toBe('wrap');
    });

    test('should show all projects on mobile', async ({ page }) => {
      await page.goto(BASE);

      await expect(page.getByText('Flow the Hub')).toBeVisible();
      await expect(page.getByText('Office Sakaew')).toBeVisible();
      await expect(page.getByText('Bbambbm Cafe')).toBeVisible();
      await expect(page.getByText('MM Bridal House')).toBeVisible();
    });
  });
});
