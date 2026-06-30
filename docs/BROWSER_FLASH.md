# Browser Flash Preview

Browser Flash 是 LumiForge 从“生成配置”走向“灌进真实硬件”的关键链路。

当前阶段已经完成 manifest 层，不开放真实烧录。

## 已有内容

### LumiForge Firmware Manifest

```text
templates/firmware/esp32s3/lumiforge-runtime-esp32s3.firmware.json
```

包含：

- firmware id / version / target chip
- device targets
- flash size
- partition scheme
- bootloader / partition table / ota data / app / runtime-fs artifacts
- offset
- artifact available 状态
- blockers

### ESP Web Tools Preview Manifest

```text
templates/firmware/esp32s3/esp-web-tools.preview.json
```

包含：

- chipFamily
- parts
- path
- offset
- LumiForge 扩展字段 `x_lumiforge`

## API

```http
GET /flash/manifests
GET /flash/manifests/:id
GET /flash/esp-web-tools/:id
GET /flash/readiness/:id
```

## 页面

```text
http://localhost:3000/flash
```

## 当前 blocker

- ESP-IDF app binary has not been built.
- Runtime FS package has not been converted to a FATFS/SPIFFS image.
- Browser flash writer is still preview-only.

## 下一步

1. 创建 ESP-IDF minimal app build output。
2. 生成 bootloader / partition-table / app binary。
3. 将 Runtime FS Package 转换成 FATFS / SPIFFS image。
4. 接入 Web Serial / ESP Web Tools writer。
5. 增加 chip detection、erase、write、verify、configure、done/error 状态机。
