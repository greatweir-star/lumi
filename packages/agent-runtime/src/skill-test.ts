export type SkillTestCase = {
  id: string;
  skillId: string;
  target: {
    runtimeProfile: string;
    hardwareClaw: string;
    chip?: string;
  };
  input: {
    eventType: string;
    payload: string;
    context?: Record<string, unknown>;
  };
  expected: {
    mustCallTools?: string[];
    mustWriteMemory?: boolean;
    maxLatencyMs?: number;
    expectedOutputContains?: string[];
  };
  quality: {
    priority: "p0" | "p1" | "p2";
    status: "draft" | "passing" | "failing" | "blocked";
    notes?: string;
  };
};

export type SkillTestObservation = {
  output: string;
  calledTools: string[];
  wroteMemory: boolean;
  latencyMs: number;
};

export type SkillTestResult = {
  id: string;
  skillId: string;
  passed: boolean;
  failures: string[];
};

export function evaluateSkillTest(
  test: SkillTestCase,
  observation: SkillTestObservation
): SkillTestResult {
  const failures: string[] = [];
  for (const tool of test.expected.mustCallTools ?? []) {
    if (!observation.calledTools.includes(tool)) {
      failures.push(`expected tool call missing: ${tool}`);
    }
  }

  if (test.expected.mustWriteMemory === true && !observation.wroteMemory) {
    failures.push("expected memory write missing");
  }

  if (typeof test.expected.maxLatencyMs === "number" && observation.latencyMs > test.expected.maxLatencyMs) {
    failures.push(`latency ${observation.latencyMs}ms exceeds ${test.expected.maxLatencyMs}ms`);
  }

  for (const expectedText of test.expected.expectedOutputContains ?? []) {
    if (!observation.output.includes(expectedText)) {
      failures.push(`expected output text missing: ${expectedText}`);
    }
  }

  return {
    id: test.id,
    skillId: test.skillId,
    passed: failures.length === 0,
    failures
  };
}

export function summarizeSkillTestResults(results: SkillTestResult[]) {
  const total = results.length;
  const passed = results.filter((result) => result.passed).length;
  return {
    total,
    passed,
    failed: total - passed,
    passRate: total === 0 ? 0 : passed / total
  };
}
