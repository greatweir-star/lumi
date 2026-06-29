# Hardware Test Results

本目录用于沉淀真实硬件测试结果。

LumiForge 的数据闭环是：

```text
Claw Package -> Skill Test Case -> Hardware Run -> Test Result -> Compatibility Matrix -> Quality Score
```

## 写入方式

先用 CLI 生成占位结果：

```bash
pnpm claw:write-result esp32s3-daily-greeting-001 passing
```

生成后补齐：

- hardwareClaw
- runtimeProfile
- skillId
- metrics.latencyMs
- metrics.flashKb
- metrics.ramKb
- metrics.bootMs
- metrics.passRate
- logs
- notes

## 质量升级规则

- `draft`：只有建档，没有真机结果。
- `bench_tested`：至少一块开发板本地通过。
- `field_tested`：至少两个真实场景测试通过。
- `production_ready`：具备稳定烧录、回归测试、异常恢复和 OTA 策略。
