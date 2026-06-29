# 《灵机工坊 LumiForge》AI Native 技术架构设计 v0.2

## 1. 架构目标

LumiForge 的架构目标从“硬件开发平台”升级为“AI Native 端侧 Agent Runtime + 开发平台”。

必须同时满足：

1. 通过浏览器完成硬件连接、烧录、配置灌装和调试。
2. 在设备端运行 Agent Core、LLM+Lua、Event Router、Memory、Skills、MCP 和 Capability Runtime。
3. 支持 ESP-Claw compatible Runtime Profile，并逐步扩展到多硬件、多固件、多模板。
4. 平台侧提供 Agent Studio、Web Console、Device Debugger、模板市场和量产管理。

## 2. Monorepo 分层

```text
apps/web
  LumiForge Web Console / Agent Studio / Device Debugger。

apps/api
  Fastify API，负责设备、模板、Runtime Blueprint、项目、部署、调试状态。

packages/core
  领域模型：HardwareTarget、AgentTemplate、Project、Deployment。

packages/agent-runtime
  AI Native Runtime 抽象：Agent Core、Capability、Event Router、Memory、Skills、MCP、IM、Web Console、Runtime FS。

packages/firmware-adapters
  固件烧录和设备适配层：WebSerial ESP adapter、firmware manifest、runtime profile 灌装。

templates
  JSON 形式的硬件模板、Agent 模板、Runtime Profile、固件 Profile 和技能模板。
```

## 3. 核心架构

```text
LumiForge Platform
  ├─ Agent Studio
  ├─ Runtime Blueprint API
  ├─ Web Flash / Provisioning
  ├─ Device Debugger
  ├─ Skills / Template Marketplace
  └─ Device Ops / OTA

LumiForge Device Runtime
  ├─ Agent Core
  ├─ LLM + Lua Engine
  ├─ Event Router
  ├─ Capability Runtime
  ├─ Local Memory
  ├─ Skills Manager
  ├─ MCP Server / Client
  ├─ IM Platform
  ├─ Web Console
  └─ Runtime File System
```

## 4. 关键抽象

### HardwareTarget

描述硬件目标，包括芯片、Flash、PSRAM、能力、推荐场景、固件 Profile 和成熟度。

### AgentTemplate

描述应用模板，包括场景、必需能力、默认人设、唤醒词、技能列表、运行时依赖。

### AiNativeRuntimeBlueprint

描述一个可灌装到设备的 Runtime Profile，包括：

- modules
- fileSystem
- memory
- mcp
- im
- webConsole
- capabilities

### CapabilityManifest

统一描述硬件能力、系统能力、网络能力、IM、MCP、Lua、Skill、文件系统能力。每个 Capability 都需要声明工具、输入 Schema、是否对 LLM 可见、默认启停状态和依赖。

### RuntimeFileSystemLayout

默认对齐 `/fatfs` 结构：sessions、memory、skills、scripts、router_rules、scheduler、static、inbox。

### SkillPackageManifest

描述 Skill 包：SKILL.md、脚本、资源、权限、来源和信任等级。

### FirmwareAdapter

固件适配器接口，负责硬件支持判断、固件 Profile、烧录、Runtime FS 初始化、Agent Config 灌装。

## 5. 当前实现状态

- 前端：已升级首页和 Agent Studio 文案为 AI Native Runtime 定位。
- API：已有 devices、templates、recommendations、projects、deployments。
- Core：已有领域模型和硬件推荐评分。
- Runtime：新增 `AiNativeRuntimeBlueprint`、Capability、Memory、Skills、MCP、IM、Web Console、Runtime FS 类型。
- Firmware：已有 WebSerial ESP adapter skeleton，已将默认 runtime 命名改为 `lumiforge-runtime`。
- Docs：新增 AI Native MVP 定义和 ESP-Claw 能力对齐清单。

## 6. 下一阶段技术重点

1. 新增 Runtime Blueprint API。
2. 新增 ESP-Claw compatible Runtime Profile 模板。
3. 新增 Device Debugger 页面。
4. 实现 Web Serial 真机连接。
5. 接入 ESP32-S3 真实烧录。
6. 支持 Agent Config、Skills、Router Rules、Runtime FS 的部署单元。
7. 逐步实现 Web Console 的状态、聊天、设置、记忆、能力、Lua、文件管理模块。
