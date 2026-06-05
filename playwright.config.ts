import {
  defineConfig
} from "@playwright/test";

export default defineConfig({

  testDir:
    "./qa/playwright",

  outputDir:
    "test-results",

  reporter: [
    ["html", {
      outputFolder:
        "playwright-report"
    }]
  ],

  use: {
    headless: true,

    trace: "on",

    screenshot:
      "only-on-failure",

    video:
      "retain-on-failure"
  },
});