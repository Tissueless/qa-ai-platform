import fs from "fs";
import path from "path";

function walk(
  dir: string
): string[] {

  let results: string[] = [];

  const list =
    fs.readdirSync(dir);

  for (const file of list) {

    const fullPath =
      path.join(dir, file);

    const stat =
      fs.statSync(fullPath);

    if (stat.isDirectory()) {

      results =
        results.concat(
          walk(fullPath)
        );

    } else {

      results.push(fullPath);
    }
  }

  return results;
}

const files =
  walk("test-results");

const artifacts = {

  trace:

    files.find(file =>
      file.endsWith(".zip")
    ) ?? null,

  screenshot:

    files.find(file =>
      file.endsWith(".png")
    ) ?? null,

  video:

    files.find(file =>
      file.endsWith(".webm")
    ) ?? null,

  errorLog:

    fs.existsSync(
      "test-results/error.log"
    )
      ? "test-results/error.log"
      : null
};

console.log(
  JSON.stringify(
    artifacts,
    null,
    2
  )
);