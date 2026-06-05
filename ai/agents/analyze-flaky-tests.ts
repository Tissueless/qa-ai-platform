import fs from "fs";

const history =
  JSON.parse(
    fs.readFileSync(
      "reports/test-history.json",
      "utf8"
    )
  );

const grouped =
  history.reduce(
    (acc: any, item: any) => {

      if (!acc[item.testName]) {

        acc[item.testName] = [];
      }

      acc[item.testName].push(item);

      return acc;
    },
    {}
  );

for (const testName in grouped) {

  const runs =
    grouped[testName];

  const failed =
    runs.filter(
      (r: any) =>
        r.status === "failed"
    ).length;

  const score =
    (
      failed /
      runs.length
    ) * 100;

  console.log(
    `${testName} -> Flaky Score ${score.toFixed(1)}%`
  );
}