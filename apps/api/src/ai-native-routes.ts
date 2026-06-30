import type { FastifyInstance } from "fastify";
import { classifyAiNativeMaturity, getAiNativeCriticalPath, summarizeAiNativeReadiness } from "@lumiforge/core";
import { aiNativeReadiness } from "./data";

export async function registerAiNativeRoutes(app: FastifyInstance) {
  app.get("/ai-native/readiness", async () => aiNativeReadiness);

  app.get("/ai-native/summary", async () => {
    const summary = summarizeAiNativeReadiness(aiNativeReadiness);
    return {
      ...summary,
      maturity: classifyAiNativeMaturity(summary.averageScore)
    };
  });

  app.get("/ai-native/critical-path", async () => getAiNativeCriticalPath(aiNativeReadiness));

  app.get("/ai-native/gaps", async () =>
    aiNativeReadiness.areas
      .filter((area) => area.status === "gap" || area.status === "partial")
      .sort((a, b) => {
        const priority = { P0: 0, P1: 1, P2: 2 } as const;
        return priority[a.priority] - priority[b.priority] || a.score - b.score;
      })
  );
}
