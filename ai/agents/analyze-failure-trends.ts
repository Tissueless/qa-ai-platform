import fs from "fs";

const raw =
  fs.readFileSync(
    "reports/failures.json",
    "utf-8"
  );

const reports =
  JSON.parse(raw);

const categoryStats:
  Record<string, number> = {};

const severityStats:
  Record<string, number> = {};

const signatureStats:
  Record<string, number> = {};

for (const report of reports) {

  categoryStats[
    report.category
  ] =

    (
      categoryStats[
        report.category
      ] || 0
    ) + 1;

  severityStats[
    report.severity
  ] =

    (
      severityStats[
        report.severity
      ] || 0
    ) + 1;

  signatureStats[
    report.signature
  ] =

    (
      signatureStats[
        report.signature
      ] || 0
    ) + 1;
}

console.log(
  "\n=== Failure Categories ==="
);

console.table(
  categoryStats
);

console.log(
  "\n=== Severity Distribution ==="
);

console.table(
  severityStats
);

console.log(
  "\n=== Failure Signatures ==="
);

console.table(
  signatureStats
);

const highSeverity =
  reports.filter(report =>

    report.severity ===
      "high"

    ||

    report.severity ===
      "critical"
  );

console.log(
  "\n=== High Severity Failures ==="
);

console.table(

  highSeverity.map(report => ({

    timestamp:
      report.timestamp,

    category:
      report.category,

    confidence:
      report.confidence
  }))
);