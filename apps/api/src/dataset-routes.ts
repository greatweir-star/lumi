import type { FastifyInstance } from "fastify";
import { evaluateSkillTest, summarizeSkillTestResults } from "@lumiforge/agent-runtime";
import { scoreClawPackage } from "@lumiforge/core";
import { clawPackages, compatibilityMatrix, skillCatalog, skillTests } from "./data";

function observationFor(testId: string) {
  const memory = testId.includes("memory");
  return {
    output: memory ? "已记住桌面机器人" : "你好 capability tool ready",
    calledTools: memory ? ["memory_write"] : ["get_current_time", "heap_info"],
    wroteMemory: memory,
    latencyMs: 120
  };
}

export async function registerDatasetRoutes(app: FastifyInstance) {
  app.get("/datasets/claws", async () => clawPackages.map((claw) => ({ ...claw, computedScore: scoreClawPackage(claw) })));

  app.get("/datasets/claws/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const claw = clawPackages.find((item) => item.id === id);
    return claw ? { ...claw, computedScore: scoreClawPackage(claw) } : reply.code(404).send({ message: "Claw package not found" });
  });

  app.get("/datasets/skill-tests", async () => skillTests);

  app.get("/datasets/skill-tests/results", async () => {
    const results = skillTests.map((test) => evaluateSkillTest(test, observationFor(test.id)));
    return { summary: summarizeSkillTestResults(results), results };
  });

  app.get("/datasets/compatibility", async () => compatibilityMatrix);

  app.get("/datasets/stats", async () => ({
    claws: clawPackages.length,
    hardwareClaws: clawPackages.filter((item) => item.kind === "hardware").length,
    skills: skillCatalog.length,
    skillTests: skillTests.length,
    compatibilityRows: compatibilityMatrix.length,
    testedClaws: clawPackages.filter((item) => item.quality.tested).length,
    averageScore: clawPackages.length ? clawPackages.reduce((sum, item) => sum + scoreClawPackage(item), 0) / clawPackages.length : 0
  }));
}
