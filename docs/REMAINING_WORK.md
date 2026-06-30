# LumiForge Remaining Work

## 当前判断

LumiForge 已完成平台骨架、数据资产骨架、端侧 C Runtime 骨架、Skills Lab metadata import/review、Runtime FS Package Compiler、Browser Flash manifest preview 和 ESP-IDF demo build skeleton。

距离真正 AI Native 智能硬件平台，还需要完成以下闭环。

## P0：MVP 必须完成

### 1. 真实固件产物

- 跑通 `firmware/lumiforge-agent-c/examples/esp_idf_agent_demo` 的 ESP-IDF build。
- 产出 bootloader、partition-table、app binary。
- 将 artifact 标记从 `available: false` 改为真实文件或 release URL。

### 2. Runtime FS image

- 将 `pnpm runtime-fs:pack` 输出转换成 FATFS / SPIFFS image。
- 对齐 `runtimefs` 分区 offset `0x210000`。
- 生成 `/runtime/fs-package/image.bin`。

### 3. Browser Flash writer

- 接入 ESP Web Tools 或 esptool-js。
- 支持芯片识别、擦除、写入、校验、失败回滚。
- 当 readiness 不是 `ready_to_flash` 时禁止真实写入。

### 4. Device Debugger protocol

- 设计 Serial JSON-RPC 协议。
- 支持状态读取、日志读取、文件读取、文件写入、事件注入。
- Web Console 从 mock state 切到真实设备 state。

### 5. Event Router DSL

- 定义 router_rules schema。
- 实现 C Runtime 规则匹配器。
- 接入 button、timer、system event。

### 6. Local Memory structured store

- 实现 memory_records.jsonl append/search。
- 实现 memory_index.json 和 memory_digest。
- 加入隐私字段过滤。

### 7. LLM Provider adapter

- ESP-IDF HTTP client adapter。
- OpenAI-style / Qwen / DeepSeek provider config。
- prompt budget 和工具调用结果回灌。

### 8. Lua Engine

- 选型并集成 Lua VM。
- 实现 `lua_run_script` tool。
- 实现脚本权限、超时、日志、错误回传。

## P1：生态闭环

### 9. Skills Lab decision flow

- Review Queue 支持 approve / reject / require sandbox / clean-room rewrite。
- Approved package 转 Runtime FS install plan。
- Skill package versioning 和 signing。

### 10. MCP Server / Client

- Device tool manifest。
- MCP server transport。
- MCP client allowed server registry。
- 鉴权与权限边界。

### 11. IM Platform

- Local Chat 到设备事件。
- Telegram / Custom Webhook adapter。
- 消息写入 session 和 memory。

### 12. Claw Dataset pipeline

- `claw:new` 生成器。
- 真实硬件测试结果写回。
- Compatibility Matrix 自动更新。

## P2：量产运营

### 13. 数据库与用户项目

- PostgreSQL。
- 用户/团队/项目/设备模型。
- 项目持久化和模板复制。

### 14. OTA 与设备运营

- OTA manifest。
- 设备分组。
- 远程日志。
- 灰度发布。

## 粗略剩余工作量

以一个人快速推进的 MVP 口径：

- P0 可演示 MVP：约 8-12 个主要开发模块。
- P1 生态闭环：约 4-6 个主要开发模块。
- P2 量产运营：约 4-5 个主要开发模块。

最短路径不是先做运营，而是先完成：

```text
ESP-IDF build -> Runtime FS image -> Browser Flash writer -> Device Debugger protocol -> Event Router -> Memory -> LLM adapter -> Lua Engine
```
