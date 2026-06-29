# LumiForge Skills Lab

LumiForge Skills Lab 是面向智能硬件 Agent 的 Skill / Lua 脚本社区市场。

它参考 ESP-Claw Skills Lab 的平台能力：用户可以发现、安装、分享 Skills / Lua 脚本；设备端可通过提示词或注册表同步安装 Skill；贡献者需要按照 Skill 规范组织 `SKILL.md`、`scripts/`、`references/`、`assets/`。

## 一等平台能力

Skills Lab 不是模板列表，而是 LumiForge 的长期数据资产之一：

- Skill Package Registry
- Lua Script Registry
- 安装提示词生成
- 安全审查和权限标注
- 兼容硬件 Claw 映射
- 兼容 Runtime Profile 映射
- 下载、收藏、评分、测试结果
- 社区贡献与许可证追踪

## 安全原则

第三方 Skill / Lua 脚本可能破坏设备文件系统或泄露凭据，因此 LumiForge 必须默认执行安全分层：

1. 未审查 Skill 只能 metadata-only 展示。
2. 安装前显示权限、文件列表、风险提示。
3. 高风险权限如 filesystem、network、credentials、shell、ota、gpio 写入必须显式标红。
4. 进入推荐区前至少需要 metadata check 和 sandbox test。
5. 来源、许可证、改写策略必须记录到 provenance。

## 包结构

一个 Skills Lab Package 至少包含：

- `SKILL.md`
- 可选 `scripts/*.lua`
- 可选 `references/*`
- 可选 `assets/*`
- metadata: category / tags / cap groups / peripherals
- security: permissions / risk / review status
- distribution: install prompt / bundle / registry sync

## 与 ESP-Claw 的兼容策略

- 支持读取 ESP-Claw Skill 规范中的 SKILL.md frontmatter。
- 支持 `{CUR_SKILL_DIR}` 路径语义。
- 支持 Lua 脚本位于 `scripts/`。
- 不直接复制第三方 Skill 内容，除非许可证和来源允许。
- 对 ESP-Claw Skills Lab 内容优先做 metadata import、compatibility mapping 和 clean-room rewrite。
