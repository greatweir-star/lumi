# LumiForge × ESP-Claw 能力对齐清单

## 1. 对齐原则

LumiForge 不直接复制 ESP-Claw 的源码实现，而是复刻其产品能力面与运行时架构，并扩展为多硬件、多固件、多模板平台。

## 2. 能力矩阵

| ESP-Claw 能力 | LumiForge MVP 对齐方式 | 状态 |
|---|---|---|
| Chat Coding / 聊天造物 | Agent Studio + 对话式行为生成 + Router/Lua 固化 | 设计中 |
| LLM + Lua 混合引擎 | `llm_lua_engine` Runtime Module | 类型抽象已建 |
| Agent Core | `agent_core` Runtime Module | 类型抽象已建 |
| Capability Runtime | Capability Manifest + Registry | 类型抽象已建 |
| Event Router | 事件总线 + Router Rules | 类型抽象已建 |
| Local Memory | 本地 JSONL 记忆、索引、用户画像、身份、灵魂文件 | 类型抽象已建 |
| RAMFS / FATFS Layout | Runtime FS Blueprint | 类型抽象已建 |
| Skills Manager | Skill Package Manifest + lifecycle | 类型抽象已建 |
| Skills Lab | LumiForge Skills/Template Marketplace | 规划中 |
| MCP Server | 设备对外暴露硬件与 Agent 能力 | 类型抽象已建 |
| MCP Client | 设备调用外部 MCP 服务 | 类型抽象已建 |
| IM Platform | Local / WeChat / QQ / Feishu / Telegram / Custom | 类型抽象已建 |
| Web Console | 状态、聊天、设置、记忆、能力、Lua、文件、调度、规则、Skills | 信息架构已建 |
| Browser Flash | WebSerial + firmware manifest + runtime profile | 适配器骨架已建 |
| Board Manager | HardwareTarget + board profile + capability map | 部分完成 |
| Lua Modules | Lua module manifest + enable/disable | 规划中 |
| cap_files | File manager capability | 类型抽象已建 |
| cap_scheduler | Scheduler capability | 类型抽象已建 |
| cap_http_request | HTTP request capability | 规划中 |
| cap_web_search | Web search capability | 规划中 |
| cap_system | System info / reboot capability | 规划中 |
| cap_llm_inspect | Vision / image analysis capability | 规划中 |

## 3. LumiForge 相比 ESP-Claw 的扩展

ESP-Claw 当前重点是乐鑫芯片上的 Agent Runtime。LumiForge 要在此基础上扩展为平台：

1. 多硬件适配：ESP32、M5Stack、小智、Seeed、树莓派、nRF、STM32、Linux SBC。
2. 多 Runtime：ESP-Claw compatible、xiaozhi compatible、LumiForge Runtime、Linux Runtime。
3. 多模板：Agent 模板、硬件模板、技能模板、固件模板、外设模板。
4. 开发控制台：项目管理、部署管理、调试台、模板市场、权限与团队协作。
5. 量产链路：批量烧录、OTA、设备分组、日志诊断、版本灰度。

## 4. 近期开发优先级

1. Runtime Blueprint API。
2. Agent Studio Runtime 配置矩阵。
3. Device Debugger 信息架构。
4. Web Serial 真机连接。
5. ESP32-S3 固件 Manifest。
6. ESP-Claw compatible profile。
7. Skills / Lua / Router Rules 文件灌装。
