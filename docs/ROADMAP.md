# 《灵机工坊 LumiForge》开发路线图

## Milestone 0：命名与架构校准

状态：已完成。

- 英文名统一为 LumiForge。
- npm workspace scope 统一为 `@lumiforge/*`。
- README / PRD / 前端文案升级为 AI Native Runtime 定位。
- 新增 `AiNativeRuntimeBlueprint`、Capability、Memory、Skills、MCP、IM、Web Console、Runtime FS 类型抽象。
- 新增 ESP-Claw 能力对齐清单。

## Milestone 1：AI Native Runtime Blueprint API

目标：让平台能返回完整 Runtime Blueprint，而不是只返回设备和模板。

任务：

- 新增 `/runtime/blueprint` API。
- 新增 `/runtime/capabilities` API。
- 新增 `/runtime/filesystem` API。
- 新增 `/runtime/web-console-modules` API。
- 新增 Runtime Profile 模板数据。
- Agent Studio 显示 Runtime 配置矩阵。

验收：前端可以看到 Agent Core、Capability Runtime、Event Router、LLM+Lua、Memory、Skills、MCP、IM、Web Console、Runtime FS 的完整配置面。

## Milestone 2：ESP-Claw Compatible Runtime Profile

目标：复刻 ESP-Claw 的能力面，形成 `esp-claw-compatible` Profile。

任务：

- Agent Core 配置结构。
- Capability Registry。
- Event Router Rules。
- Local Memory 文件布局。
- Skills 包结构。
- MCP Server / Client 配置。
- IM 平台配置。
- Web Console 信息架构。
- Runtime FS 初始化包。

验收：部署单元不再只是固件，而是 Firmware + Runtime FS + Agent Config + Skills + Router Rules + Memory Seed。

## Milestone 3：Web Console / Device Debugger

目标：在平台侧实现 ESP-Claw Web 控制台能力的开发者版本。

任务：

- 系统状态页。
- 在线聊天页。
- 基础设置页。
- LLM 设置页。
- IM 设置页。
- 网络与搜索设置页。
- 记忆管理页。
- Capabilities 管理页。
- Lua 模块管理页。
- 文件管理页。
- Scheduler / Router Rules / Skills 管理页。

验收：即使还没连真机，也能通过模拟 runtime state 展示完整调试体验。

## Milestone 4：真实设备连接

目标：通过浏览器连接真实 ESP32-S3 设备。

任务：

- Web Serial 连接封装。
- 串口日志读取。
- 串口断开和错误处理。
- 浏览器兼容性提示。
- 设备身份识别。

## Milestone 5：真实烧录与灌装

目标：能刷写 ESP32-S3 固件，并灌装 Runtime Profile。

任务：

- 接入 esptool-js 或 ESP Web Tools 能力。
- 固件 manifest 管理。
- bootloader / partition / app offset 配置。
- Runtime FS 初始化包写入。
- Agent Config 写入。
- Skills / Lua / Router Rules 写入。
- 烧录进度和错误诊断。

## Milestone 6：Skills / Lua / MCP 生态

目标：LumiForge 从开发工具升级为智能硬件 Agent 生态平台。

任务：

- Skills Marketplace。
- Lua 脚本管理。
- Capability 权限模型。
- MCP 工具目录。
- Skill 安全审查和信任等级。
- 模板发布、复制和版本管理。

## Milestone 7：量产与设备运营

目标：支持硬件团队使用 LumiForge 做小批量量产和设备运营。

任务：

- PostgreSQL 数据模型。
- 用户项目保存。
- 批量烧录。
- OTA 任务模型。
- 设备分组。
- 远程日志。
- 灰度发布。
- 团队协作和权限。
