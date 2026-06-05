import { execSync } from "child_process";

function runStep(
  title: string,
  command: string
) {
  console.log(`\n=== ${title} ===\n`);

  try {
    execSync(command, {
      stdio: "inherit"
    });
  } catch (error) {
    console.error(
      `${title} 실패`
    );
  }
}

runStep(
  "Playwright Run",
  "npx playwright test",
);

runStep(
  "Save Test History",
  "npx tsx ai/utils/save-playwright-results.ts"
);

runStep(
  "Failure Analysis",
  "npx tsx ai/agents/analyze-failure.ts"
);

runStep(
  "Trend Analysis",
  "npx tsx ai/agents/analyze-failure-trends.ts"
);

console.log(
  "\n=== QA Pipeline Complete ==="
);