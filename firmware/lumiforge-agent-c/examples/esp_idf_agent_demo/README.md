# LumiForge ESP-IDF Agent Demo

This example is the first real ESP-IDF app skeleton for the LumiForge C Agent Runtime.

It is designed to produce the binary artifacts needed by the Browser Flash manifest:

- `bootloader.bin`
- `partition-table.bin`
- `lumiforge_esp_idf_agent_demo.bin`
- future `runtime_fs.bin`

## Status

Current status: **build skeleton only**.

It wires the LumiForge pure-C Agent Core into an ESP-IDF app and uses the ESP-IDF platform adapter for logging, time, storage and transport callbacks. It does not yet include Wi-Fi, HTTP LLM provider, Lua VM, WebSocket debugger or Runtime FS image generation.

## Build

```bash
cd firmware/lumiforge-agent-c/examples/esp_idf_agent_demo
idf.py set-target esp32s3
idf.py build
```

Expected build outputs after a successful ESP-IDF build:

```text
build/bootloader/bootloader.bin
build/partition_table/partition-table.bin
build/lumiforge_esp_idf_agent_demo.bin
```

## Flash later

Once binaries are available, the Browser Flash manifest can point to these build artifacts or to published release URLs.

The Runtime FS image is still a separate next step and should be generated from `pnpm runtime-fs:pack` plus a FATFS/SPIFFS image builder.
