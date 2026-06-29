# ESP-IDF Minimal App

这个示例把 LumiForge Agent C Runtime 作为 ESP-IDF component 接入，目标是验证端侧纯 C Agent 能在 ESP32 类硬件上进入最小 Agent Loop。

当前示例仍是骨架：

- 使用 `lf_agent` 创建 Agent 上下文。
- 注册 System / Memory / Scheduler 三个 Capability。
- 注册 heap_info / memory_write / get_current_time 三个内置 Tool。
- 使用 ESP-IDF platform adapter 输出日志、读写 `/fatfs` 风格路径。
- 后续接入 Wi-Fi、HTTP LLM、MCP、Lua 和真实外设。

## 本地构建方式

把本目录作为 ESP-IDF 项目打开：

```bash
cd firmware/lumiforge-agent-c/examples/esp_idf_minimal
idf.py set-target esp32s3
idf.py build
idf.py -p /dev/tty.usbmodemXXXX flash monitor
```

## 注意

这个示例还没有挂载 FATFS/SPIFFS 分区；如果要启用本地 memory 文件读写，需要先在项目里补 storage 分区和挂载逻辑。
