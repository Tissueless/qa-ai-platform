import fs from "fs";

const report =
  JSON.parse(
    fs.readFileSync(
      "reports/playwright-report.json",
      "utf8"
    )
  );

const historyFile =
  "reports/test-history.json";

const history =
  fs.existsSync(historyFile)
    ? JSON.parse(
        fs.readFileSync(
          historyFile,
          "utf8"
        )
      )
    : [];

function normalizeStatus(status: string) {
  switch (status) {
    case "expected":
    case "passed":
      return "passed";

    case "unexpected":
    case "failed":
    case "timedOut":
      return "failed";

    case "skipped":
      return "skipped";

    default:
      return "unknown";
  }
}

function walkSuite(
  suite: any
) {
  if (suite.specs) {

    for (const spec of suite.specs) {

      for (
        const test of spec.tests || []
      ) {

        history.push({
          timestamp:
            new Date().toISOString(),

          testName:
            spec.title,

          status:
            normalizeStatus(
              test.status
            )
        });
      }
    }
  }

  for (
    const child of
    suite.suites || []
  ) {
    walkSuite(child);
  }
}

walkSuite(report);

fs.writeFileSync(
  historyFile,
  JSON.stringify(
    history,
    null,
    2
  )
);

console.log(
  "History updated"
);
