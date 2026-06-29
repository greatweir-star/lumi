# Device Templates

Device Template 后续必须从“硬件列表”升级为 Board Profile + Capability Map。

每个设备至少要描述：

- chip
- flash / psram
- supported runtime profiles
- supported firmware profiles
- capability map
- pin map
- peripheral map
- board manager adapter
- flashing strategy
- provisioning strategy
- maturity

首批仍以 ESP32-S3 生态为主，后续扩展 ESP32-P4、ESP32-C5、ESP32-S31、Raspberry Pi、nRF、STM32 和 Linux SBC。
