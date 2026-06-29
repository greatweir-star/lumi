# Codex 开发任务入口

## 当前目标

把 LumiForge 从普通项目骨架升级为 AI Native 智能硬件开发平台。MVP 的基线不是“创建项目 + 模拟部署”，而是复刻 ESP-Claw 的主要能力面：Agent Core、LLM+Lua、Event Router、Capability Runtime、Local Memory、Skills、MCP Server/Client、IM Platform、Web Console、Runtime FS 和 Browser Flash。

## 必读文档

1. `docs/AI_NATIVE_MVP.md`
2. `docs/ESP_CLAW_PARITY.md`
3. `docs/ARCHITECTURE.md`
4. `docs/ROADMAP.md`

## 优先任务

### Task 1：Runtime Blueprint API

新增 API：

- `GET /runtime/blueprint`
- `GET /runtime/capabilities`
- `GET /runtime/filesystem`
- `GET /runtime/web-console-modules`

验收：API 返回 `AiNativeRuntimeBlueprint`，覆盖 Agent Core、Capability Runtime、Event Router、LLM+Lua、Memory、Skills、MCP、IM、Web Console、Runtime FS。

### Task 2：ESP-Claw Compatible Runtime Profile

新增 `templates/runtime/esp-claw-compatible.json`：

- modules
- fileSystem
- memory
- mcp
- im
- webConsole
- capabilities

验收：Runtime Profile 可以作为部署单元的一部分被 API 读取。

### Task 3：Agent Studio Runtime 配置矩阵

升级 `apps/web/app/studio`：

- Runtime Modules
- Capability Registry
- Memory Config
- Skills Config
- MCP Config
- IM Config
- Web Console Modules
- Runtime FS Preview

验收：前端不再只是项目创建表单，而是 Runtime 配置工作台。

### Task 4：Device Debugger / Web Console

新增 `/debugger` 页面：

- 系统状态
- 在线聊天
- LLM 设置
- IM 设置
- 网络与搜索设置
- 记忆管理
- Capabilities 管理
- Lua 模块管理
- 文件管理
- Scheduler
- Router Rules
- Skills 管理

验收：通过 mock runtime state 可展示完整调试体验。

### Task 5：Web Serial 设备连接

新增 `apps/web/lib/web-serial.ts`：

- 检测浏览器是否支持 Web Serial
- 请求串口授权
- 打开串口
- 读取串口日志
- 关闭串口

验收：Chrome 中可以连接 ESP32-S3 开发板并显示串口输出。

### Task 6：ESP32 真实烧录与灌装

在 `packages/firmware-adapters` 中接入真实 ESP32 烧录库。

候选方案：

- esptool-js
- ESP Web Tools 相关能力
- 自定义 Web Worker 烧录流程

验收：可以写入 bootloader、partition、app 固件，并灌装 Runtime FS、Agent Config、Skills、Router Rules。
