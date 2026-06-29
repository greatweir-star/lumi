# Skills

LumiForge 的 Skill 参考 ESP-Claw 的 Skills / Skills Lab 能力，但不复制实现。

每个 Skill 后续会落成目录结构：

```text
/skills/<skill_id>
  SKILL.md
  manifest.json
  /scripts
  /resources
```

Skill 必须声明：

- id / name / description
- entry: SKILL.md
- permissions
- triggers
- requiresCapabilities
- installSource
- trustLevel
- lifecycle: install / enable / disable / update / uninstall

当前 `skills.json` 是前端和 API 可读取的内置 Skill 目录。
