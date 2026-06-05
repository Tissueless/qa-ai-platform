import fs from "fs";

import {
  recommendFix
} from "./recommend-fix.js";

import {
  generateFailureSignature
} from "./generate-failure-signature.js";

export function saveFailureReport(
  report: any
) {

  const filePath =
    "reports/failures.json";

  let reports = [];

  if (
    fs.existsSync(filePath)
  ) {

    const raw =
      fs.readFileSync(
        filePath,
        "utf-8"
      );

    reports =
      JSON.parse(raw);
  }

reports.push({

  timestamp:
    new Date().toISOString(),

  signature:
    generateFailureSignature(
      report
    ),

recommendation:
  recommendFix(report),

  ...report
});

  fs.writeFileSync(

    filePath,

    JSON.stringify(
      reports,
      null,
      2
    )
  );
}