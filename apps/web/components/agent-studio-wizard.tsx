"use client";

import { useMemo, useState } from "react";
import type { AgentTemplate, HardwareTarget, Project } from "@lumiforge/core";
import { apiPost } from "../lib/api";
import { runtimeBlueprint } from "../lib/runtime";

type DeploymentResponse = {
  deployment: unknown;
  runtime: unknown;
  progress: Array<{ stage: string; percent: number; message: string }>;
};

type WizardStep = "device" | "template" | "runtime" | "agent" | "deploy";

const steps: Array<{ id: WizardStep; label: string }> = [
  { id: "device", label: "选择硬件" },
  { id: "template", label: "选择模板" },
  { id: "runtime", label: "Runtime 配置" },
  { id: "agent", label: "Agent 配置" },
  { id: "deploy", label: "部署预览" }
];

export function AgentStudioWizard({
  devices,
  templates
}: {
  devices: HardwareTarget[];
  templates: AgentTemplate[];
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0]?.id ?? "");
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id ?? "");
  const [projectName, setProjectName] = useState("LumiForge AI 硬件项目");
  const [persona, setPersona] = useState(templates[0]?.defaultPersona ?? "你是一个友好的智能硬件助手。");
  const [llmProvider, setLlmProvider] = useState("openai");
  const [voiceProvider, setVoiceProvider] = useState("none");
  const [memoryMode, setMemoryMode] = useState("local");
  const [enabledSkills, setEnabledSkills] = useState<string[]>(templates[0]?.skills.map((skill) => skill.id) ?? []);
  const [project, setProject] = useState<Project | null>(null);
  const [deployment, setDeployment] = useState<DeploymentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDevice = useMemo(
    () => devices.find((device) => device.id === selectedDeviceId) ?? devices[0],
    [devices, selectedDeviceId]
  );

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? templates[0],
    [templates, selectedTemplateId]
  );

  const currentStep = steps[stepIndex]?.id ?? "device";
  const firmwareProfile = selectedDevice?.firmwareProfiles[0] ?? "esp-claw-compatible";

  function selectTemplate(templateId: string) {
    const template = templates.find((item) => item.id === templateId);
    setSelectedTemplateId(templateId);
    if (template) {
      setPersona(template.defaultPersona);
      setEnabledSkills(template.skills.map((skill) => skill.id));
    }
  }

  function toggleSkill(skillId: string) {
    setEnabledSkills((current) =>
      current.includes(skillId) ? current.filter((id) => id !== skillId) : [...current, skillId]
    );
  }

  async function createProjectAndPreviewDeployment() {
    if (!selectedDevice || !selectedTemplate) return;
    setIsSubmitting(true);
    setError(null);
    setDeployment(null);
    try {
      const createdProject = await apiPost<Project>("/projects", {
        name: projectName,
        deviceId: selectedDevice.id,
        agentTemplateId: selectedTemplate.id,
        persona,
        llmProvider,
        voiceProvider,
        memoryMode,
        skills: enabledSkills
      });
      setProject(createdProject);

      const createdDeployment = await apiPost<DeploymentResponse>("/deployments", {
        projectId: createdProject.id,
        deviceId: selectedDevice.id,
        firmwareProfile,
        agentConfig: {
          persona,
          llmProvider,
          voiceProvider,
          memoryMode,
          skills: enabledSkills,
          runtimeProfileId: runtimeBlueprint.id
        }
      });
      setDeployment(createdDeployment);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="panel wizard-panel">
      <div className="wizard-steps">
        {steps.map((step, index) => (
          <button
            className={`wizard-step ${index === stepIndex ? "active" : ""}`}
            key={step.id}
            onClick={() => setStepIndex(index)}
            type="button"
          >
            <span>{index + 1}</span>{step.label}
          </button>
        ))}
      </div>

      {currentStep === "device" && (
        <div>
          <h2>选择硬件</h2>
          <p className="muted">先选设备，LumiForge 会根据硬件能力和 Runtime Profile 生成部署单元。</p>
          <div className="choice-grid">
            {devices.map((device) => (
              <button
                className={`choice-card ${device.id === selectedDeviceId ? "selected" : ""}`}
                key={device.id}
                onClick={() => setSelectedDeviceId(device.id)}
                type="button"
              >
                <strong>{device.name}</strong>
                <span>{device.chip} · Flash {device.flashMB}MB</span>
                <small>{device.capabilities.slice(0, 8).join(" / ")}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "template" && (
        <div>
          <h2>选择 Agent 模板</h2>
          <p className="muted">模板后续会升级为 Runtime-aware Template，包含 Skills、Lua、Router Rules 和 Memory Seed。</p>
          <div className="choice-grid">
            {templates.map((template) => (
              <button
                className={`choice-card ${template.id === selectedTemplateId ? "selected" : ""}`}
                key={template.id}
                onClick={() => selectTemplate(template.id)}
                type="button"
              >
                <strong>{template.name}</strong>
                <span>{template.tagline}</span>
                <small>{template.requiredCapabilities.join(" / ")}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "runtime" && (
        <div>
          <h2>Runtime 配置</h2>
          <p className="muted">当前使用 `esp-claw-compatible` Profile，覆盖 Agent Core、LLM+Lua、Memory、Skills、MCP 和 Web Console。</p>
          <div className="pipeline">
            <div className="pipeline-item"><strong>Runtime</strong><span>{runtimeBlueprint.id}</span></div>
            <div className="pipeline-item"><strong>Modules</strong><span>{runtimeBlueprint.modules.length} enabled</span></div>
            <div className="pipeline-item"><strong>Capabilities</strong><span>{runtimeBlueprint.capabilities.length} registered</span></div>
            <div className="pipeline-item"><strong>Memory</strong><span>{runtimeBlueprint.memory.enabled ? "local memory enabled" : "disabled"}</span></div>
            <div className="pipeline-item"><strong>MCP</strong><span>server {runtimeBlueprint.mcp.server.enabled ? "on" : "off"} / client {runtimeBlueprint.mcp.client.enabled ? "on" : "off"}</span></div>
            <div className="pipeline-item"><strong>FS</strong><span>{runtimeBlueprint.fileSystem.root}</span></div>
          </div>
        </div>
      )}

      {currentStep === "agent" && selectedTemplate && (
        <div>
          <h2>Agent 配置</h2>
          <div className="form-grid">
            <label className="field"><span>项目名称</span><input value={projectName} onChange={(event) => setProjectName(event.target.value)} /></label>
            <label className="field"><span>LLM Provider</span><select value={llmProvider} onChange={(event) => setLlmProvider(event.target.value)}><option value="openai">OpenAI</option><option value="deepseek">DeepSeek</option><option value="qwen">Qwen</option><option value="ollama">Ollama</option><option value="custom">Custom</option></select></label>
            <label className="field"><span>Voice Provider</span><select value={voiceProvider} onChange={(event) => setVoiceProvider(event.target.value)}><option value="none">None</option><option value="openai">OpenAI</option><option value="qwen">Qwen</option><option value="custom">Custom</option></select></label>
            <label className="field"><span>Memory Mode</span><select value={memoryMode} onChange={(event) => setMemoryMode(event.target.value)}><option value="off">Off</option><option value="session">Session</option><option value="local">Local</option><option value="cloud">Cloud</option></select></label>
          </div>
          <label className="field full"><span>Persona</span><textarea value={persona} onChange={(event) => setPersona(event.target.value)} rows={5} /></label>
          <h3>Skills</h3>
          <div className="choice-grid compact">
            {selectedTemplate.skills.map((skill) => (
              <button className={`choice-card ${enabledSkills.includes(skill.id) ? "selected" : ""}`} key={skill.id} onClick={() => toggleSkill(skill.id)} type="button">
                <strong>{skill.name}</strong><span>{skill.description}</span><small>{skill.trigger}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "deploy" && selectedDevice && selectedTemplate && (
        <div>
          <h2>部署预览</h2>
          <p className="muted">这里会生成 Runtime Deployment Unit。当前后端会创建项目并返回模拟部署进度，下一步接真机烧录。</p>
          <div className="pipeline">
            <div className="pipeline-item"><strong>Device</strong><span>{selectedDevice.name}</span></div>
            <div className="pipeline-item"><strong>Template</strong><span>{selectedTemplate.name}</span></div>
            <div className="pipeline-item"><strong>Firmware</strong><span>{firmwareProfile}</span></div>
            <div className="pipeline-item"><strong>Runtime</strong><span>{runtimeBlueprint.id}</span></div>
            <div className="pipeline-item"><strong>Skills</strong><span>{enabledSkills.length} selected</span></div>
            <div className="pipeline-item"><strong>Memory</strong><span>{memoryMode}</span></div>
          </div>
          <div className="actions">
            <button className="btn primary" disabled={isSubmitting} onClick={createProjectAndPreviewDeployment} type="button">
              {isSubmitting ? "生成中..." : "创建项目并生成部署预览"}
            </button>
          </div>
          {error && <pre className="console-output">{error}</pre>}
          {project && <pre className="console-output">{JSON.stringify({ project, deployment }, null, 2)}</pre>}
        </div>
      )}

      <div className="wizard-actions">
        <button className="btn" disabled={stepIndex === 0} onClick={() => setStepIndex((index) => Math.max(0, index - 1))} type="button">上一步</button>
        <button className="btn primary" disabled={stepIndex === steps.length - 1} onClick={() => setStepIndex((index) => Math.min(steps.length - 1, index + 1))} type="button">下一步</button>
      </div>
    </section>
  );
}
