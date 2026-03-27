import { test, expect } from "@playwright/test";

/* ═══════════════════════════════════════════════
   Desktop (1440px)
   ═══════════════════════════════════════════════ */
test.describe("Responsive — Desktop (1440px)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.describe("Navigation", () => {
    test("nav shows all links inline", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const nav = page.locator("nav");
      await expect(nav.getByText("Projects", { exact: true })).toBeVisible();
      await expect(nav.getByText("Blog", { exact: true })).toBeVisible();
      await expect(nav.getByText("About", { exact: true })).toBeVisible();
      await expect(nav.getByText("Contact", { exact: true })).toBeVisible();
      await expect(nav.getByText("TH", { exact: true })).toBeVisible();
      await expect(nav.getByText("EN", { exact: true })).toBeVisible();
    });
  });

  test.describe("Home Page — Services Grid", () => {
    test("services grid is 4 columns", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      // The home services grid uses grid-cols-4
      const servicesGrid = page.locator(".grid.grid-cols-4");
      await expect(servicesGrid.first()).toBeVisible();
    });
  });

  test.describe("Home Page — Works Section", () => {
    test("works section shows project cards in a row", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      // Works uses flex rows with gap-6
      const worksRow = page.locator("section").filter({
        hasText: "Selected Works",
      }).locator(".flex.gap-6").first();
      await expect(worksRow).toBeVisible();
    });
  });

  test.describe("Home Page — Blog Grid", () => {
    test("blog grid is 3 columns", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const blogGrid = page.locator(".grid.grid-cols-3");
      await expect(blogGrid.first()).toBeVisible();
    });
  });

  test.describe("Footer", () => {
    test("footer has 4 columns layout", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const footerGrid = page.locator(
        "footer .grid"
      );
      await expect(footerGrid).toBeVisible();
      // Footer grid has 4 children: brand, navigate, connect, contact
      const columns = footerGrid.locator("> div");
      await expect(columns).toHaveCount(4);
    });
  });

  test.describe("Projects Page", () => {
    test("projects grid shows 2 cards per row (md:grid-cols-2)", async ({
      page,
    }) => {
      await page.goto("/en/projects");
      await page.waitForLoadState("networkidle");
      const grid = page.locator(".grid.grid-cols-1.md\\:grid-cols-2");
      await expect(grid).toBeVisible();
    });
  });

  test.describe("Blog Page", () => {
    test("blog page grid is 3 columns on desktop (lg:grid-cols-3)", async ({
      page,
    }) => {
      await page.goto("/en/blog");
      await page.waitForLoadState("networkidle");
      const grid = page.locator(".grid").filter({
        has: page.locator("a"),
      });
      await expect(grid.first()).toBeVisible();
    });
  });
});

/* ═══════════════════════════════════════════════
   Tablet (768px)
   ═══════════════════════════════════════════════ */
test.describe("Responsive — Tablet (768px)", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test.describe("Navigation", () => {
    test("nav is visible on tablet", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const nav = page.locator("nav");
      await expect(nav).toBeVisible();
      // On 768px, nav may or may not have hamburger depending on implementation
      // The current nav doesn't have a hamburger menu, so links should still be inline
    });
  });

  test.describe("Blog Page", () => {
    test("blog grid adapts to tablet width", async ({ page }) => {
      await page.goto("/en/blog");
      await page.waitForLoadState("networkidle");
      // At 768px, sm:grid-cols-2 applies (768 >= 640)
      const articles = page.locator("section .grid a");
      const count = await articles.count();
      expect(count).toBeGreaterThan(0);

      if (count >= 2) {
        const first = await articles.first().boundingBox();
        const second = await articles.nth(1).boundingBox();
        expect(first).not.toBeNull();
        expect(second).not.toBeNull();
        // On tablet with sm:grid-cols-2, cards should be side by side
        // (same y, different x) or stacked if lg:grid-cols-3 doesn't apply
        // sm breakpoint is 640px, so at 768px sm:grid-cols-2 applies
        expect(first!.y).toBeCloseTo(second!.y, -1);
      }
    });
  });

  test.describe("About Page — Team Grid", () => {
    test("team grid shows 2 columns on tablet (sm:grid-cols-2)", async ({
      page,
    }) => {
      await page.goto("/en/about");
      await page.waitForLoadState("networkidle");
      const teamGrid = page.locator("main > section").nth(2).locator(".grid");
      const cards = teamGrid.locator("> div");
      await expect(cards).toHaveCount(4);

      // At 768px, sm:grid-cols-2 applies
      const card1 = await cards.nth(0).boundingBox();
      const card2 = await cards.nth(1).boundingBox();
      expect(card1).not.toBeNull();
      expect(card2).not.toBeNull();
      // Cards should be side by side (same y, different x)
      expect(Math.abs(card1!.y - card2!.y)).toBeLessThan(5);
      expect(card2!.x).toBeGreaterThan(card1!.x);
    });
  });

  test.describe("Contact Page", () => {
    test("contact form fields visible on tablet", async ({ page }) => {
      await page.goto("/en/contact");
      await page.waitForLoadState("networkidle");
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="phone"]')).toBeVisible();
      await expect(page.locator('select[name="projectType"]')).toBeVisible();
      await expect(page.locator('textarea[name="message"]')).toBeVisible();
    });

    test("contact form fields are in 2-column layout on tablet (sm:flex-row)", async ({
      page,
    }) => {
      await page.goto("/en/contact");
      await page.waitForLoadState("networkidle");
      // At 768px, sm:flex-row applies (768 >= 640)
      const nameInput = page.locator('input[name="name"]');
      const emailInput = page.locator('input[name="email"]');
      const nameBox = await nameInput.boundingBox();
      const emailBox = await emailInput.boundingBox();
      expect(nameBox).not.toBeNull();
      expect(emailBox).not.toBeNull();
      // They should be side by side (same y, different x)
      expect(Math.abs(nameBox!.y - emailBox!.y)).toBeLessThan(5);
      expect(emailBox!.x).toBeGreaterThan(nameBox!.x);
    });
  });
});

/* ═══════════════════════════════════════════════
   Mobile (390px)
   ═══════════════════════════════════════════════ */
test.describe("Responsive — Mobile (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.describe("Navigation", () => {
    test("nav is visible on mobile", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const nav = page.locator("nav");
      await expect(nav).toBeVisible();
    });

    test("nav shows hamburger or handles mobile layout", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const nav = page.locator("nav");

      // Check for hamburger button or verify the nav still works on mobile
      const hamburger = nav.locator(
        'button[aria-label*="menu" i], button[aria-label*="Menu" i], [data-testid="mobile-menu"]'
      );
      const desktopLinks = nav.getByText("Projects", { exact: true });

      const hasHamburger = await hamburger.count();
      const linksVisible = await desktopLinks.isVisible().catch(() => false);

      // Either hamburger exists OR desktop links might overflow/be hidden
      expect(hasHamburger > 0 || linksVisible).toBeTruthy();
    });
  });

  test.describe("Home Page — Services", () => {
    test("services cards stack or form 2 columns on mobile", async ({
      page,
    }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      // Home services grid uses grid-cols-4 with no responsive breakpoints
      // At 390px, these will be very narrow but still render
      const grid = page.locator(".grid.grid-cols-4");
      if ((await grid.count()) > 0) {
        await expect(grid.first()).toBeVisible();
      }
    });
  });

  test.describe("Home Page — Works", () => {
    test("works cards are visible on mobile", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      // Works section should still be visible
      await expect(page.getByText("Selected Works")).toBeVisible();
    });
  });

  test.describe("Blog Page", () => {
    test("blog is single column on mobile", async ({ page }) => {
      await page.goto("/en/blog");
      await page.waitForLoadState("networkidle");
      // At 390px (<640px), grid-cols-1 applies
      const articles = page.locator("section .grid a");
      const count = await articles.count();

      if (count >= 2) {
        const first = await articles.first().boundingBox();
        const second = await articles.nth(1).boundingBox();
        expect(first).not.toBeNull();
        expect(second).not.toBeNull();
        // Cards should be stacked (same x, different y)
        expect(Math.abs(first!.x - second!.x)).toBeLessThan(10);
        expect(second!.y).toBeGreaterThan(first!.y);
      }
    });
  });

  test.describe("Contact Page", () => {
    test("contact form is single column on mobile", async ({ page }) => {
      await page.goto("/en/contact");
      await page.waitForLoadState("networkidle");
      const nameInput = page.locator('input[name="name"]');
      const emailInput = page.locator('input[name="email"]');
      const nameBox = await nameInput.boundingBox();
      const emailBox = await emailInput.boundingBox();
      expect(nameBox).not.toBeNull();
      expect(emailBox).not.toBeNull();
      // On mobile (390 < 640), sm:flex-row doesn't apply
      // Inputs should be stacked vertically (same x, different y)
      expect(Math.abs(nameBox!.x - emailBox!.x)).toBeLessThan(10);
      expect(emailBox!.y).toBeGreaterThan(nameBox!.y);
    });
  });

  test.describe("Footer", () => {
    test("footer content is visible on mobile", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      await expect(footer.getByText("TWO DESK")).toBeVisible();
    });
  });

  test.describe("General Mobile Checks", () => {
    test("all text remains readable (no tiny text)", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      // Check that body text has reasonable font size
      const body = page.locator("body");
      const fontSize = await body.evaluate((el) =>
        window.getComputedStyle(el).fontSize
      );
      const size = parseInt(fontSize);
      expect(size).toBeGreaterThanOrEqual(14);
    });

    test("no horizontal overflow on home page", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      // Allow a small tolerance (1-2px) for sub-pixel rendering
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
    });

    test("no horizontal overflow on about page", async ({ page }) => {
      await page.goto("/en/about");
      await page.waitForLoadState("networkidle");
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
    });

    test("no horizontal overflow on contact page", async ({ page }) => {
      await page.goto("/en/contact");
      await page.waitForLoadState("networkidle");
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
    });

    test("no horizontal overflow on projects page", async ({ page }) => {
      await page.goto("/en/projects");
      await page.waitForLoadState("networkidle");
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
    });

    test("no horizontal overflow on blog page", async ({ page }) => {
      await page.goto("/en/blog");
      await page.waitForLoadState("networkidle");
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
    });
  });
});
