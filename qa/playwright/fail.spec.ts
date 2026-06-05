import {
  test,
  expect
} from "@playwright/test";

test(
  "실패 테스트",
  async ({ page }) => {

    await page.goto(
      "https://playwright.dev"
    );

    await page.click(
      "#not-exists"
    );
  }
);