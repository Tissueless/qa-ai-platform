import { z } from "zod";

export const StepSchema = z.object({
  action: z.enum([
    "goto",
    "fill",
    "click"
  ]),

  target: z.string(),

  value: z.string().optional(),
});

export const TestCaseSchema =
  z.object({

    title: z.string(),

    type: z.string(),

    expected: z.string(),

    steps: z.array(
      StepSchema
    ),
  });

export const TestSuiteSchema =
  z.object({

    feature: z.string(),

    testCases: z.array(
      TestCaseSchema
    ),
  });