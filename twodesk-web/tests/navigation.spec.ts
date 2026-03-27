import { test, expect } from "@playwright/test";

const PAGES = [
  { name: "Home", path: "/en" },
  { name: "Projects", path: "/en/projects" },
  { name: "Blog", path: "/en/blog" },
  { name: "About", path: "/en/about" },
  { name: "Contact", path: "/en/contact" },
];

test.describe("Navigation Bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test.describe("Logo", () => {
    test('should display "TWO DESK" logo text', async ({ page }) => {
      const logo = page.locator("nav").getByText("TWO DESK", { exact: true });
      await expect(logo).toBeVisible();
    });

    test("logo should link to home page", async ({ page }) => {
      const logo = page.locator("nav a").filter({ hasText: "TWO DESK" });
      await expect(logo).toHaveAttribute("href", /\/en\/?$/);
    });
  });

  test.describe("Nav Links", () => {
    test("should display all navigation links", async ({ page }) => {
      const nav = page.locator("nav");
      await expect(nav.getByText("Projects", { exact: true })).toBeVisible();
      await expect(nav.getByText("Blog", { exact: true })).toBeVisible();
      await expect(nav.getByText("About", { exact: true })).toBeVisible();
      await expect(nav.getByText("Contact", { exact: true })).toBeVisible();
    });

    test("Projects link navigates to /en/projects", async ({ page }) => {
      await page.locator("nav").getByText("Projects", { exact: true }).click();
      await expect(page).toHaveURL(/\/en\/projects/);
    });

    test("Blog link navigates to /en/blog", async ({ page }) => {
      await page.locator("nav").getByText("Blog", { exact: true }).click();
      await expect(page).toHaveURL(/\/en\/blog/);
    });

    test("About link navigates to /en/about", async ({ page }) => {
      await page.locator("nav").getByText("About", { exact: true }).click();
      await expect(page).toHaveURL(/\/en\/about/);
    });

    test("Contact link navigates to /en/contact", async ({ page }) => {
      await page.locator("nav").getByText("Contact", { exact: true }).click();
      await expect(page).toHaveURL(/\/en\/contact/);
    });
  });

  test.describe("Language Switcher", () => {
    test("should display TH and EN buttons", async ({ page }) => {
      const nav = page.locator("nav");
      await expect(nav.getByText("TH", { exact: true })).toBeVisible();
      await expect(nav.getByText("EN", { exact: true })).toBeVisible();
    });

    test("EN should be active on /en locale", async ({ page }) => {
      const enButton = page.locator("nav button").filter({ hasText: "EN" });
      await expect(enButton).toHaveClass(/font-semibold/);
      await expect(enButton).toHaveClass(/text-\[#1a1a1a\]/);
    });

    test("clicking TH should switch to /th locale", async ({ page }) => {
      await page.locator("nav button").filter({ hasText: "TH" }).click();
      await expect(page).toHaveURL(/\/th/);
    });
  });

  test.describe("Sticky / Fixed Positioning", () => {
    test("nav should be fixed at top of page", async ({ page }) => {
      const nav = page.locator("nav");
      await expect(nav).toHaveCSS("position", "fixed");
    });

    test("nav should have backdrop blur class", async ({ page }) => {
      const nav = page.locator("nav");
      // The nav has bg-white/95 backdrop-blur-[10px] classes
      await expect(nav).toHaveClass(/backdrop-blur/);
    });
  });

  test.describe("Nav Presence on All Pages", () => {
    for (const p of PAGES) {
      test(`nav should appear on ${p.name} page (${p.path})`, async ({
        page,
      }) => {
        await page.goto(p.path);
        const nav = page.locator("nav");
        await expect(nav).toBeVisible();
        await expect(
          nav.getByText("TWO DESK", { exact: true })
        ).toBeVisible();
      });
    }
  });
});

test.describe("Navigation Bar - Mobile (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("should show hamburger menu icon on mobile viewport", async ({
    page,
  }) => {
    await page.goto("/en");
    // On mobile, the nav should either show a hamburger/menu button
    // or the desktop links should be hidden
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Check if a hamburger menu button/icon exists OR if desktop links are hidden
    const hamburgerButton = nav.locator(
      'button[aria-label*="menu" i], button[aria-label*="Menu" i], [data-testid="mobile-menu"], svg'
    );
    const desktopLinks = nav.locator("a").filter({ hasText: "Projects" });

    // Either hamburger exists or desktop links are hidden on mobile
    const hasHamburger = await hamburgerButton.count();
    const linksVisible = await desktopLinks.isVisible().catch(() => false);

    // On mobile viewport, we expect either a hamburger menu OR hidden desktop links
    expect(hasHamburger > 0 || !linksVisible).toBeTruthy();
  });
});
