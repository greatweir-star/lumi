import type { AgentTemplate, HardwareTarget } from "@lumiforge/core";
import devicesJson from "../../../templates/devices/devices.json";
import agentsJson from "../../../templates/agents/agents.json";

export const devices = devicesJson as HardwareTarget[];
export const agentTemplates = agentsJson as AgentTemplate[];
