import fs from "fs";
import ollama from "ollama";

import { TestSuiteSchema } from "../schemas/testcase-schema.js";
import { extractJson } from "../utils/extract-json.js";
import { testcasePrompt } from "../prompts/testcase.js";

async function run() {
  const requirement = fs.readFileSync(
    "qa/requirements/signup.md",
    "utf-8"
  );

  const response = await ollama.chat({
    model: "qwen2.5:3b",

    messages: [
      {
        role: "system",
        content: testcasePrompt,
      },
      {
        role: "user",
        content: requirement,
      },
    ],

    options: {
      temperature: 0,
    },
  });

  const parsed = extractJson(
    response.message.content
  );

  const validated =
    TestSuiteSchema.parse(parsed);

  fs.writeFileSync(
    "qa/testcases/signup-testcases.json",
    JSON.stringify(
      validated,
      null,
      2
    )
  );

  console.log("JSON 저장 완료");
}

run();
