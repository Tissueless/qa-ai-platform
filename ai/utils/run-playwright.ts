import fs from "fs";

import { execSync }
  from "child_process";

try {

  const result =
    execSync(
      "npx playwright test",
      {
        encoding: "utf-8",
      }
    );

  console.log(result);

} catch (error: any) {

  const output =
    error.stdout +
    "\n" +
    error.stderr;

  fs.writeFileSync(
    "test-results/error.log",
    output,
    "utf-8"
  );

saveTestRun({

  testName:
    "signup test",

  status:
    "failed"
});

  console.log(
    "실패 로그 저장 완료"
  );
}