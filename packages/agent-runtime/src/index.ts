import type { Project } from "@lumiforge/core";

export type RuntimeEvent = {
  type: "voice" | "button" | "sensor" | "vision" | "schedule" | "system";
  payload: Record<string, unknown>;
  timestamp: string;
};

export type RuntimeAction = {
  type: "speak" | "show_expression" | "set_led" | "call_tool" | "remember" | "noop";
  payload: Record<string, unknown>;
};

export type CompiledAgentConfig = {
  projectId: string;
  persona: string;
  llmProvider: Project["llmProvider"];
  voiceProvider: Project["voiceProvider"];
  memoryMode: Project["memoryMode"];
  skillIds: string[];
  rules: Array<{
    when: string;
    then: RuntimeAction;
  }>;
};

export function compileProjectToAgentConfig(project: Project): CompiledAgentConfig {
  return {
    projectId: project.id,
    persona: project.persona,
    llmProvider: project.llmProvider,
    voiceProvider: project.voiceProvider,
    memoryMode: project.memoryMode,
    skillIds: project.skills,
    rules: [
      {
        when: "button.single_click",
        then: { type: "speak", payload: { text: "你好，我是 LumiForge 生成的智能体。" } }
      }
    ]
  };
}

export function routeRuntimeEvent(event: RuntimeEvent): RuntimeAction {
  if (event.type === "button") {
    return { type: "speak", payload: { text: "收到按键事件，我准备开始对话。" } };
  }
  if (event.type === "vision") {
    return { type: "call_tool", payload: { tool: "vision.describe", input: event.payload } };
  }
  return { type: "noop", payload: {} };
}
