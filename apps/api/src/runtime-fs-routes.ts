import type { FastifyInstance } from "fastify";
import { compileRuntimeFsPackage, createRuntimeDeploymentUnit } from "@lumiforge/agent-runtime";
import { runtimeBlueprints, skillCatalog } from "./data";
import { mockRuntimeState } from "./runtime-state";

function createPreviewDeploymentUnit() {
  const runtimeProfile = runtimeBlueprints[0];
  const skills = skillCatalog.map((skill) => ({
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
    runtimeProfile,
    agentConfig: {
      projectId: "preview-project",
      persona: "你是一个运行在智能硬件上的 LumiForge Agent。",
      llmProvider: "openai",
      memoryMode: "local",
      skillIds: skillCatalog.map((skill) => skill.id),
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

function summarizePackage() {
  const runtimeFsPackage = compileRuntimeFsPackage(createPreviewDeploymentUnit(), {
    generatedAt: "2026-06-30T00:00:00.000Z"
  });
  return runtimeFsPackage;
}

export async function registerRuntimeFsRoutes(app: FastifyInstance) {
  app.get("/runtime/fs-package/preview", async () => {
    const runtimeFsPackage = summarizePackage();
    return {
      manifest: runtimeFsPackage.manifest,
      files: runtimeFsPackage.files.map((file) => ({
        path: file.path,
        kind: file.kind,
        sizeBytes: file.sizeBytes,
        checksum: file.checksum
      }))
    };
  });

  app.get("/runtime/fs-package/manifest", async () => summarizePackage().manifest);

  app.get("/runtime/fs-package/files", async () =>
    summarizePackage().files.map((file) => ({
      path: file.path,
      kind: file.kind,
      sizeBytes: file.sizeBytes,
      checksum: file.checksum,
      contentPreview: file.content.length > 500 ? `${file.content.slice(0, 500)}...` : file.content
    }))
  );
}
