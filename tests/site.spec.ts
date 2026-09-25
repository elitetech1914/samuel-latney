import { test, expect } from "@playwright/test";

test("all public pages render with one heading and unique titles", async ({
  page,
}) => {
  const titles = new Set<string>();
  for (const path of [
    "/",
    "/about",
    "/paired-by-providence",
    "/alice-and-james",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("home images load and the desktop design is captured", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [
    ".hero",
    ".story-section",
    ".themes-section",
    ".characters-section",
    ".author-section",
    ".platform-section",
    ".site-footer",
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }
  await expect
    .poll(
      () =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      { timeout: 45000 },
    )
    .toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("home-desktop.png"),
    fullPage: true,
    animations: "disabled",
  });
  expect(errors).toEqual([]);
  await expect(page.locator(".platform-card")).toHaveCount(5);
  await expect(page.locator(".platform-card a")).toHaveCount(0);
});

test("mobile menu supports keyboard focus, escape and navigation", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await dialog.getByRole("link", { name: "Alice & James" }).click();
  await expect(page).toHaveURL(/alice-and-james$/);
  await expect(dialog).not.toBeVisible();
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [
    ".hero",
    ".story-section",
    ".characters-section",
    ".quote-band",
    ".author-section",
    ".platform-section",
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }
  await expect
    .poll(
      () =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      { timeout: 45000 },
    )
    .toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("home-mobile.png"),
    fullPage: true,
    animations: "disabled",
  });
});

test("layouts fit small mobile screens and reduced motion stops drifting", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 720 });
  for (const path of [
    "/",
    "/about",
    "/paired-by-providence",
    "/alice-and-james",
    "/contact",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  expect(
    await page
      .locator(".hero-background")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
});

test("book club prompts expand and purchase navigation works", async ({
  page,
}) => {
  await page.goto("/paired-by-providence");
  const question = page.locator("details").first();
  await question.locator("summary").click();
  await expect(question).toHaveAttribute("open", "");
  await expect(question.locator("p")).toBeVisible();
  await question.locator("summary").click();
  await expect(question).not.toHaveAttribute("open", "");
  await page.getByRole("link", { name: "Where to Buy", exact: true }).click();
  await expect(page).toHaveURL(/#where-to-buy$/);
});

test("unconfigured forms cannot report successful delivery", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  await expect(
    page.getByRole("button", { name: "Messaging Coming Soon" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Reader list coming soon" }),
  ).toBeDisabled();
  const missingService = await request.post("/api/connect", {
    data: { kind: "newsletter", email: "reader@example.com" },
  });
  expect(missingService.status()).toBe(503);
  expect((await missingService.json()).success).toBeUndefined();
  const invalid = await request.post("/api/connect", {
    data: { kind: "newsletter", email: "not-an-email" },
  });
  expect(invalid.status()).toBe(400);
  const noConsent = await request.post("/api/connect", {
    data: {
      kind: "contact",
      email: "reader@example.com",
      name: "Reader",
      subject: "Hello",
      message: "A reader inquiry.",
      category: "Reader message",
    },
  });
  expect(noConsent.status()).toBe(400);
});

test("images are compressed and legacy routes redirect", async ({
  request,
}) => {
  const image = await request.get(
    "/_next/image?url=%2Fimages%2Fimage-5.png&w=640&q=75",
    { headers: { Accept: "image/webp" } },
  );
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/webp");
  expect((await image.body()).byteLength).toBeLessThan(200000);
  for (const [from, to] of [
    ["/about-samuel", "/about"],
    ["/meet-alice-and-james", "/alice-and-james"],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(to);
  }
  const missing = await request.get("/this-page-does-not-exist");
  expect(missing.status()).toBe(404);
});
