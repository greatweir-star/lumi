# Runtime FS Package Compiler

Runtime FS Package Compiler 是 Browser Flash / Provisioning 的前置模块。它把 LumiForge 的 Runtime Deployment Unit 编译成可以写入设备文件系统的 manifest + files。

## 为什么需要它

AI Native 智能硬件不是只烧录一个固件。真实设备还需要被灌装：

- Runtime Profile
- Agent Config
- Capability Manifest
- MCP / IM / Web Console 配置
- Device Identity
- Local Memory Seed
- Skills Manifest
- Lua Scripts
- Router Rules
- Scheduler Config

这些内容必须有稳定路径、文件大小、checksum 和 manifest，后续才能支持浏览器烧录、写入校验、失败回滚和 OTA 差分。

## 生成内容

默认根目录：

```text
/fatfs
```

核心文件：

```text
/fatfs/.lumiforge/runtime-fs.manifest.json
/fatfs/.lumiforge/runtime_profile.json
/fatfs/.lumiforge/agent_config.json
/fatfs/.lumiforge/capabilities.json
/fatfs/.lumiforge/mcp.json
/fatfs/.lumiforge/im.json
/fatfs/.lumiforge/web_console.json
/fatfs/device/identity.json
/fatfs/memory/MEMORY.md
/fatfs/memory/memory_records.jsonl
/fatfs/memory/memory_index.json
/fatfs/memory/memory_digest.log
/fatfs/skills/skills.manifest.json
/fatfs/router_rules/rules.json
/fatfs/scheduler/scheduler.json
```

## API

```http
GET /runtime/fs-package/preview
GET /runtime/fs-package/manifest
GET /runtime/fs-package/files
```

## CLI

```bash
pnpm runtime-fs:pack
```

输出：

```text
dist/runtime-fs/manifest.json
dist/runtime-fs/files/**
```

## 当前限制

- 目前生成的是 preview package，还没有写入真实 ESP32 FATFS/SPIFFS。
- checksum 使用轻量 `fnv1a32`，适合 MVP 校验；后续可升级 SHA-256。
- 尚未支持二进制资源、压缩包、差分包、失败回滚和签名。
- Browser Flash 还没有接 esptool-js / ESP Web Tools。

## 下一步

1. 增加 firmware manifest，记录 bootloader / partition / app offset。
2. 将 Runtime FS Package 接入 Browser Flash UI。
3. 实现 Web Serial / ESP Web Tools 写入流程。
4. 增加写入校验和失败回滚。
5. 将 Skill Lab install plan 编译进 Runtime FS Package。
