import type { FastifyInstance } from "fastify";
import { compileProjectToAgentConfig } from "@lumiforge/agent-runtime";
import { DeployRequestSchema, ProjectSchema, scoreHardwareForTemplate } from "@lumiforge/core";
import { defaultFirmwareAdapters } from "@lumiforge/firmware-adapters";
import { agentTemplates, devices, projects, runtimeBlueprints } from "./data";
import { mockRuntimeState } from "./runtime-state";

function getDefaultRuntime() {
  return runtimeBlueprints[0];
}

export async function registerRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ ok: true, service: "lumiforge-api" }));

  app.get("/devices", async () => devices);

  app.get("/devices/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const device = devices.find((item) => item.id === id);
    if (!device) return reply.code(404).send({ message: "Device not found" });
    return device;
  });

  app.get("/templates", async () => agentTemplates);

  app.get("/templates/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const template = agentTemplates.find((item) => item.id === id);
    if (!template) return reply.code(404).send({ message: "Template not found" });
    return template;
  });

  app.get("/runtime/blueprints", async () => runtimeBlueprints);

  app.get("/runtime/blueprint", async () => getDefaultRuntime());

  app.get("/runtime/blueprint/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const blueprint = runtimeBlueprints.find((item) => item.id === id);
    if (!blueprint) return reply.code(404).send({ message: "Runtime blueprint not found" });
    return blueprint;
  });

  app.get("/runtime/capabilities", async () => getDefaultRuntime().capabilities);

  app.get("/runtime/filesystem", async () => getDefaultRuntime().fileSystem);

  app.get("/runtime/web-console-modules", async () => getDefaultRuntime().webConsole);

  app.get("/runtime/state", async () => mockRuntimeState);

  app.get("/runtime/deployment-unit", async () => ({
    firmwareManifest: null,
    runtimeProfile: getDefaultRuntime(),
    runtimeFsSeed: getDefaultRuntime().fileSystem,
    agentConfig: null,
    skills: [],
    routerRules: mockRuntimeState.eventRouter,
    memorySeed: getDefaultRuntime().memory,
    deviceIdentity: mockRuntimeState.device
  }));

  app.get("/recommendations/:templateId", async (request, reply) => {
    const { templateId } = request.params as { templateId: string };
    const template = agentTemplates.find((item) => item.id === templateId);
    if (!template) return reply.code(404).send({ message: "Template not found" });

    return devices
      .map((device) => ({ device, score: scoreHardwareForTemplate(device, template) }))
      .sort((a, b) => b.score - a.score);
  });

  app.post("/projects", async (request, reply) => {
    const now = new Date().toISOString();
    const body = request.body as Record<string, unknown>;
    const project = ProjectSchema.parse({
      id: body.id ?? `proj_${crypto.randomUUID()}`,
      name: body.name ?? "未命名智能硬件项目",
      deviceId: body.deviceId,
      agentTemplateId: body.agentTemplateId,
      persona: body.persona ?? "你是一个友好的智能硬件助手。",
      llmProvider: body.llmProvider ?? "openai",
      voiceProvider: body.voiceProvider ?? "none",
      memoryMode: body.memoryMode ?? "session",
      skills: body.skills ?? [],
      createdAt: body.createdAt ?? now,
      updatedAt: now
    });
    projects.set(project.id, project);
    return reply.code(201).send(project);
  });

  app.get("/projects", async () => Array.from(projects.values()));

  app.get("/projects/:id/agent-config", async (request, reply) => {
    const { id } = request.params as { id: string };
    const project = projects.get(id);
    if (!project) return reply.code(404).send({ message: "Project not found" });
    return {
      agent: compileProjectToAgentConfig(project),
      runtime: getDefaultRuntime()
    };
  });

  app.post("/deployments", async (request, reply) => {
    const deployRequest = DeployRequestSchema.parse(request.body);
    const device = devices.find((item) => item.id === deployRequest.deviceId);
    if (!device) return reply.code(404).send({ message: "Device not found" });

    const adapter = defaultFirmwareAdapters.find((item) => item.supports(device));
    if (!adapter) return reply.code(400).send({ message: "No firmware adapter supports this device" });

    const progress: unknown[] = [];
    const deployment = await adapter.flash(deployRequest, (item) => progress.push(item));
    return reply.code(201).send({ deployment, runtime: getDefaultRuntime(), progress });
  });
}
