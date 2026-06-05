import {
  test,
  expect
} from "@playwright/test";

test(
  "playwright 동작 확인",
  async ({ page }) => {

    await page.goto(
      "https://playwright.dev"
    );

    await expect(page)
      .toHaveTitle(/Playwright/);
  }
);