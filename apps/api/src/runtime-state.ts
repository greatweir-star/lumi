export const mockRuntimeState = {
  device: {
    id: "dev_local_esp32s3",
    name: "ESP32-S3 DevKit",
    status: "online",
    firmware: "lumiforge-runtime-esp32s3@0.1.0",
    ip: "192.168.4.2",
    heapFree: "176 KB",
    uptime: "00:12:48"
  },
  eventRouter: [
    { id: "button.single_click", source: "button", action: "agent.chat.start", status: "enabled" },
    { id: "schedule.morning_greeting", source: "scheduler", action: "skill.daily_greeting", status: "enabled" },
    { id: "vision.photo_qa", source: "camera", action: "mcp.client.call", status: "draft" }
  ],
  files: [
    "/fatfs/memory/MEMORY.md",
    "/fatfs/memory/memory_records.jsonl",
    "/fatfs/skills/daily_greeting/SKILL.md",
    "/fatfs/scripts/button_chat.lua",
    "/fatfs/router_rules/router_rules.json",
    "/fatfs/scheduler/schedules.json"
  ],
  logs: [
    "[boot] LumiForge Runtime starting",
    "[capability] registered cap_system, cap_files, cap_mcp, cap_lua, cap_skill",
    "[memory] loaded /fatfs/memory/memory_index.json",
    "[mcp] server enabled with 9 exposed capabilities",
    "[router] loaded 3 event rules",
    "[agent] ready"
  ]
};
