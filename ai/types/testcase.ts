export type StepAction =
  | "goto"
  | "fill"
  | "click";

export interface Step {
  action: StepAction;

  target: string;

  value?: string;
}

export interface TestCase {
  title: string;

  type: string;

  steps: Step[];

  expected: string;
}

export interface TestSuite {
  feature: string;

  testCases: TestCase[];
}