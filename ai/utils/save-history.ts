import fs from "fs";

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

history.push({
  timestamp: new Date().toISOString(),

  testName: process.argv[2],

  status: process.argv[3]
});

fs.writeFileSync(
  historyFile,
  JSON.stringify(
    history,
    null,
    2
  )
);