import fs from "fs";

import { TestSuiteSchema } from "../schemas/testcase-schema.js";
import type { TestCase, TestSuite } from "../types/testcase.js";
import { mapStepToCode } from "./mappings.js";

const TESTCASE_FILE = "qa/testcases/signup-testcases.json";
const SELECTORS_FILE = "qa/configs/selectors.json";
const OUTPUT_FILE = "qa/playwright/signup.spec.ts";
const MAX_VALIDATION_ISSUES = 10;

function formatValidationError(error: unknown) {
  if (
    error &&
    typeof error === "object" &&
    "issues" in error &&
    Array.isArray(error.issues)
  ) {
    const issues = error.issues as Array<{
      message: string;
      path?: Array<string | number>;
    }>;

    const lines = issues
      .slice(0, MAX_VALIDATION_ISSUES)
      .map((issue) => {
        const path = issue.path?.join(".") || "(root)";

        return `- ${path}: ${issue.message}`;
      });

    const remaining = issues.length - lines.length;

    if (remaining > 0) {
      lines.push(`- ...and ${remaining} more validation issues`);
    }

    return lines.join("\n");
  }

  return String(error);
}

function parseTestSuite(rawJson: string): TestSuite {
  try {
    return TestSuiteSchema.parse(
      JSON.parse(rawJson)
    );
  } catch (error) {
    throw new Error(
      [
        "Invalid test case JSON. Playwright code was not generated.",
        "Expected each step to use action/target/value fields.",
        formatValidationError(error),
      ].join("\n")
    );
  }
}

function validateSelectorTargets(
  testSuite: TestSuite,
  selectorMap: Record<string, string>
) {
  const missingTargets = testSuite.testCases.flatMap((testCase) =>
    testCase.steps
      .filter((step) => step.action !== "goto" && !(step.target in selectorMap))
      .map((step) => `${testCase.title}: ${step.action} -> ${step.target}`)
  );

  if (missingTargets.length > 0) {
    throw new Error(
      [
        "Invalid selector target. Playwright code was not generated.",
        `Add the missing target to ${SELECTORS_FILE} or fix the generated testcase.`,
        ...missingTargets.map((target) => `- ${target}`),
      ].join("\n")
    );
  }
}

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
test(${JSON.stringify(title)}, async ({ page }) => {
${steps}
});
`;
}

function run() {
  const raw = fs.readFileSync(
    TESTCASE_FILE,
    "utf-8"
  );

  const data = parseTestSuite(raw);

  const selectors = JSON.parse(
    fs.readFileSync(
      SELECTORS_FILE,
      "utf-8"
    )
  ) as Record<string, string>;

  validateSelectorTargets(
    data,
    selectors
  );

  const tests = data.testCases
    .map((testCase) => generateTest(testCase))
    .join("\n");

  const content = `
import { test, expect } from "@playwright/test";

const selectors = ${JSON.stringify(selectors, null, 2)};

${tests}
`;

  fs.writeFileSync(
    OUTPUT_FILE,
    content
  );

  console.log("Playwright code generated");
}

try {
  run();
} catch (error) {
  console.error(
    error instanceof Error
      ? error.message
      : String(error)
  );

  process.exitCode = 1;
}
