# LumiForge Skills Lab

LumiForge Skills Lab 是平台能力的一部分，用来沉淀和分享 ESP-Claw / LumiForge 风格的 Skills 与 Lua 脚本。

它不是简单的插件市场，而是 Claw Dataset 的上层社区分发层。

## 核心对象

- Skill：以 `SKILL.md` 为入口的完整技能包。
- Lua Script：可被 Runtime 动态加载的本地脚本。
- Bundle：Skill + Lua + 资源 + 测试用例的组合包。
- Template：可一键生成项目的 Skill/Runtime/Board 组合。

## 每个包必须包含

- `id`
- `name`
- `kind`
- `description`
- `author`
- `entry`
- `assets`
- `compatibility.runtimeProfiles`
- `compatibility.hardwareClaws`
- `compatibility.requiredCapabilities`
- `quality.level`
- `quality.score`
- `quality.testStatus`
- `provenance.source`
- `provenance.license`
- `provenance.sharePolicy`

## 和 Claw Dataset 的关系

Skills Lab 负责社区发现和分享；Claw Dataset 负责可信适配、测试、评分和兼容矩阵。

一个 Skill / Lua 脚本只有进入 Claw Dataset 后，才算真正被 LumiForge 适配和验证。

## 分享流程

1. 用户提交 Skill / Lua / Bundle。
2. 平台解析 `SKILL.md`、manifest、Lua 脚本、资源文件。
3. 平台检查权限、入口、依赖能力和许可证。
4. 平台运行 Skill Tests。
5. 平台写入 Compatibility Matrix。
6. 通过后进入 Skills Lab 列表。
7. 被多个硬件 Claw 验证后升级为 verified / featured。

## 不直接复制原则

对于第三方 ESP-Claw Skills / Lua 脚本，LumiForge 只能记录来源和兼容性，不能直接复制不符合许可证的代码。需要进入平台的数据资产必须满足：

- 原作者授权；或
- 明确开源许可证允许；或
- clean-room rewrite；或
- 用户原创上传。
