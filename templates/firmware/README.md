# Firmware Profiles

固件 Profile 会描述浏览器烧录所需的二进制文件和地址。

后续结构：

```json
{
  "id": "lumiforge-esp32s3-devkit-v0.1.0",
  "targetChip": "ESP32-S3",
  "runtimeProfileId": "esp-claw-compatible",
  "artifacts": [
    { "name": "bootloader", "offset": "0x0", "url": "...", "sha256": "..." },
    { "name": "partition-table", "offset": "0x8000", "url": "...", "sha256": "..." },
    { "name": "app", "offset": "0x10000", "url": "...", "sha256": "..." },
    { "name": "storage", "offset": "0x...", "url": "...", "sha256": "..." }
  ]
}
```

真实烧录前必须确认具体分区表、offset 和固件来源。
