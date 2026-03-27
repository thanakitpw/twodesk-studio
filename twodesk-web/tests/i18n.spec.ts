import { test, expect } from "@playwright/test";

test.describe("Internationalization (TH/EN Switching)", () => {
  /* ═══════════════════════════════════════════════
     Language Switch — Home Page
     ═══════════════════════════════════════════════ */
  test.describe("Language Switch on Home Page", () => {
    test("default English page renders at /en", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/\/en/);
    });

    test("English nav links render correctly", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const nav = page.locator("nav");
      await expect(nav.getByText("Projects", { exact: true })).toBeVisible();
      await expect(nav.getByText("Blog", { exact: true })).toBeVisible();
      await expect(nav.getByText("About", { exact: true })).toBeVisible();
      await expect(nav.getByText("Contact", { exact: true })).toBeVisible();
    });

    test("English home page heading is visible", async ({ page }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      await expect(page.getByText("We shape spaces")).toBeVisible();
    });

    test("switch to Thai (/th) — Thai nav text renders", async ({ page }) => {
      await page.goto("/th");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/\/th/);
      const nav = page.locator("nav");
      await expect(nav.getByText("ผลงาน", { exact: true })).toBeVisible();
      await expect(nav.getByText("บทความ", { exact: true })).toBeVisible();
      await expect(
        nav.getByText("เกี่ยวกับเรา", { exact: true })
      ).toBeVisible();
      await expect(nav.getByText("ติดต่อ", { exact: true })).toBeVisible();
    });

    test("Thai home page heading is visible", async ({ page }) => {
      await page.goto("/th");
      await page.waitForLoadState("networkidle");
      await expect(page.getByText("เราสร้างสรรค์พื้นที่")).toBeVisible();
    });

    test("switching from TH back to EN restores English text", async ({
      page,
    }) => {
      await page.goto("/th");
      await page.waitForLoadState("networkidle");
      // Verify Thai text is showing
      await expect(
        page.locator("nav").getByText("ผลงาน", { exact: true })
      ).toBeVisible();

      // Click EN button to switch back
      await page.locator("nav button").filter({ hasText: "EN" }).click();
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/\/en/);
      await expect(
        page.locator("nav").getByText("Projects", { exact: true })
      ).toBeVisible();
    });
  });

  /* ═══════════════════════════════════════════════
     Language Switch — Projects Page
     ═══════════════════════════════════════════════ */
  test.describe("Language Switch on Projects Page", () => {
    test("English projects page shows correct heading", async ({ page }) => {
      await page.goto("/en/projects");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/\/en\/projects/);
      await expect(
        page.getByRole("heading", { name: "Our Projects" })
      ).toBeVisible();
    });

    test("Thai projects page shows Thai heading", async ({ page }) => {
      await page.goto("/th/projects");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/\/th\/projects/);
      await expect(
        page.getByRole("heading", { name: "ผลงานของเรา" })
      ).toBeVisible();
    });
  });

  /* ═══════════════════════════════════════════════
     Language Switch — Contact Page
     ═══════════════════════════════════════════════ */
  test.describe("Language Switch on Contact Page", () => {
    test("English contact page shows correct heading", async ({ page }) => {
      await page.goto("/en/contact");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/\/en\/contact/);
      const heading = page.locator("h1");
      const text = await heading.textContent();
      expect(text).toContain("Let's Talk");
    });

    test("Thai contact page shows Thai heading", async ({ page }) => {
      await page.goto("/th/contact");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/\/th\/contact/);
      const heading = page.locator("h1");
      const text = await heading.textContent();
      expect(text).toContain("มาคุยกัน");
    });

    test("Thai contact form labels are in Thai", async ({ page }) => {
      await page.goto("/th/contact");
      await page.waitForLoadState("networkidle");
      await expect(
        page.getByRole("heading", { name: "ส่งข้อความถึงเรา" })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "ส่งข้อความ" })
      ).toBeVisible();
    });
  });

  /* ═══════════════════════════════════════════════
     Language Switch — About Page
     ═══════════════════════════════════════════════ */
  test.describe("Language Switch on About Page", () => {
    test("English about page shows correct heading", async ({ page }) => {
      await page.goto("/en/about");
      await page.waitForLoadState("networkidle");
      await expect(
        page.getByRole("heading", {
          name: "We believe great design starts with listening",
        })
      ).toBeVisible();
    });

    test("Thai about page shows Thai heading", async ({ page }) => {
      await page.goto("/th/about");
      await page.waitForLoadState("networkidle");
      await expect(
        page.getByRole("heading", {
          name: "เราเชื่อว่าการออกแบบที่ดี เริ่มจากการรับฟัง",
        })
      ).toBeVisible();
    });

    test("Thai about page shows Thai team heading", async ({ page }) => {
      await page.goto("/th/about");
      await page.waitForLoadState("networkidle");
      await expect(
        page.getByRole("heading", { name: "ทีมงานเบื้องหลัง Two Desk" })
      ).toBeVisible();
    });
  });

  /* ═══════════════════════════════════════════════
     URL Reflects Locale
     ═══════════════════════════════════════════════ */
  test.describe("URL Reflects Locale", () => {
    test("English pages use /en/ prefix", async ({ page }) => {
      await page.goto("/en");
      await expect(page).toHaveURL(/\/en/);

      await page.goto("/en/about");
      await expect(page).toHaveURL(/\/en\/about/);

      await page.goto("/en/contact");
      await expect(page).toHaveURL(/\/en\/contact/);

      await page.goto("/en/projects");
      await expect(page).toHaveURL(/\/en\/projects/);

      await page.goto("/en/blog");
      await expect(page).toHaveURL(/\/en\/blog/);
    });

    test("Thai pages use /th/ prefix", async ({ page }) => {
      await page.goto("/th");
      await expect(page).toHaveURL(/\/th/);

      await page.goto("/th/about");
      await expect(page).toHaveURL(/\/th\/about/);

      await page.goto("/th/contact");
      await expect(page).toHaveURL(/\/th\/contact/);

      await page.goto("/th/projects");
      await expect(page).toHaveURL(/\/th\/projects/);

      await page.goto("/th/blog");
      await expect(page).toHaveURL(/\/th\/blog/);
    });
  });

  /* ═══════════════════════════════════════════════
     Switching via Nav Button
     ═══════════════════════════════════════════════ */
  test.describe("Switching via Nav Language Buttons", () => {
    test("clicking TH on /en switches to /th and preserves current page", async ({
      page,
    }) => {
      await page.goto("/en/about");
      await page.waitForLoadState("networkidle");

      await page.locator("nav button").filter({ hasText: "TH" }).click();
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/\/th\/about/);
      // Content should now be Thai
      await expect(
        page.getByRole("heading", {
          name: "เราเชื่อว่าการออกแบบที่ดี เริ่มจากการรับฟัง",
        })
      ).toBeVisible();
    });

    test("clicking EN on /th switches to /en and preserves current page", async ({
      page,
    }) => {
      await page.goto("/th/contact");
      await page.waitForLoadState("networkidle");

      await page.locator("nav button").filter({ hasText: "EN" }).click();
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/\/en\/contact/);
      const heading = page.locator("h1");
      const text = await heading.textContent();
      expect(text).toContain("Let's Talk");
    });

    test("TH button is active/highlighted when on /th locale", async ({
      page,
    }) => {
      await page.goto("/th");
      await page.waitForLoadState("networkidle");
      const thButton = page.locator("nav button").filter({ hasText: "TH" });
      await expect(thButton).toHaveClass(/font-semibold/);
      await expect(thButton).toHaveClass(/text-\[#1a1a1a\]/);
    });

    test("EN button is active/highlighted when on /en locale", async ({
      page,
    }) => {
      await page.goto("/en");
      await page.waitForLoadState("networkidle");
      const enButton = page.locator("nav button").filter({ hasText: "EN" });
      await expect(enButton).toHaveClass(/font-semibold/);
      await expect(enButton).toHaveClass(/text-\[#1a1a1a\]/);
    });
  });
});
