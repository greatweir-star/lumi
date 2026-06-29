import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AgentTemplate, HardwareTarget, Project } from "@lingji/core";

const root = process.cwd().includes("apps/api") ? join(process.cwd(), "../..") : process.cwd();

export const devices: HardwareTarget[] = JSON.parse(
  readFileSync(join(root, "templates/devices/devices.json"), "utf-8")
);

export const agentTemplates: AgentTemplate[] = JSON.parse(
  readFileSync(join(root, "templates/agents/agents.json"), "utf-8")
);

export const projects = new Map<string, Project>();
