# 《灵机工坊 LumiForge》产品需求文档 PRD v0.2

## 1. 产品定位

灵机工坊英文名统一为 LumiForge。LumiForge 是 AI Native 一站式智能硬件开发平台，面向 AI 硬件创业者、独立开发者、方案商和内容型硬件产品团队，提供从硬件选型、端侧 Agent Runtime、能力配置、浏览器烧录、在线调试、OTA 到模板与技能市场的完整链路。

一句话：让开发者不用从 0 搭嵌入式系统，也能把具备 Agent Core、LLM+Lua、事件路由、本地记忆、Skills、MCP 和 Web Console 的智能体灌进真实硬件。

## 2. MVP 重定义

MVP 不能只是“创建项目 + 模拟部署”。MVP 必须以 AI Native Runtime 为核心，并复刻 ESP-Claw 的主要能力面。

MVP 基线能力：

- Agent Core：设备端 Agent Loop、上下文组装、工具调用、会话管理。
- LLM + Lua：LLM 动态决策，Lua 确定性本地规则执行。
- Event Router：按钮、传感器、视觉、语音、IM、定时、系统事件统一路由。
- Capability Runtime：硬件、系统、网络、IM、MCP、Lua、Skill、文件等能力统一注册和启停。
- Local Memory：本地结构化长期记忆、标签索引、用户画像、身份、灵魂文件。
- Skills：SKILL.md、脚本、资源、安装、启停、权限和市场化分发。
- MCP Server / Client：设备既能被外部 Agent 调用，也能主动调用外部服务。
- IM Platform：Local Chat、微信、QQ、飞书、Telegram、Custom Webhook 的接口层。
- Web Console：状态、聊天、设置、记忆、Capabilities、Lua 模块、文件、规则、调度、Skills。
- Runtime FS：sessions、memory、skills、scripts、router_rules、scheduler、static、inbox。

## 3. 目标用户

- AI 硬件创业者：需要快速做原型并验证可量产链路。
- 独立开发者：希望低门槛制作 AI 吧唧、桌宠、语音助手等设备。
- 方案商：需要更快交付客户项目，并沉淀可复用 Runtime 和模板。
- 内容/IP 团队：希望把角色、人格、内容做成可交互硬件周边。

## 4. 首批硬件

- ESP32-S3 屏幕开发板
- M5Stack CoreS3
- 小智 ESP32 语音硬件
- Seeed XIAO ESP32S3 Sense
- 后续扩展 ESP32-P4 / ESP32-C5 / ESP32-S31 / Raspberry Pi / nRF / STM32 / Linux SBC

## 5. 核心流程

1. 选择硬件或应用场景。
2. 平台生成硬件 Capability Map。
3. 选择或创建 Agent Runtime Profile。
4. 配置 Agent Core、LLM、Lua、Memory、Skills、MCP、IM 和 Web Console 模块。
5. 浏览器连接设备。
6. 一键烧录基础固件、Runtime FS、Agent Config、Skills、Router Rules 和设备身份。
7. 进入 Device Debugger / Web Console。
8. 观察事件路由、记忆、能力调用、Lua 执行和 MCP 调用。
9. 保存为项目、模板或量产 Profile。

## 6. MVP 验收标准

- 前端能展示 Runtime 配置矩阵和 ESP-Claw 能力对齐清单。
- API 能返回 Runtime Blueprint。
- 项目能生成 Agent Config、Capability Manifest、Memory Config、MCP Config、Web Console Modules。
- 部署单元包含固件 Profile、Agent Config、Skills、Router Rules、Runtime FS 初始化数据。
- Debugger 能查看模拟系统状态、事件路由、记忆、Capabilities、Skills 和文件系统。
- Web Serial 连接和 ESP32-S3 烧录是第一优先级工程任务。
