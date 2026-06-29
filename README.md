# 灵机工坊 LumiForge

LumiForge 是 AI Native 一站式智能硬件开发平台，目标不是做一个轻量烧录器，而是做可以下沉到设备端的 Agent Runtime + 开发控制台 + 模板/技能生态。

> Repo: `greatweir-star/lumi`

## MVP 定义

MVP 必须对齐 ESP-Claw 的完整能力面：

- Agent Core：设备端 Agent Loop、上下文组装、LLM 工具调用。
- LLM + Lua 混合引擎：动态决策 + 本地确定性规则。
- Event Router：事件总线、自动化规则、传感器/按钮/定时触发。
- Capability Runtime：硬件能力、网络能力、系统能力、IM、搜索、HTTP、文件、调度等统一注册。
- Local Memory：本地结构化长期记忆、标签索引、用户画像、身份和灵魂文件。
- Skills：SKILL.md、脚本、资源、技能安装、技能市场和生命周期管理。
- MCP Server / Client：设备对外暴露硬件能力，也能主动调用外部服务。
- Web Console：状态、聊天、系统设置、LLM、IM、搜索、记忆、Capabilities、Lua 模块、文件管理。
- Device Runtime FS：sessions、memory、skills、scripts、router_rules、scheduler、static、inbox。
- Browser Flash：浏览器烧录、配网、灌装 Agent 配置和技能包。

## 首批硬件

- ESP32-S3 屏幕开发板
- M5Stack CoreS3
- 小智 ESP32 语音硬件
- Seeed XIAO ESP32S3 Sense
- 后续扩展 ESP32-P4 / ESP32-C5 / ESP32-S31 / Raspberry Pi / nRF / STM32 / Linux SBC

## 目录

```text
apps/web                    LumiForge Web Console / Agent Studio
apps/api                    LumiForge API 服务骨架
packages/core               领域模型与推荐评分
packages/agent-runtime      AI Native Agent Runtime 抽象
packages/firmware-adapters  WebSerial/ESP 烧录适配抽象
templates                   设备、Agent、Runtime 模板数据
docs                        PRD、AI Native 架构、ESP-Claw 对齐清单、路线图
```

## 启动

```bash
pnpm install
pnpm dev
```

Web: `http://localhost:3000`  
API: `http://localhost:8787`
