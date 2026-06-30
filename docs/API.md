# LumiForge API v0.2

## Health

```http
GET /health
```

## AI Native Readiness

```http
GET /ai-native/readiness
GET /ai-native/summary
GET /ai-native/critical-path
GET /ai-native/gaps
```

AI Native Readiness 用于持续追踪 LumiForge 与真正 AI 原生智能硬件平台之间的差距，包括 Agent Core、LLM+Lua、Event Router、Capability Runtime、Local Memory、Skills Lab、MCP、IM、Browser Flash、Claw Dataset 和设备运营。

## Devices

```http
GET /devices
GET /devices/:id
```

## Agent Templates

```http
GET /templates
GET /templates/:id
```

## Skills

```http
GET /skills
GET /skills/:id
```

## Skills Lab

```http
GET /skills-lab/packages
GET /skills-lab/packages/:id
GET /skills-lab/upstreams
GET /skills-lab/imports
GET /skills-lab/imports/:upstreamId
GET /skills-lab/review-queue
GET /skills-lab/review-queue/:id
GET /skills-lab/stats
GET /skills-lab/categories
GET /skills-lab/share-template
POST /skills-lab/packages
POST /skills-lab/packages/:id/install-plan
```

Skills Lab 是社区 Skill / Lua 市场。第三方包默认需要经过来源、许可证、权限、风险和兼容性检查后才能安装。

在线同步和审核工具：

```bash
pnpm skills-lab:sync
pnpm skills-lab:sync:sample
pnpm skills-lab:review
```

同步器只导入 `SKILL.md` 元数据、文件路径、标签和来源指针，不默认复制或执行第三方 Lua。审核器会根据 `datasets/skills-lab/review-rules.json` 生成 review queue。

## Claw Dataset

```http
GET /datasets/claws
GET /datasets/claws/:id
GET /datasets/skill-tests
GET /datasets/skill-tests/results
GET /datasets/compatibility
GET /datasets/stats
```

## Runtime

```http
GET /runtime/blueprints
GET /runtime/blueprint
GET /runtime/blueprint/:id
GET /runtime/capability-catalog
GET /runtime/capabilities
GET /runtime/filesystem
GET /runtime/web-console-modules
GET /runtime/state
GET /runtime/deployment-unit
GET /runtime/fs-package/preview
GET /runtime/fs-package/manifest
GET /runtime/fs-package/files
```

Runtime FS Package Compiler 会把 Runtime Profile、Agent Config、Capabilities、Memory Seed、Skills Manifest、Router Rules、Scheduler 和 Device Identity 编译成可写入设备文件系统的 manifest + files。

命令行导出：

```bash
pnpm runtime-fs:pack
```

输出目录：

```text
dist/runtime-fs
```

## Browser Flash

```http
GET /flash/manifests
GET /flash/manifests/:id
GET /flash/esp-web-tools/:id
GET /flash/readiness/:id
```

Browser Flash 当前提供固件 manifest、ESP Web Tools 预览 manifest、artifact readiness 和 blocker。真实 binary 缺失时必须保持 `missing_binaries`，不能开放真实写入。

## Recommendations

```http
GET /recommendations/:templateId
```

## Projects

```http
POST /projects
GET /projects
GET /projects/:id/agent-config
```

## Deployments

```http
POST /deployments
```

真实部署单元后续必须包含 firmware manifest、runtime profile、runtime fs seed、agent config、skills、skills lab packages、router rules、memory seed 和 device identity。
