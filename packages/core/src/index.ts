export * from "./naming";
export * from "./dataset";
export * from "./skills-lab";

import { z } from "zod";

export const DeviceCapabilitySchema = z.enum([
  "display",
  "touch",
  "microphone",
  "speaker",
  "camera",
  "battery",
  "wifi",
  "ble",
  "gpio",
  "i2c",
  "uart",
  "sensor",
  "led",
  "button",
  "web_serial_flash",
  "ota",
  "agent_runtime"
]);

export type DeviceCapability = z.infer<typeof DeviceCapabilitySchema>;

export const HardwareTargetSchema = z.object({
  id: z.string(),
  name: z.string(),
  vendor: z.string(),
  chip: z.string(),
  flashMB: z.number(),
  psramMB: z.number().optional(),
  recommendedUseCases: z.array(z.string()),
  capabilities: z.array(DeviceCapabilitySchema),
  firmwareProfiles: z.array(z.string()),
  purchaseNotes: z.string().optional(),
  maturity: z.enum(["experimental", "mvp", "production_ready"])
});

export type HardwareTarget = z.infer<typeof HardwareTargetSchema>;

export const AgentSkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  trigger: z.enum(["voice", "button", "schedule", "sensor", "vision", "manual"]),
  requires: z.array(DeviceCapabilitySchema).default([]),
  configSchema: z.record(z.unknown()).default({})
});

export type AgentSkill = z.infer<typeof AgentSkillSchema>;

export const AgentTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  scenario: z.enum([
    "ai_badge",
    "desktop_pet",
    "voice_assistant",
    "emotion_light",
    "vision_assistant",
    "custom"
  ]),
  description: z.string(),
  requiredCapabilities: z.array(DeviceCapabilitySchema),
  recommendedHardwareIds: z.array(z.string()),
  defaultPersona: z.string(),
  defaultWakeWord: z.string().optional(),
  skills: z.array(AgentSkillSchema),
  maturity: z.enum(["concept", "mvp", "validated"])
});

export type AgentTemplate = z.infer<typeof AgentTemplateSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  deviceId: z.string(),
  agentTemplateId: z.string(),
  persona: z.string(),
  llmProvider: z.enum(["openai", "anthropic", "deepseek", "qwen", "ollama", "custom"]),
  voiceProvider: z.enum(["none", "openai", "elevenlabs", "qwen", "custom"]),
  memoryMode: z.enum(["off", "session", "local", "cloud"]),
  skills: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Project = z.infer<typeof ProjectSchema>;

export const DeploymentSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  deviceId: z.string(),
  status: z.enum(["queued", "flashing", "configuring", "online", "failed"]),
  firmwareProfile: z.string(),
  logs: z.array(z.string()).default([]),
  createdAt: z.string(),
  finishedAt: z.string().optional()
});

export type Deployment = z.infer<typeof DeploymentSchema>;

export const DeployRequestSchema = z.object({
  projectId: z.string(),
  deviceId: z.string(),
  firmwareProfile: z.string(),
  agentConfig: z.record(z.unknown()).default({})
});

export type DeployRequest = z.infer<typeof DeployRequestSchema>;

export const DEVICE_SCORE_WEIGHTS: Record<DeviceCapability, number> = {
  display: 10,
  touch: 5,
  microphone: 15,
  speaker: 15,
  camera: 15,
  battery: 8,
  wifi: 20,
  ble: 5,
  gpio: 5,
  i2c: 5,
  uart: 3,
  sensor: 8,
  led: 5,
  button: 4,
  web_serial_flash: 20,
  ota: 20,
  agent_runtime: 25
};

export function scoreHardwareForTemplate(
  hardware: HardwareTarget,
  template: AgentTemplate
): number {
  const capabilitySet = new Set(hardware.capabilities);
  const requiredScore = template.requiredCapabilities.reduce((score, capability) => {
    return score + (capabilitySet.has(capability) ? DEVICE_SCORE_WEIGHTS[capability] : -50);
  }, 0);

  const recommendationBonus = template.recommendedHardwareIds.includes(hardware.id) ? 30 : 0;
  const maturityBonus = hardware.maturity === "production_ready" ? 20 : hardware.maturity === "mvp" ? 10 : 0;
  return requiredScore + recommendationBonus + maturityBonus;
}
