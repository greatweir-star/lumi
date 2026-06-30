import readinessJson from "../../../templates/runtime/ai-native-readiness.json";

export type AiNativeReadinessArea = {
  id: string;
  name: string;
  target: string;
  current: string;
  status: "gap" | "partial" | "ready";
  score: number;
  priority: "P0" | "P1" | "P2";
  missing: string[];
  nextActions: string[];
};

export type AiNativeReadiness = {
  version: string;
  generatedFrom: string[];
  overallTarget: string;
  areas: AiNativeReadinessArea[];
};

export const aiNativeReadiness = readinessJson as AiNativeReadiness;

export function summarizeReadiness() {
  const total = aiNativeReadiness.areas.length;
  const averageScore = total
    ? aiNativeReadiness.areas.reduce((sum, area) => sum + area.score, 0) / total
    : 0;
  const gaps = aiNativeReadiness.areas.filter((area) => area.status === "gap");
  const partial = aiNativeReadiness.areas.filter((area) => area.status === "partial");
  const p0 = aiNativeReadiness.areas.filter((area) => area.priority === "P0" && area.status !== "ready");
  return {
    total,
    averageScore: Number(averageScore.toFixed(1)),
    gaps: gaps.length,
    partial: partial.length,
    p0: p0.length,
    criticalPath: p0.sort((a, b) => a.score - b.score)
  };
}
