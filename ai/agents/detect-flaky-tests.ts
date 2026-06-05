import fs from "fs";

const raw =
  fs.readFileSync(
    "reports/test-runs.json",
    "utf-8"
  );

const runs =
  JSON.parse(raw);

const grouped:
  Record<string, string[]>
= {};

for (const run of runs) {

  if (
    !grouped[
      run.testName
    ]
  ) {

    grouped[
      run.testName
    ] = [];
  }

  grouped[
    run.testName
  ].push(
    run.status
  );
}

console.log(
  "\n=== Flaky Tests ==="
);

for (
  const testName in grouped
) {

  const statuses =
    grouped[testName];

  const hasPass =
    statuses.includes(
      "passed"
    );

  const hasFail =
    statuses.includes(
      "failed"
    );

  if (
    hasPass &&
    hasFail
  ) {

    console.log({

      testName,

      statuses,

      flaky: true
    });
  }
}