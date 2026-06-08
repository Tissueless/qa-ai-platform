import { test } from "@playwright/test";

test("signup generated tests require valid testcase JSON", async () => {
  throw new Error(
    [
      "Signup Playwright tests were not generated because qa/testcases/signup-testcases.json is invalid.",
      "Regenerate testcases with action/target/value steps, then run npm run generate:playwright.",
    ].join(" ")
  );
});
