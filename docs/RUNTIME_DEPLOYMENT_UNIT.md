# LumiForge Runtime Deployment Unit

LumiForge 的部署单元不只是固件 bin，而是一组可复现、可审计、可版本化的运行时资产。

## 1. 部署单元组成

```text
Deployment Unit
  ├─ firmware manifest
  ├─ runtime profile
  ├─ runtime fs seed
  ├─ agent config
  ├─ capability manifest
  ├─ skills
  ├─ lua scripts
  ├─ router rules
  ├─ scheduler config
  ├─ memory seed
  └─ device identity
```

## 2. Runtime FS Seed

默认写入：

```text
/fatfs/sessions
/fatfs/memory/MEMORY.md
/fatfs/memory/memory_records.jsonl
/fatfs/memory/memory_index.json
/fatfs/memory/memory_digest.log
/fatfs/memory/user.md
/fatfs/memory/soul.md
/fatfs/memory/identity.md
/fatfs/skills
/fatfs/scripts
/fatfs/router_rules/router_rules.json
/fatfs/scheduler/schedules.json
/fatfs/static
/fatfs/inbox
```

## 3. MVP 验收

- API 的部署响应必须返回 runtime blueprint。
- Debugger 必须能展示 runtime fs 结构。
- 真机烧录阶段必须把 runtime fs seed 作为 storage 分区或设备初始化包写入。
