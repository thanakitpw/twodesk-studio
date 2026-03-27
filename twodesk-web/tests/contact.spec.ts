import { test, expect } from "@playwright/test";

test.describe("Contact Page (/en/contact)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/contact");
    await page.waitForLoadState("networkidle");
  });

  /* ═══════════════════════════════════════════════
     Contact Header
     ═══════════════════════════════════════════════ */
  test.describe("Contact Header", () => {
    test('"GET IN TOUCH" label is visible', async ({ page }) => {
      const label = page.getByText("Get in Touch", { exact: true }).first();
      await expect(label).toBeVisible();
    });

    test('heading "Let\'s Talk" and "Let\'s sit and chat" visible (2 lines)', async ({
      page,
    }) => {
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
      const text = await heading.textContent();
      expect(text).toContain("Let's Talk");
      expect(text).toContain("Let's sit and chat");
    });

    test("description about projects and response is visible", async ({
      page,
    }) => {
      const description = page.getByText(
        "Whether you have a project in mind"
      );
      await expect(description).toBeVisible();
    });

    test('EMAIL label with "hello@twodesk.studio" is visible', async ({
      page,
    }) => {
      const emailLabel = page.getByText("Email", { exact: true }).first();
      await expect(emailLabel).toBeVisible();
      const emailLink = page.getByText("hello@twodesk.studio").first();
      await expect(emailLink).toBeVisible();
    });

    test('SOCIAL label with Instagram and Facebook info', async ({ page }) => {
      const socialLabel = page.getByText("Social", { exact: true }).first();
      await expect(socialLabel).toBeVisible();
      await expect(page.getByText("Instagram @twodesk.studio")).toBeVisible();
      await expect(page.getByText("Facebook Twodesk Studio")).toBeVisible();
    });

    test('LOCATION label with "Bangkok, Thailand"', async ({ page }) => {
      const locationLabel = page
        .getByText("Location", { exact: true })
        .first();
      await expect(locationLabel).toBeVisible();
      await expect(page.getByText("Bangkok, Thailand")).toBeVisible();
    });

    test("Instagram link opens correct URL", async ({ page }) => {
      const igLink = page.locator(
        'a[href="https://www.instagram.com/twodesk.studio"]'
      );
      await expect(igLink.first()).toBeVisible();
      await expect(igLink.first()).toHaveAttribute("target", "_blank");
    });

    test("Facebook link opens correct URL", async ({ page }) => {
      const fbLink = page.locator(
        'a[href="https://www.facebook.com/twodeskstudio"]'
      );
      await expect(fbLink.first()).toBeVisible();
      await expect(fbLink.first()).toHaveAttribute("target", "_blank");
    });
  });

  /* ═══════════════════════════════════════════════
     Contact Form
     ═══════════════════════════════════════════════ */
  test.describe("Contact Form", () => {
    test('"Send us a message" heading is visible', async ({ page }) => {
      const heading = page.getByRole("heading", {
        name: "Send us a message",
      });
      await expect(heading).toBeVisible();
    });

    test("Name input is present with correct placeholder", async ({
      page,
    }) => {
      const nameInput = page.locator('input[name="name"]');
      await expect(nameInput).toBeVisible();
      await expect(nameInput).toHaveAttribute("placeholder", "Your name");
    });

    test("Email input is present with correct placeholder", async ({
      page,
    }) => {
      const emailInput = page.locator('input[name="email"]');
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute("placeholder", "your@email.com");
    });

    test("Phone input is present with placeholder", async ({ page }) => {
      const phoneInput = page.locator('input[name="phone"]');
      await expect(phoneInput).toBeVisible();
      await expect(phoneInput).toHaveAttribute(
        "placeholder",
        "Your phone number"
      );
    });

    test('Project Type select is present with "Select project type" default', async ({
      page,
    }) => {
      const select = page.locator('select[name="projectType"]');
      await expect(select).toBeVisible();
      // The default disabled option
      const defaultOption = select.locator("option[disabled]");
      await expect(defaultOption).toHaveText("Select project type");
    });

    test("Project Type select has 4 options", async ({ page }) => {
      const select = page.locator('select[name="projectType"]');
      // 4 options + 1 disabled placeholder = 5 total
      const options = select.locator("option");
      await expect(options).toHaveCount(5);
      await expect(options.nth(1)).toHaveText("Commercial");
      await expect(options.nth(2)).toHaveText("Cafe / Bar / Restaurant");
      await expect(options.nth(3)).toHaveText("Residential");
      await expect(options.nth(4)).toHaveText("Others");
    });

    test("Message textarea is present with correct placeholder", async ({
      page,
    }) => {
      const textarea = page.locator('textarea[name="message"]');
      await expect(textarea).toBeVisible();
      await expect(textarea).toHaveAttribute(
        "placeholder",
        "Tell us about your project..."
      );
    });

    test('"Send Message" button is visible with black bg, white text', async ({
      page,
    }) => {
      const button = page.getByRole("button", { name: "Send Message" });
      await expect(button).toBeVisible();
      await expect(button).toHaveClass(/bg-black/);
      await expect(button).toHaveClass(/text-white/);
    });

    test("form validation: submitting empty form should not crash", async ({
      page,
    }) => {
      const button = page.getByRole("button", { name: "Send Message" });
      await button.click();
      // The page should still be on the contact page (HTML5 validation prevents submit)
      await expect(page).toHaveURL(/\/en\/contact/);
      // The form and button should still be visible
      await expect(button).toBeVisible();
    });

    test("typing in each field works", async ({ page }) => {
      const nameInput = page.locator('input[name="name"]');
      await nameInput.fill("John Doe");
      await expect(nameInput).toHaveValue("John Doe");

      const emailInput = page.locator('input[name="email"]');
      await emailInput.fill("john@example.com");
      await expect(emailInput).toHaveValue("john@example.com");

      const phoneInput = page.locator('input[name="phone"]');
      await phoneInput.fill("0812345678");
      await expect(phoneInput).toHaveValue("0812345678");

      const select = page.locator('select[name="projectType"]');
      await select.selectOption("commercial");
      await expect(select).toHaveValue("commercial");

      const textarea = page.locator('textarea[name="message"]');
      await textarea.fill("I need a new office design.");
      await expect(textarea).toHaveValue("I need a new office design.");
    });

    test("fill all fields and submit should work (shows alert)", async ({
      page,
    }) => {
      // Fill all required fields
      await page.locator('input[name="name"]').fill("Jane Smith");
      await page.locator('input[name="email"]').fill("jane@example.com");
      await page.locator('input[name="phone"]').fill("0899999999");
      await page.locator('select[name="projectType"]').selectOption("cafe");
      await page
        .locator('textarea[name="message"]')
        .fill("We want to design a new cafe in Bangkok.");

      // Listen for the dialog (alert)
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain("Message sent!");
        await dialog.accept();
      });

      await page.getByRole("button", { name: "Send Message" }).click();

      // After submit, form should be reset
      await expect(page.locator('input[name="name"]')).toHaveValue("");
      await expect(page.locator('input[name="email"]')).toHaveValue("");
      await expect(page.locator('textarea[name="message"]')).toHaveValue("");
    });
  });

  /* ═══════════════════════════════════════════════
     Map Placeholder
     ═══════════════════════════════════════════════ */
  test.describe("Map Placeholder", () => {
    test("map placeholder section is visible", async ({ page }) => {
      const mapPlaceholder = page.getByText(
        "Google Maps — Bangkok, Thailand"
      );
      await expect(mapPlaceholder).toBeVisible();
    });

    test("map section has gray background", async ({ page }) => {
      const mapDiv = page
        .getByText("Google Maps — Bangkok, Thailand")
        .locator("..");
      await expect(mapDiv).toHaveClass(/bg-\[#e5e5e5\]/);
    });

    test("map section height is approximately 400px", async ({ page }) => {
      const mapDiv = page
        .getByText("Google Maps — Bangkok, Thailand")
        .locator("..");
      const box = await mapDiv.boundingBox();
      expect(box).not.toBeNull();
      // Allow some tolerance (380-420px)
      expect(box!.height).toBeGreaterThanOrEqual(380);
      expect(box!.height).toBeLessThanOrEqual(420);
    });
  });
});

/* ═══════════════════════════════════════════════
   Contact Page — Mobile (390px)
   ═══════════════════════════════════════════════ */
test.describe("Contact Page — Mobile (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/en/contact");
    await page.waitForLoadState("networkidle");
  });

  test("header stacks vertically (heading on top, contact info below)", async ({
    page,
  }) => {
    // On mobile, lg:flex-row doesn't apply, so flex-col is active
    const headerContainer = page
      .locator("main > section")
      .first()
      .locator(".flex.flex-col");
    await expect(headerContainer).toBeVisible();

    // Both columns should still be visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(page.getByText("hello@twodesk.studio").first()).toBeVisible();
  });

  test("form fields stack to single column", async ({ page }) => {
    // On mobile, sm:flex-row doesn't apply (390 < 640), so fields stack
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();

    // Check that inputs are stacked (same x position, different y)
    const nameBox = await nameInput.boundingBox();
    const emailBox = await emailInput.boundingBox();
    expect(nameBox).not.toBeNull();
    expect(emailBox).not.toBeNull();
    // On mobile, both should start near the same left edge
    expect(Math.abs(nameBox!.x - emailBox!.x)).toBeLessThan(10);
    // Email should be below name
    expect(emailBox!.y).toBeGreaterThan(nameBox!.y);
  });

  test("submit button is visible on mobile", async ({ page }) => {
    const button = page.getByRole("button", { name: "Send Message" });
    await expect(button).toBeVisible();
  });

  test("map section is full width on mobile", async ({ page }) => {
    const mapSection = page
      .getByText("Google Maps — Bangkok, Thailand")
      .locator("..");
    const box = await mapSection.boundingBox();
    expect(box).not.toBeNull();
    // Map should span most of the viewport width (minus padding)
    expect(box!.width).toBeGreaterThan(300);
  });

  test("all sections visible on mobile", async ({ page }) => {
    // Header
    await expect(page.locator("h1")).toBeVisible();
    // Form
    await expect(
      page.getByRole("heading", { name: "Send us a message" })
    ).toBeVisible();
    // Map
    await expect(
      page.getByText("Google Maps — Bangkok, Thailand")
    ).toBeVisible();
  });
});
