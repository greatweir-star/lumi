export type AiNativeModuleId =
  | "agent_core"
  | "capability_runtime"
  | "event_router"
  | "llm_lua_engine"
  | "local_memory"
  | "skills_manager"
  | "mcp_server"
  | "mcp_client"
  | "im_platform"
  | "web_console"
  | "runtime_fs"
  | "scheduler"
  | "file_manager";

export type CapabilityManifest = {
  id: string;
  name: string;
  category:
    | "hardware"
    | "agent"
    | "network"
    | "system"
    | "im"
    | "mcp"
    | "lua"
    | "skill"
    | "storage";
  description: string;
  tools: Array<{
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    visibleToLLM: boolean;
  }>;
  enabledByDefault: boolean;
  requires: string[];
};

export type RuntimeFileSystemLayout = {
  root: "/fatfs" | string;
  sessionsDir: string;
  memoryDir: string;
  skillsDir: string;
  scriptsDir: string;
  routerRulesDir: string;
  schedulerDir: string;
  staticDir: string;
  inboxDir: string;
};

export type LocalMemoryConfig = {
  enabled: boolean;
  recordsFile: string;
  indexFile: string;
  digestFile: string;
  humanReadableFile: string;
  personaFiles: {
    user: string;
    soul: string;
    identity: string;
  };
  retrieval: {
    mode: "tag_index" | "keyword" | "hybrid";
    maxRecords: number;
  };
};

export type SkillPackageManifest = {
  id: string;
  name: string;
  entry: "SKILL.md";
  scriptsDir?: string;
  resourcesDir?: string;
  permissions: Array<"filesystem" | "network" | "hardware" | "mcp" | "llm" | "scheduler">;
  installSource: "local" | "skills_lab" | "marketplace" | "git";
  trustLevel: "builtin" | "verified" | "community" | "unknown";
};

export type MCPPipelineConfig = {
  server: {
    enabled: boolean;
    exposeCapabilities: string[];
  };
  client: {
    enabled: boolean;
    allowedServers: Array<{
      id: string;
      transport: "stdio" | "sse" | "http" | "websocket";
      endpoint: string;
    }>;
  };
};

export type IMConnectorConfig = {
  platform: "local" | "wechat" | "qq" | "feishu" | "telegram" | "custom";
  enabled: boolean;
  credentialsRef?: string;
  receiveAttachments: boolean;
};

export type WebConsoleModule =
  | "status"
  | "chat"
  | "settings_basic"
  | "settings_llm"
  | "settings_im"
  | "settings_network_search"
  | "memory"
  | "capabilities"
  | "lua_modules"
  | "files"
  | "scheduler"
  | "router_rules"
  | "skills";

export type AiNativeRuntimeBlueprint = {
  id: string;
  name: "LumiForge Runtime";
  target: "mcu" | "linux_sbc" | "hybrid";
  modules: AiNativeModuleId[];
  fileSystem: RuntimeFileSystemLayout;
  memory: LocalMemoryConfig;
  mcp: MCPPipelineConfig;
  im: IMConnectorConfig[];
  webConsole: WebConsoleModule[];
  capabilities: CapabilityManifest[];
};

export const ESP_CLAW_PARITY_MODULES: AiNativeModuleId[] = [
  "agent_core",
  "capability_runtime",
  "event_router",
  "llm_lua_engine",
  "local_memory",
  "skills_manager",
  "mcp_server",
  "mcp_client",
  "im_platform",
  "web_console",
  "runtime_fs",
  "scheduler",
  "file_manager"
];

export const DEFAULT_RUNTIME_FS: RuntimeFileSystemLayout = {
  root: "/fatfs",
  sessionsDir: "/fatfs/sessions",
  memoryDir: "/fatfs/memory",
  skillsDir: "/fatfs/skills",
  scriptsDir: "/fatfs/scripts",
  routerRulesDir: "/fatfs/router_rules",
  schedulerDir: "/fatfs/scheduler",
  staticDir: "/fatfs/static",
  inboxDir: "/fatfs/inbox"
};

export const DEFAULT_WEB_CONSOLE_MODULES: WebConsoleModule[] = [
  "status",
  "chat",
  "settings_basic",
  "settings_llm",
  "settings_im",
  "settings_network_search",
  "memory",
  "capabilities",
  "lua_modules",
  "files",
  "scheduler",
  "router_rules",
  "skills"
];
