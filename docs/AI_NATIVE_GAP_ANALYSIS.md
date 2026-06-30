# LumiForge AI Native Gap Analysis

## 结论

LumiForge 已经从“智能硬件开发平台壳”推进到“AI Native Runtime + Claw Dataset + Skills Lab”的产品架构，但距离真正 AI 原生还差三类闭环：

1. **端侧运行闭环**：Agent Core、LLM Provider、Lua Engine、Event Router、Memory、Tool Call 必须在真实设备上形成循环。
2. **设备灌装闭环**：浏览器连接、烧录、Runtime FS、Agent Config、Skills、Router Rules、设备身份必须能写入设备。
3. **数据资产闭环**：Claw、Skill、兼容矩阵、测试结果、Review Queue 必须能通过真实测试持续更新。

## 当前产品规划依据

PRD 定义 LumiForge 面向 AI 硬件创业者、独立开发者、方案商和内容型硬件产品团队，目标是提供从硬件选型、端侧 Agent Runtime、能力配置、浏览器烧录、在线调试、OTA 到模板与技能市场的完整链路。

MVP 不能只是创建项目和模拟部署，而必须以 AI Native Runtime 为核心，对齐 Agent Core、LLM+Lua、Event Router、Capability Runtime、Local Memory、Skills、MCP、IM、Web Console 和 Runtime FS。

## 当前最关键缺口

### P0：必须马上补齐

- Browser Flash / Provisioning：还没有真实 esptool-js / ESP Web Tools 烧录闭环。
- LLM + Lua Engine：端侧还没有 Lua VM、lua_run_script、脚本沙箱和异步脚本任务。
- Event Router：还没有完整规则 DSL、事件匹配器和硬件事件 adapter。
- Local Memory：还没有结构化 memory_records、index、digest、检索与隐私过滤。
- Runtime FS Deployment：还没有 FS package builder、manifest hash、写入设备和失败回滚。
- Web Console / Device Debugger：还缺真实设备协议和状态同步。

### P1：形成生态能力

- MCP Server / Client：需要 tool schema export、transport、安全鉴权。
- IM Platform：需要 Telegram/custom webhook、消息身份、离线队列。
- Skills Lab 转化流：从 review queue 到 approve/reject/sandbox/clean-room rewrite task。

### P2：量产运营

- PostgreSQL 项目持久化。
- 设备注册、分组、远程日志、OTA、灰度发布。
- 团队协作和权限。

## 新增工程落地

本分析已经落到代码中：

- `templates/runtime/ai-native-readiness.json`
- `packages/core/src/ai-native-readiness.ts`
- `apps/api/src/ai-native-routes.ts`
- `apps/web/app/ai-native/page.tsx`

对应 API：

```http
GET /ai-native/readiness
GET /ai-native/summary
GET /ai-native/critical-path
GET /ai-native/gaps
```

对应页面：

```text
http://localhost:3000/ai-native
```

## 下一阶段开发顺序

1. Runtime FS Package Compiler。
2. Browser Flash Manifest / ESP Web Tools 集成。
3. ESP-IDF Lua Adapter 和 `lua_run_script` tool。
4. Event Router DSL + C Runtime matcher。
5. Local Memory structured store。
6. Device Debugger JSON-RPC 协议。
7. Skills Lab Review Decision Flow。
