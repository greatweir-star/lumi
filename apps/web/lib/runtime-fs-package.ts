import { compileRuntimeFsPackage, createRuntimeDeploymentUnit, type RuntimeFsPackage } from "@lumiforge/agent-runtime";
import skillsJson from "../../../templates/skills/skills.json";
import { mockRuntimeState, runtimeBlueprint } from "./runtime";

function buildPreviewDeploymentUnit() {
  const skills = (skillsJson as Array<{ id: string; name: string; permissions: string[]; installSource: string; trustLevel: string }>).map((skill) => ({
    id: skill.id,
    name: skill.name,
    entry: "SKILL.md" as const,
    permissions: skill.permissions.filter((permission) => ["filesystem", "network", "hardware", "mcp", "llm", "scheduler"].includes(permission)) as Array<"filesystem" | "network" | "hardware" | "mcp" | "llm" | "scheduler">,
    installSource: skill.installSource === "builtin" ? "local" as const : "skills_lab" as const,
    trustLevel: skill.trustLevel === "builtin" ? "builtin" as const : "community" as const
  }));

  const deployment = createRuntimeDeploymentUnit({
    id: "runtime-fs-preview",
    projectId: "preview-project",
    deviceId: mockRuntimeState.device.id,
    runtimeProfile: runtimeBlueprint,
    agentConfig: {
      projectId: "preview-project",
      persona: "你是一个运行在智能硬件上的 LumiForge Agent。",
      llmProvider: "openai",
      memoryMode: "local",
      skillIds: skills.map((skill) => skill.id),
      rules: mockRuntimeState.eventRouter
    }
  });

  return {
    ...deployment,
    skills,
    routerRules: mockRuntimeState.eventRouter.map((rule) => ({
      id: rule.id,
      source: rule.source,
      action: rule.action,
      status: rule.status as "draft" | "enabled" | "disabled"
    }))
  };
}

export function getRuntimeFsPreviewPackage(): RuntimeFsPackage {
  return compileRuntimeFsPackage(buildPreviewDeploymentUnit(), {
    generatedAt: "2026-06-30T00:00:00.000Z"
  });
}
