# ESP-IDF Agent Demo Build Plan

This document tracks the first firmware build path for LumiForge C Agent Runtime on ESP32-S3.

## Demo project

```text
firmware/lumiforge-agent-c/examples/esp_idf_agent_demo
```

## Files

```text
README.md
CMakeLists.txt
sdkconfig.defaults
partitions.csv
main/CMakeLists.txt
main/app_main.c
components/lumiforge_agent_c/CMakeLists.txt
```

## Build commands

```bash
cd firmware/lumiforge-agent-c/examples/esp_idf_agent_demo
idf.py set-target esp32s3
idf.py build
```

## Expected outputs

```text
build/bootloader/bootloader.bin
build/partition_table/partition-table.bin
build/lumiforge_esp_idf_agent_demo.bin
```

## Partition layout

```text
nvs       0x9000    0x5000
otadata   0xe000    0x2000
phy_init  0x10000   0x1000
factory   0x20000   0x1F0000
runtimefs 0x210000  0x5C0000
storage   0x7D0000  0x830000
```

## Browser Flash alignment

The firmware manifest is aligned with this partition table:

```text
bootloader       0x0000
partition-table  0x8000
ota-data         0xe000
app              0x20000
runtime-fs       0x210000
```

## Current limitations

- The app uses a stub LLM callback, not a real HTTP LLM provider.
- FATFS mounting is not implemented yet.
- Runtime FS Package is not yet converted into a FATFS/SPIFFS image.
- The Browser Flash UI is still preview-only and must remain blocked while binaries are missing.
