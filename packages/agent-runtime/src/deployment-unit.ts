import type { AiNativeRuntimeBlueprint, RuntimeFileSystemLayout, SkillPackageManifest } from "./ai-native";

export type RuntimeDeploymentUnit = {
  id: string;
  firmwareManifestId: string | null;
  runtimeProfile: AiNativeRuntimeBlueprint;
  runtimeFsSeed: RuntimeFileSystemLayout;
  agentConfig: Record<string, unknown>;
  skills: SkillPackageManifest[];
  luaScripts: Array<{
    path: string;
    content: string;
  }>;
  routerRules: Array<{
    id: string;
    source: string;
    action: string;
    status: "draft" | "enabled" | "disabled";
  }>;
  schedulerConfig: Array<{
    id: string;
    cron?: string;
    intervalMs?: number;
    action: string;
    enabled: boolean;
  }>;
  memorySeed: {
    files: Array<{
      path: string;
      content: string;
    }>;
  };
  deviceIdentity: {
    deviceId: string;
    projectId: string;
    runtimeProfileId: string;
  };
};

export function createRuntimeDeploymentUnit(input: {
  id: string;
  projectId: string;
  deviceId: string;
  runtimeProfile: AiNativeRuntimeBlueprint;
  agentConfig: Record<string, unknown>;
}): RuntimeDeploymentUnit {
  return {
    id: input.id,
    firmwareManifestId: null,
    runtimeProfile: input.runtimeProfile,
    runtimeFsSeed: input.runtimeProfile.fileSystem,
    agentConfig: input.agentConfig,
    skills: [],
    luaScripts: [],
    routerRules: [],
    schedulerConfig: [],
    memorySeed: {
      files: [
        { path: input.runtimeProfile.memory.humanReadableFile, content: "# MEMORY\n" },
        { path: input.runtimeProfile.memory.recordsFile, content: "" },
        { path: input.runtimeProfile.memory.indexFile, content: "{}" },
        { path: input.runtimeProfile.memory.digestFile, content: "" },
        { path: input.runtimeProfile.memory.personaFiles.user, content: "# User\n" },
        { path: input.runtimeProfile.memory.personaFiles.soul, content: "# Soul\n" },
        { path: input.runtimeProfile.memory.personaFiles.identity, content: "# Identity\n" }
      ]
    },
    deviceIdentity: {
      deviceId: input.deviceId,
      projectId: input.projectId,
      runtimeProfileId: input.runtimeProfile.id
    }
  };
}
