export function
recommendFix(
  report: any
) {

  const category =
    report.category;

  const signature =
    report.signature;

  if (
    signature ===
    "TIMEOUT_LOCATOR"
  ) {

    return {

      strategy:
        "locator_assertion",

      code: `
await expect(locator)
  .toBeVisible();

await locator.click();
`
    };
  }

  if (
    category ===
    "SELECTOR_FAILURE"
  ) {

    return {

      strategy:
        "stable_selector",

      code: `
await page.locator(
  '[data-testid="submit-button"]'
);
`
    };
  }

  if (
    category ===
    "FLAKY_ASYNC_RENDER"
  ) {

    return {

      strategy:
        "wait_for_render",

      code: `
await page.waitForLoadState(
  "networkidle"
);
`
    };
  }

  return {

    strategy:
      "manual_review",

    code:
      "// manual investigation required"
  };
}