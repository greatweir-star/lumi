# 《灵机工坊》技术架构设计 v0.1

## 1. 架构目标

灵机工坊需要同时满足三件事：

1. 让用户能用浏览器完成硬件连接、烧录和配置。
2. 让平台能抽象不同硬件、固件 Runtime 和 Agent 模板。
3. 让项目后续自然扩展到设备管理、OTA、日志诊断和模板市场。

## 2. Monorepo 分层

```text
apps/web
  Next.js 前端控制台，负责硬件中心、模板市场、Agent Studio、设备调试台。

apps/api
  Fastify API，负责设备数据、模板数据、项目数据、部署模拟和推荐算法。

packages/core
  领域模型：HardwareTarget、AgentTemplate、Project、Deployment。

packages/agent-runtime
  Agent 配置编译器和事件路由抽象。

packages/firmware-adapters
  固件烧录和设备适配层，先做 WebSerial ESP adapter skeleton。

templates
  JSON 形式的硬件模板和 Agent 模板。
```

## 3. 关键抽象

### HardwareTarget

描述一个硬件目标，包括芯片、Flash、PSRAM、能力、推荐场景、固件 Profile 和成熟度。

### AgentTemplate

描述一个应用模板，包括场景、必需能力、默认人设、唤醒词和技能列表。

### Project

用户创建的智能硬件项目，把具体硬件、Agent 模板、模型、语音、记忆和技能组合在一起。

### FirmwareAdapter

固件适配器接口，负责判断是否支持某硬件、列出可用固件、执行烧录或模拟烧录。

## 4. 当前实现状态

- 前端：已完成首页和 Agent Studio 原型。
- API：已完成 devices、templates、recommendations、projects、deployments。
- Core：已完成领域模型和硬件推荐评分。
- Runtime：已完成 Project → Agent Config 编译器。
- Firmware：已完成 WebSerial ESP adapter skeleton。

## 5. 下一阶段技术重点

1. Web Serial 真实连接。
2. esptool-js 或 ESP Web Tools 烧录链路。
3. 固件 manifest 与 offset 管理。
4. Agent Studio 多步骤表单。
5. Device Debugger 串口日志页面。
6. 项目持久化，从内存 Map 迁移到数据库。
