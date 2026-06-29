# Changelog

## 2026-06-29

### Changed

- 英文名统一为 LumiForge。
- npm workspace scope 统一为 `@lumiforge/*`。
- MVP 从普通演示版升级为 AI Native Runtime 基线。
- README、PRD、Architecture、Roadmap、Codex 任务入口统一更新。

### Added

- `docs/AI_NATIVE_MVP.md`
- `docs/ESP_CLAW_PARITY.md`
- `docs/API.md`
- `docs/RUNTIME_DEPLOYMENT_UNIT.md`
- `docs/NAMING.md`
- `packages/agent-runtime/src/ai-native.ts`
- `packages/core/src/naming.ts`
- `templates/runtime/esp-claw-compatible.json`
- Runtime Blueprint API endpoints

### Runtime Scope

MVP 基线对齐 ESP-Claw：Agent Core、LLM+Lua、Event Router、Capability Runtime、Local Memory、Skills、MCP Server/Client、IM Platform、Web Console、Runtime FS、Browser Flash。
