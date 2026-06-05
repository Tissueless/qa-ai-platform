import fs from "fs";
import { mapStepToCode } from "./mappings.js";
import type { TestSuite, TestCase } from "../types/testcase.js";

const raw = fs.readFileSync(
  "qa/testcases/signup-testcases.json",
  "utf-8"
);

const data: TestSuite = JSON.parse(raw);

const selectors = JSON.parse(
  fs.readFileSync(
    "qa/configs/selectors.json",
    "utf-8"
  )
);

const usedTitles = new Set<string>();

function makeUniqueTitle(title: string) {
  if (!usedTitles.has(title)) {
    usedTitles.add(title);
    return title;
  }

  let count = 2;

  while (usedTitles.has(`${title} (${count})`)) {
    count++;
  }

  const uniqueTitle = `${title} (${count})`;

  usedTitles.add(uniqueTitle);

  return uniqueTitle;
}

function generateTest(testCase: TestCase) {
  const title = makeUniqueTitle(testCase.title);

  const steps = testCase.steps
    .map((step) => mapStepToCode(step))
    .join("\n");

  return `
test("${title}", async ({ page }) => {
${steps}
});
`;
}

const tests = data.testCases
  .map((testCase) => generateTest(testCase))
  .join("\n");

const content = `
import { test, expect } from "@playwright/test";

const selectors = ${JSON.stringify(selectors, null, 2)};

${tests}
`;

fs.writeFileSync(
  "qa/playwright/signup.spec.ts",
  content
);

console.log("Playwright 코드 생성 완료");
