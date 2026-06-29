# LumiForge Agent C Runtime

LumiForge 的端侧核心是一个可运行在智能硬件上的轻量级 Agent Runtime。

本目录是纯 C 重构方向的起点：参考 ESP-Claw 和 MimiClaw 的能力边界，但不直接复制它们的源码。

## 设计目标

- 纯 C99，可移植到 ESP-IDF、FreeRTOS、裸机或 Linux host demo。
- 默认无动态内存分配，使用编译期容量上限。
- 事件驱动：按钮、IM、串口、定时、传感器、系统事件都进入同一个 Agent Loop。
- 工具调用：内置 Tool Registry，支持 ReAct 风格循环。
- Capability Registry：硬件能力、系统能力、网络能力、Memory、Scheduler、MCP、Lua、Skills 都注册成能力。
- 本地记忆抽象：通过 platform adapter 读写文件、NVS、SPIFFS、FATFS 或外部存储。
- 可接入 LLM Provider：OpenAI-style、Anthropic-style、Qwen、DeepSeek、自定义 endpoint。
- 可接入 IM Adapter：Telegram、QQ、飞书、微信、Local Console。

## 当前状态

当前先实现 host 可编译的最小 Agent Core：

- `lf_agent`：Agent 上下文、事件处理、LLM 回调、工具调用。
- `lf_event`：固定容量事件队列。
- `lf_capability`：固定容量 Capability Registry。
- `lf_tool`：固定容量工具注册和调用。
- `lf_memory`：本地记忆读写抽象。
- `lf_platform_stdio`：host demo 平台适配。

后续会把 ESP-IDF adapter、Wi-Fi、HTTP、Telegram、SPIFFS/FATFS、NVS、cron、heartbeat、MCP、Lua VM 分层接进来。
