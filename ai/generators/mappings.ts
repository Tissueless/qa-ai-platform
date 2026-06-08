import type { Step } from "../types/testcase.js";

export function mapStepToCode(step: Step) {
  switch (step.action) {
    case "goto":
      return `await page.goto(${JSON.stringify(step.target)});`;

    case "fill":
      return `
await page.fill(
  selectors[${JSON.stringify(step.target)}],
  ${JSON.stringify(step.value ?? "")}
);
`;

    case "click":
      return `
await page.click(
  selectors[${JSON.stringify(step.target)}]
);
`;

    default:
      throw new Error(
        `Unsupported test step action: ${JSON.stringify(step)}`
      );
  }
}
