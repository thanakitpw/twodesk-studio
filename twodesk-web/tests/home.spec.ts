import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  // ─── Hero Section ───────────────────────────────────────────────
  test.describe("Hero Section", () => {
    test("should display hero image", async ({ page }) => {
      const heroSection = page.locator("section").first();
      const heroImage = heroSection.locator("img");
      await expect(heroImage).toBeVisible();
      await expect(heroImage).toHaveAttribute("src", /\.(jpg|jpeg|png|webp)/);
    });

    test('should display heading "We shape spaces that inspire"', async ({
      page,
    }) => {
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
      await expect(heading).toContainText("We shape spaces");
      await expect(heading).toContainText("that inspire");
    });

    test('should display subtitle "Interior · Architecture · Furniture · Craft Design"', async ({
      page,
    }) => {
      await expect(
        page.getByText("Interior · Architecture · Furniture · Craft Design")
      ).toBeVisible();
    });

    test("hero text should be dark colored", async ({ page }) => {
      const heading = page.locator("h1");
      const color = await heading.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      // #1a1a1a = rgb(26, 26, 26) — dark color
      expect(color).toBe("rgb(26, 26, 26)");
    });
  });

  // ─── Services Section ───────────────────────────────────────────
  test.describe("Services Section", () => {
    test('should display "WHAT WE DO" label (case-insensitive)', async ({
      page,
    }) => {
      await expect(page.getByText("What We Do").first()).toBeVisible();
    });

    test('should display "Our Services" heading', async ({ page }) => {
      await expect(page.getByText("Our Services").first()).toBeVisible();
    });

    test("should display description about full spectrum of design services", async ({
      page,
    }) => {
      await expect(
        page.getByText("full spectrum of design services")
      ).toBeVisible();
    });

    test("should display 4 service cards", async ({ page }) => {
      await expect(page.getByText("Interior Design").first()).toBeVisible();
      await expect(page.getByText("Architecture").first()).toBeVisible();
      await expect(page.getByText("Furniture Design").first()).toBeVisible();
      await expect(page.getByText("Craft Design").first()).toBeVisible();
    });

    test("each service card should have an image (background-image)", async ({
      page,
    }) => {
      // Service cards use background-image via inline style
      const serviceImages = page.locator(
        '.bg-\\[\\#f7f7f5\\] div[style*="background-image"]'
      );
      await expect(serviceImages).toHaveCount(4);
    });

    test("each service card should have description text", async ({
      page,
    }) => {
      await expect(
        page.getByText("Crafting functional, beautiful interiors")
      ).toBeVisible();
      await expect(
        page.getByText("Designing structures that balance form")
      ).toBeVisible();
      await expect(
        page.getByText("Custom-made furniture that complements")
      ).toBeVisible();
      await expect(
        page.getByText("Artisanal details and bespoke craftsmanship")
      ).toBeVisible();
    });

    test("service cards should have light background (#f7f7f5)", async ({
      page,
    }) => {
      const cards = page.locator(".bg-\\[\\#f7f7f5\\]");
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(4);

      const bgColor = await cards.first().evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      // #f7f7f5 = rgb(247, 247, 245)
      expect(bgColor).toBe("rgb(247, 247, 245)");
    });
  });

  // ─── Statistics Section ─────────────────────────────────────────
  test.describe("Statistics Section", () => {
    test("section should have black background", async ({ page }) => {
      // The statistics section is wrapped in a div.bg-black
      const statsWrapper = page.locator("div.bg-black").first();
      await expect(statsWrapper).toBeVisible();
      const bgColor = await statsWrapper.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(bgColor).toBe("rgb(0, 0, 0)");
    });

    test('should display stat values: "5+", "30+", "4", "4"', async ({
      page,
    }) => {
      const statsSection = page.locator("div.bg-black").first();
      await expect(statsSection.getByText("5+")).toBeVisible();
      await expect(statsSection.getByText("30+")).toBeVisible();
      // There are two "4" stats
      const fours = statsSection.locator("div").filter({ hasText: /^4$/ });
      expect(await fours.count()).toBeGreaterThanOrEqual(2);
    });

    test("should display stat labels", async ({ page }) => {
      const statsSection = page.locator("div.bg-black").first();
      await expect(
        statsSection.getByText("Years of Experience")
      ).toBeVisible();
      await expect(
        statsSection.getByText("Projects Completed")
      ).toBeVisible();
      await expect(statsSection.getByText("Team Members")).toBeVisible();
      await expect(
        statsSection.getByText("Service Categories")
      ).toBeVisible();
    });

    test("stat text should be white", async ({ page }) => {
      const statValue = page.locator("div.bg-black").first().locator(".text-white").first();
      const color = await statValue.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      // white = rgb(255, 255, 255)
      expect(color).toBe("rgb(255, 255, 255)");
    });

    test("TD watermark text should be present", async ({ page }) => {
      const watermark = page.locator("span").filter({ hasText: /^TD$/ });
      await expect(watermark).toBeAttached();
    });
  });

  // ─── Selected Works Section ─────────────────────────────────────
  test.describe("Selected Works Section", () => {
    test('should display "PROJECTS" label', async ({ page }) => {
      // The works section label is "Projects" (translation key worksLabel)
      const worksSection = page
        .locator("section")
        .filter({ hasText: "Selected Works" });
      await expect(worksSection.getByText("Projects").first()).toBeVisible();
    });

    test('should display "Selected Works" heading', async ({ page }) => {
      await expect(page.getByText("Selected Works")).toBeVisible();
    });

    test('should display "View All Projects" link with arrow', async ({
      page,
    }) => {
      const viewAllLink = page.getByText(/View All Projects\s*→/);
      await expect(viewAllLink).toBeVisible();
    });

    test("should display 4 project cards with correct names", async ({
      page,
    }) => {
      await expect(page.getByText("Flow the Hub")).toBeVisible();
      await expect(page.getByText("Office Sakaew")).toBeVisible();
      await expect(page.getByText("Bbambbm Cafe")).toBeVisible();
      await expect(page.getByText("MM Bridal House")).toBeVisible();
    });

    test("each project card should have location text", async ({ page }) => {
      const bangkokTexts = page
        .locator("section")
        .filter({ hasText: "Selected Works" })
        .getByText("Bangkok, Thailand");
      expect(await bangkokTexts.count()).toBeGreaterThanOrEqual(3);

      await expect(
        page
          .locator("section")
          .filter({ hasText: "Selected Works" })
          .getByText("Sakaew, Thailand")
      ).toBeVisible();
    });

    test("should display category tags with correct text", async ({
      page,
    }) => {
      const worksSection = page
        .locator("section")
        .filter({ hasText: "Selected Works" });
      // 2 Cafe tags, 1 Commercial tag, 1 Residential tag
      const cafeTags = worksSection.locator("span").filter({ hasText: /^Cafe$/ });
      expect(await cafeTags.count()).toBeGreaterThanOrEqual(2);

      await expect(
        worksSection.locator("span").filter({ hasText: /^Commercial$/ })
      ).toBeVisible();
      await expect(
        worksSection.locator("span").filter({ hasText: /^Residential$/ })
      ).toBeVisible();
    });

    test("Cafe tags should have blue styling", async ({ page }) => {
      const cafeTag = page
        .locator("section")
        .filter({ hasText: "Selected Works" })
        .locator("span")
        .filter({ hasText: /^Cafe$/ })
        .first();
      await expect(cafeTag).toHaveClass(/bg-\[#e8f0fe\]/);
      await expect(cafeTag).toHaveClass(/text-\[#1a73e8\]/);
    });

    test("Commercial tag should have red styling", async ({ page }) => {
      const commercialTag = page
        .locator("section")
        .filter({ hasText: "Selected Works" })
        .locator("span")
        .filter({ hasText: /^Commercial$/ });
      await expect(commercialTag).toHaveClass(/bg-\[#fce8e6\]/);
      await expect(commercialTag).toHaveClass(/text-\[#d93025\]/);
    });

    test("Residential tag should have green styling", async ({ page }) => {
      const residentialTag = page
        .locator("section")
        .filter({ hasText: "Selected Works" })
        .locator("span")
        .filter({ hasText: /^Residential$/ });
      await expect(residentialTag).toHaveClass(/bg-\[#e6f4ea\]/);
      await expect(residentialTag).toHaveClass(/text-\[#1e8e3e\]/);
    });

    test("Row 1 images should be taller (h-[480px]) than Row 2 images (h-[420px])", async ({
      page,
    }) => {
      const worksSection = page
        .locator("section")
        .filter({ hasText: "Selected Works" });
      // Row 1 images have h-[480px] class
      const row1Images = worksSection.locator(".h-\\[480px\\]");
      expect(await row1Images.count()).toBe(2);
      // Row 2 images have h-[420px] class
      const row2Images = worksSection.locator(".h-\\[420px\\]");
      expect(await row2Images.count()).toBe(2);
    });

    test("each project card should have a background image", async ({
      page,
    }) => {
      const worksSection = page
        .locator("section")
        .filter({ hasText: "Selected Works" });
      const projectImages = worksSection.locator(
        'div[style*="background-image"]'
      );
      expect(await projectImages.count()).toBe(4);
    });
  });

  // ─── Process Section ────────────────────────────────────────────
  test.describe("Process Section", () => {
    test('should display "HOW WE WORK" label', async ({ page }) => {
      await expect(page.getByText("How We Work")).toBeVisible();
    });

    test('should display "A clear process, from vision to reality" heading', async ({
      page,
    }) => {
      await expect(page.getByText("A clear process,")).toBeVisible();
      await expect(page.getByText("from vision to reality")).toBeVisible();
    });

    test("should display 4 process steps with numbers", async ({ page }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: "How We Work" });
      await expect(processSection.getByText("01")).toBeVisible();
      await expect(processSection.getByText("02")).toBeVisible();
      await expect(processSection.getByText("03")).toBeVisible();
      await expect(processSection.getByText("04")).toBeVisible();
    });

    test("should display step titles", async ({ page }) => {
      await expect(page.getByText("Consult & Brief")).toBeVisible();
      await expect(page.getByText("Concept Design")).toBeVisible();
      await expect(page.getByText("Design Development")).toBeVisible();
      await expect(page.getByText("Build & Deliver")).toBeVisible();
    });

    test("each step should have a description", async ({ page }) => {
      await expect(
        page.getByText("Understanding your needs, budget, and vision")
      ).toBeVisible();
      await expect(
        page.getByText("Developing mood boards, layouts")
      ).toBeVisible();
      await expect(
        page.getByText("Detailed drawings, material selection")
      ).toBeVisible();
      await expect(
        page.getByText("Construction supervision, quality control")
      ).toBeVisible();
    });
  });

  // ─── About Teaser Section ──────────────────────────────────────
  test.describe("About Teaser Section", () => {
    test("section should have black background", async ({ page }) => {
      const aboutTeaser = page
        .locator("section")
        .filter({ hasText: "About Us" })
        .filter({ hasText: "Learn More About Us" });
      const bgColor = await aboutTeaser.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(bgColor).toBe("rgb(0, 0, 0)");
    });

    test("should display team photo", async ({ page }) => {
      const aboutTeaser = page
        .locator("section")
        .filter({ hasText: "Learn More About Us" });
      const teamImg = aboutTeaser.locator('img[alt="Team"]');
      await expect(teamImg).toBeVisible();
    });

    test('should display "ABOUT US" label', async ({ page }) => {
      const aboutTeaser = page
        .locator("section")
        .filter({ hasText: "Learn More About Us" });
      await expect(aboutTeaser.getByText("About Us")).toBeVisible();
    });

    test("should display heading about great design starts with listening", async ({
      page,
    }) => {
      await expect(
        page.getByText(
          "We believe great design starts with listening"
        ).first()
      ).toBeVisible();
    });

    test("should display description about the studio", async ({ page }) => {
      const aboutTeaser = page
        .locator("section")
        .filter({ hasText: "Learn More About Us" });
      await expect(
        aboutTeaser.getByText("multidisciplinary design practice")
      ).toBeVisible();
    });

    test('should display "Learn More About Us" link', async ({ page }) => {
      const link = page.getByText(/Learn More About Us\s*→/);
      await expect(link).toBeVisible();
    });
  });

  // ─── Blog Preview Section ──────────────────────────────────────
  test.describe("Blog Preview Section", () => {
    test('should display "INSIGHTS" label', async ({ page }) => {
      const blogSection = page
        .locator("section")
        .filter({ hasText: "From the Studio" })
        .filter({ hasText: "Insights" });
      await expect(blogSection.getByText("Insights")).toBeVisible();
    });

    test('should display "From the Studio" heading', async ({ page }) => {
      await expect(page.getByText("From the Studio").first()).toBeVisible();
    });

    test('should display "View All Articles" link with arrow', async ({
      page,
    }) => {
      const viewAllLink = page.getByText(/View All Articles\s*→/);
      await expect(viewAllLink).toBeVisible();
    });

    test("should display 3 article cards", async ({ page }) => {
      await expect(
        page.getByText("5 Interior Trends Shaping Bangkok's Cafe Scene")
      ).toBeVisible();
      await expect(
        page.getByText("How We Designed Flow the Hub from Scratch")
      ).toBeVisible();
      await expect(
        page.getByText("What to Prepare Before Hiring a Design Studio")
      ).toBeVisible();
    });

    test("each article card should have meta text (category + date)", async ({
      page,
    }) => {
      await expect(page.getByText("Design Trends · Mar 2025")).toBeVisible();
      await expect(
        page.getByText("Behind the Scenes · Feb 2025")
      ).toBeVisible();
      await expect(page.getByText("Tips · Jan 2025")).toBeVisible();
    });

    test("each article card should have an image", async ({ page }) => {
      const blogSection = page
        .locator("section")
        .filter({ hasText: "From the Studio" })
        .filter({ hasText: "View All Articles" });
      const articleImages = blogSection.locator(
        'div[style*="background-image"]'
      );
      expect(await articleImages.count()).toBe(3);
    });

    test("each article card should have excerpt text", async ({ page }) => {
      await expect(
        page.getByText("From raw concrete to biophilic design")
      ).toBeVisible();
      await expect(
        page.getByText("A behind-the-scenes look at one of our most ambitious")
      ).toBeVisible();
      await expect(
        page.getByText(
          "Essential questions, budgets, and references you should gather"
        )
      ).toBeVisible();
    });
  });

  // ─── Contact CTA Section ───────────────────────────────────────
  test.describe("Contact CTA Section", () => {
    test("section should have black background", async ({ page }) => {
      // The CTA is wrapped in a div.bg-black (the last one)
      const ctaWrapper = page.locator("div.bg-black").last();
      const bgColor = await ctaWrapper.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(bgColor).toBe("rgb(0, 0, 0)");
    });

    test('should display "START A PROJECT" label', async ({ page }) => {
      await expect(page.getByText("Start a Project").last()).toBeVisible();
    });

    test('should display "Have a space in mind?" heading', async ({
      page,
    }) => {
      await expect(page.getByText("Have a space in mind?")).toBeVisible();
    });

    test("should display description text", async ({ page }) => {
      await expect(
        page.getByText("Tell us about your project")
      ).toBeVisible();
    });

    test('should display "Get in Touch" button', async ({ page }) => {
      const ctaSection = page
        .locator("section")
        .filter({ hasText: "Have a space in mind?" });
      const button = ctaSection.getByText("Get in Touch");
      await expect(button).toBeVisible();
    });

    test("should have architectural overlay image with low opacity", async ({
      page,
    }) => {
      const ctaSection = page
        .locator("section")
        .filter({ hasText: "Have a space in mind?" });
      const overlayContainer = ctaSection.locator(".opacity-\\[0\\.08\\]");
      await expect(overlayContainer).toBeAttached();
      const overlayImg = overlayContainer.locator("img");
      await expect(overlayImg).toBeAttached();
    });
  });
});

// ─── Mobile Tests ────────────────────────────────────────────────
test.describe("Home Page - Mobile (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("hero section should be visible on mobile", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText("We shape spaces");
  });

  test("services section should be visible on mobile", async ({ page }) => {
    await expect(page.getByText("Our Services").first()).toBeVisible();
    await expect(page.getByText("Interior Design").first()).toBeVisible();
  });

  test("services grid adapts to mobile layout", async ({ page }) => {
    // On mobile, the 4-column grid should collapse
    const servicesGrid = page.locator(".grid.grid-cols-4").first();
    if (await servicesGrid.isVisible()) {
      const gridBox = await servicesGrid.boundingBox();
      // On a 390px viewport, the grid should be narrower than desktop
      expect(gridBox!.width).toBeLessThanOrEqual(390);
    }
  });

  test("works section cards should be visible on mobile", async ({ page }) => {
    await expect(page.getByText("Selected Works")).toBeVisible();
    await expect(page.getByText("Flow the Hub")).toBeVisible();
  });

  test("process section should be visible on mobile", async ({ page }) => {
    await expect(page.getByText("How We Work")).toBeVisible();
    await expect(page.getByText("Consult & Brief")).toBeVisible();
  });

  test("about teaser section should be visible on mobile", async ({
    page,
  }) => {
    await expect(
      page.getByText("We believe great design starts with listening").first()
    ).toBeVisible();
  });

  test("blog preview section should be visible on mobile", async ({
    page,
  }) => {
    await expect(page.getByText("From the Studio").first()).toBeVisible();
  });

  test("contact CTA section should be visible on mobile", async ({
    page,
  }) => {
    await expect(page.getByText("Have a space in mind?")).toBeVisible();
    await expect(
      page
        .locator("section")
        .filter({ hasText: "Have a space in mind?" })
        .getByText("Get in Touch")
    ).toBeVisible();
  });

  test("statistics section should be visible on mobile", async ({ page }) => {
    await expect(page.getByText("5+").first()).toBeVisible();
    await expect(page.getByText("Years of Experience").first()).toBeVisible();
  });
});
