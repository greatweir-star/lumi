import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AiNativeRuntimeBlueprint } from "@lumiforge/agent-runtime";
import type { AgentTemplate, HardwareTarget, Project } from "@lumiforge/core";

export type CapabilityCatalogItem = {
  id: string;
  name: string;
  group: string;
  description: string;
  espClawReference: string;
  lumiForgeModule: string;
  mvpStatus: "designed" | "partial" | "implemented";
};

export type SkillCatalogItem = {
  id: string;
  name: string;
  entry: "SKILL.md";
  description: string;
  permissions: string[];
  triggers: string[];
  requiresCapabilities: string[];
  installSource: string;
  trustLevel: string;
  mvpStatus: string;
};

const root = process.cwd().includes("apps/api") ? join(process.cwd(), "../..") : process.cwd();

export const devices: HardwareTarget[] = JSON.parse(
  readFileSync(join(root, "templates/devices/devices.json"), "utf-8")
);

export const agentTemplates: AgentTemplate[] = JSON.parse(
  readFileSync(join(root, "templates/agents/agents.json"), "utf-8")
);

export const runtimeBlueprints: AiNativeRuntimeBlueprint[] = [
  JSON.parse(readFileSync(join(root, "templates/runtime/esp-claw-compatible.json"), "utf-8"))
];

export const capabilityCatalog: CapabilityCatalogItem[] = JSON.parse(
  readFileSync(join(root, "templates/runtime/capability-catalog.json"), "utf-8")
);

export const skillCatalog: SkillCatalogItem[] = JSON.parse(
  readFileSync(join(root, "templates/skills/skills.json"), "utf-8")
);

export const projects = new Map<string, Project>();
