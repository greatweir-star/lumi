# ESP-IDF Port

这是 LumiForge Agent C Runtime 的 ESP-IDF 适配层。

目标不是复制 ESP-Claw 或 MimiClaw 源码，而是把 LumiForge 的纯 C Agent Core 接到 ESP-IDF 的系统能力上。

## 第一阶段能力

- ESP_LOG 日志输出。
- esp_timer 获取毫秒时间。
- FATFS / SPIFFS 文件读写适配。
- UART / WebSocket / HTTP 传输适配预留。
- Wi-Fi、NVS、HTTP Client、MCP、Lua VM 后续分层接入。

## 集成方式

把 `firmware/lumiforge-agent-c` 作为 ESP-IDF component 或 managed component 引入。

示例 component CMake：

```cmake
idf_component_register(
  SRCS
    "../../src/lf_agent.c"
    "../../src/lf_capability.c"
    "../../src/lf_event.c"
    "../../src/lf_memory.c"
    "../../src/lf_platform.c"
    "../../src/lf_tool.c"
    "lf_platform_espidf.c"
  INCLUDE_DIRS
    "../../include"
    "."
)
```

## 待实现

- `lf_espidf_platform_create`
- `lf_espidf_mount_storage`
- `lf_espidf_wifi_connect`
- `lf_espidf_http_llm_provider`
- `lf_espidf_mcp_transport`
- `lf_espidf_lua_engine`
