# LumiForge Dataset

LumiForge 未来最有价值的资产不是页面，也不是单个固件，而是高质量的智能硬件 Claw 数据集。

这里的 Claw 指一个可复用的智能硬件适配包，包含硬件能力、引脚、外设、固件、Runtime Profile、Skills、测试结果、兼容性说明和来源记录。

## 核心数据资产

1. Hardware Claw Dataset
   - 适配了多少真实硬件。
   - 每个硬件的 Board Profile、Pin Map、Peripheral Map、Capability Map、Flash Strategy、Provisioning Strategy。
   - 支持 ESP32-S3、ESP32-P4、ESP32-C5、M5Stack、小智、Seeed、树莓派、nRF、STM32、Linux SBC 等。

2. Runtime Claw Dataset
   - 每个硬件可运行哪些 Runtime：LumiForge Agent C、ESP-Claw compatible、MimiClaw compatible、xiaozhi compatible、Linux Runtime。
   - 每个 Runtime 的内存占用、Flash 占用、启动时间、能力覆盖、稳定性评分。

3. Skill Dataset
   - 每个 Skill 的 SKILL.md、权限声明、触发器、依赖能力、脚本、资源、测试用例。
   - Skill 是否可在不同硬件和 Runtime 上复用。

4. Compatibility Dataset
   - 硬件 × Runtime × Skill 的兼容矩阵。
   - 哪些组合能跑，哪些组合有缺陷，哪些组合需要降级能力。

5. Evaluation Dataset
   - 烧录成功率。
   - Runtime 启动成功率。
   - 事件响应延迟。
   - 内存占用。
   - 工具调用成功率。
   - Skills 回归测试结果。

6. Provenance Dataset
   - 每个 Claw 的来源、参考项目、作者、许可证、改写说明、不可直接拷贝的代码边界。
   - 确保 LumiForge 是能力重构和适配，不直接复制第三方代码。

## 数据集质量标准

一个合格的 Hardware Claw 至少需要包含：

- `claw.json`
- `board.profile.json`
- `capabilities.json`
- `pinmap.json`
- `peripherals.json`
- `runtime.profiles.json`
- `firmware.manifest.json`
- `skills.compatibility.json`
- `tests.json`
- `provenance.json`
- `README.md`

## 商业价值

当 LumiForge 沉淀了足够多高质量 Claw 后，平台价值会来自：

- 新硬件接入速度。
- 硬件选型推荐准确性。
- Skills 跨硬件复用能力。
- 量产前兼容性预测。
- 方案商交付效率。
- 设备端 Agent Runtime 的生态迁移能力。
