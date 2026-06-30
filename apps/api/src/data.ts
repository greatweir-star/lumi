import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AiNativeRuntimeBlueprint, SkillTestCase } from "@lumiforge/agent-runtime";
import type { AgentTemplate, ClawPackage, HardwareTarget, Project, SkillsLabPackage } from "@lumiforge/core";

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

export type CompatibilityMatrixItem = {
  id: string;
  hardwareClaw: string;
  runtimeProfile: string;
  skillIds: string[];
  status: string;
  coverage: Record<string, string>;
  metrics: Record<string, number | string | null>;
  notes: string;
};

export type SkillsLabUpstream = {
  id: string;
  name: string;
  type: string;
  repository: string;
  branch: string;
  skillsRoot: string;
  siteUrl: string;
  licensePolicy: string;
  syncMode: string;
  securityPolicy: Record<string, unknown>;
  notes: string;
};

export type SkillsLabImportSnapshot = {
  upstreamId: string;
  repository: string;
  branch: string;
  syncMode: string;
  syncedAt: string;
  totalSkillsDiscovered?: number;
  items: Array<Record<string, unknown>>;
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

export const clawPackages: ClawPackage[] = JSON.parse(
  readFileSync(join(root, "datasets/claws/claws.json"), "utf-8")
);

export const skillTests: SkillTestCase[] = JSON.parse(
  readFileSync(join(root, "datasets/skill-tests/skill-tests.json"), "utf-8")
);

export const compatibilityMatrix: CompatibilityMatrixItem[] = JSON.parse(
  readFileSync(join(root, "datasets/compatibility/compatibility-matrix.json"), "utf-8")
);

export const skillsLabPackages: SkillsLabPackage[] = JSON.parse(
  readFileSync(join(root, "datasets/skills-lab/skills-lab.json"), "utf-8")
);

export const skillsLabUpstreams: SkillsLabUpstream[] = JSON.parse(
  readFileSync(join(root, "datasets/skills-lab/upstreams.json"), "utf-8")
);

export const skillsLabImportSnapshots: SkillsLabImportSnapshot[] = [
  JSON.parse(readFileSync(join(root, "datasets/skills-lab/imports/esp-claw-skills-lab.metadata.json"), "utf-8"))
];

export const projects = new Map<string, Project>();
