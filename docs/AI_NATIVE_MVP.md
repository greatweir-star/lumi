# LumiForge AI Native MVP 定义

## 1. 结论

LumiForge 的 MVP 不是普通的智能硬件模板平台，也不是在线烧录器。MVP 必须具备设备端 AI Native Runtime 的完整骨架，并对齐 ESP-Claw 的主要能力面。

MVP 目标：

> 通过浏览器完成固件烧录与配置灌装，让设备运行一个具备 Agent Core、LLM+Lua、Event Router、Capability Runtime、本地记忆、Skills、MCP 双向能力、IM 接入与 Web Console 的端侧智能体。

## 2. MVP 必须包含的运行时模块

### 2.1 Agent Core

- Agent Loop
- 会话管理
- 上下文组装
- 工具调用
- LLM 调用策略
- 云边协同策略
- 运行时状态机

### 2.2 LLM + Lua 混合引擎

- LLM 负责动态决策与生成行为逻辑。
- Lua 负责确定性、本地、毫秒级规则执行。
- 经确认的关键行为应固化为本地脚本或路由规则。

### 2.3 Event Router

- 统一事件总线。
- 支持按钮、传感器、摄像头、音频、IM、定时任务、系统事件。
- 支持本地规则匹配。
- 无本地规则时进入 Agent/LLM 决策。

### 2.4 Capability Runtime

能力统一抽象为 Capability Manifest：

- 硬件能力：屏幕、摄像头、音频、按钮、GPIO、I2C、UART、ADC、触摸、灯带、电量计、IMU、红外等。
- 系统能力：时间、重启、内存、网络状态、文件系统。
- 网络能力：HTTP 请求、Web Search。
- Agent 能力：Skill 管理、路由管理、子 Agent 管理、LLM 图像分析。
- MCP 能力：MCP Server / MCP Client。
- Lua 能力：Lua Runtime 与 Lua 模块管理。

### 2.5 Local Memory

- 本地结构化长期记忆。
- JSONL 记忆记录。
- 标签/关键词索引。
- 人类可读记忆文件。
- 用户画像、身份、灵魂文件。
- 支持本地刷新、检索和导出。

### 2.6 Skills

- Skill 以 SKILL.md 为入口。
- Skill 可以包含脚本和资源。
- Skill 应声明依赖、权限、触发方式和适用硬件。
- 平台需要支持安装、卸载、启用、禁用、更新和安全审查。

### 2.7 MCP Server / Client

- 设备作为 MCP Server，对外暴露自身硬件与 Agent 能力。
- 设备作为 MCP Client，主动调用外部工具和服务。
- LumiForge 平台需要管理 MCP 工具权限、白名单和调用日志。

### 2.8 IM Platform

MVP 至少设计接口，逐步实现：

- Local Chat
- 微信
- QQ
- 飞书
- Telegram
- Custom Webhook

### 2.9 Web Console

Web Console 不是可选项，MVP 必须包含信息架构：

- 系统状态
- 在线聊天
- 基础设置
- LLM 设置
- IM 设置
- 网络和搜索设置
- 记忆管理
- Capabilities 管理
- Lua 模块管理
- 文件管理
- Scheduler
- Router Rules
- Skills 管理

### 2.10 Runtime File System

默认文件系统布局：

```text
/fatfs
  /sessions
  /memory
    MEMORY.md
    memory_records.jsonl
    memory_index.json
    memory_digest.log
    user.md
    soul.md
    identity.md
  /skills
    /skill_id
      SKILL.md
      /scripts
  /scripts
  /router_rules
  /scheduler
  /static
  /inbox
```

## 3. MVP 交付标准

第一版演示不以“能创建项目”为终点，而以“能证明 AI Native Runtime 能被配置、灌装和调试”为终点。

最低验收：

1. 前端能展示 AI Native Runtime 配置矩阵。
2. API 能返回 Runtime Blueprint。
3. 项目能生成 Agent Config、Capability Manifest、Memory Config、MCP Config、Web Console Modules。
4. 烧录流程能把 Runtime Profile、Agent Config、Skills 和 Router Rules 作为部署单元。
5. Debugger 能查看模拟的系统状态、事件路由、记忆、Capabilities、Skills 和文件系统。
6. 后续接入 ESP32-S3 真机后，优先复刻 ESP-Claw 的 edge_agent 能力。
