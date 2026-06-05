import fs from "fs";

export function saveTestRun(
  data: any
) {

  const filePath =
    "reports/test-runs.json";

  let runs = [];

  if (
    fs.existsSync(filePath)
  ) {

    runs =
      JSON.parse(

        fs.readFileSync(
          filePath,
          "utf-8"
        )
      );
  }

  runs.push({

    timestamp:
      new Date().toISOString(),

    ...data
  });

  fs.writeFileSync(

    filePath,

    JSON.stringify(
      runs,
      null,
      2
    )
  );
}