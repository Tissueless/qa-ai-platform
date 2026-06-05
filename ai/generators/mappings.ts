import type { Step } from "../types/testcase.js";

export function mapStepToCode(step: Step) {
  switch (step.action) {
    case "goto":
      return `await page.goto("${step.target}");`;

    case "fill":
      return `
await page.fill(
  selectors.${step.target},
  "${step.value ?? ""}"
);
`;

    case "click":
      return `
await page.click(
  selectors.${step.target}
);
`;

    default:
      return `// unknown action: ${JSON.stringify(step)}`;
  }
}
