# Codex 开发任务入口

## 当前目标

把灵机工坊从项目骨架推进到可演示 MVP。

## 优先任务

### Task 1：Agent Studio Wizard

实现 `apps/web/app/studio` 的多步骤表单：

1. 选择硬件
2. 选择 Agent 模板
3. 配置人设和模型
4. 配置语音和记忆
5. 选择技能
6. 生成部署预览

验收：可以通过前端创建一个项目，并调用 `POST /projects`。

### Task 2：Web Serial 设备连接

在前端新增 `apps/web/lib/web-serial.ts`：

- 检测浏览器是否支持 Web Serial
- 请求串口授权
- 打开串口
- 读取串口日志
- 关闭串口

验收：Chrome 中可以连接开发板并显示串口输出。

### Task 3：ESP32 烧录适配器

在 `packages/firmware-adapters` 中接入真实 ESP32 烧录库。

候选方案：

- esptool-js
- ESP Web Tools 相关能力
- 自定义 Web Worker 烧录流程

验收：可以选择 firmware manifest 并写入 ESP32-S3。

### Task 4：Device Debugger

新增 `/debugger` 页面：

- 串口日志
- 部署进度
- 设备在线状态
- 外设测试入口

验收：部署后自动跳转到 Debugger 页面。

### Task 5：固件 Manifest

新增 `templates/firmware/*.json`：

- 固件 id
- 支持硬件
- runtime 类型
- bootloader / partition / app offset
- sha256
- version

验收：API 可以根据硬件和模板返回可用固件 profile。
