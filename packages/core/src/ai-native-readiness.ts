import { z } from "zod";

export const AiNativeReadinessStatusSchema = z.enum(["gap", "partial", "ready"]);
export const AiNativeReadinessPrioritySchema = z.enum(["P0", "P1", "P2"]);

export const AiNativeReadinessAreaSchema = z.object({
  id: z.string(),
  name: z.string(),
  target: z.string(),
  current: z.string(),
  status: AiNativeReadinessStatusSchema,
  score: z.number().min(0).max(100),
  priority: AiNativeReadinessPrioritySchema,
  missing: z.array(z.string()),
  nextActions: z.array(z.string())
});

export const AiNativeReadinessSchema = z.object({
  version: z.string(),
  generatedFrom: z.array(z.string()),
  overallTarget: z.string(),
  areas: z.array(AiNativeReadinessAreaSchema)
});

export type AiNativeReadinessStatus = z.infer<typeof AiNativeReadinessStatusSchema>;
export type AiNativeReadinessPriority = z.infer<typeof AiNativeReadinessPrioritySchema>;
export type AiNativeReadinessArea = z.infer<typeof AiNativeReadinessAreaSchema>;
export type AiNativeReadiness = z.infer<typeof AiNativeReadinessSchema>;

export function summarizeAiNativeReadiness(readiness: AiNativeReadiness) {
  const total = readiness.areas.length;
  const averageScore = total
    ? readiness.areas.reduce((sum, area) => sum + area.score, 0) / total
    : 0;
  const byStatus = readiness.areas.reduce<Record<AiNativeReadinessStatus, number>>(
    (acc, area) => {
      acc[area.status] += 1;
      return acc;
    },
    { gap: 0, partial: 0, ready: 0 }
  );
  const byPriority = readiness.areas.reduce<Record<AiNativeReadinessPriority, number>>(
    (acc, area) => {
      acc[area.priority] += 1;
      return acc;
    },
    { P0: 0, P1: 0, P2: 0 }
  );
  const p0Gaps = readiness.areas.filter((area) => area.priority === "P0" && area.status !== "ready");
  return {
    total,
    averageScore: Number(averageScore.toFixed(2)),
    byStatus,
    byPriority,
    p0GapCount: p0Gaps.length,
    p0Gaps: p0Gaps.map((area) => ({ id: area.id, name: area.name, score: area.score, missing: area.missing }))
  };
}

export function getAiNativeCriticalPath(readiness: AiNativeReadiness) {
  return readiness.areas
    .filter((area) => area.priority === "P0" && area.status !== "ready")
    .sort((a, b) => a.score - b.score)
    .map((area) => ({
      id: area.id,
      name: area.name,
      score: area.score,
      status: area.status,
      missing: area.missing,
      nextActions: area.nextActions
    }));
}

export function classifyAiNativeMaturity(score: number) {
  if (score >= 80) return "ai_native_ready";
  if (score >= 60) return "runtime_integrated";
  if (score >= 40) return "platform_scaffolded";
  if (score >= 20) return "prototype";
  return "concept";
}
