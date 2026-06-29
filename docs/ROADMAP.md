# 《灵机工坊》开发路线图

## Milestone 0：项目骨架

状态：已完成首版。

- Monorepo 初始化
- Next.js 前端原型
- Fastify API 骨架
- Core 领域模型
- Agent Runtime 抽象
- Firmware Adapter 抽象
- 首批硬件模板
- 首批 Agent 模板

## Milestone 1：可演示 MVP

目标：能完整演示“选硬件 → 选模板 → 配 Agent → 创建项目 → 模拟部署”。

任务：

- Agent Studio 多步骤表单
- 前端调用 API 创建项目
- 推荐硬件接口接入页面
- 部署模拟进度条
- Debugger 页面占位

## Milestone 2：真实设备连接

目标：能通过浏览器连接真实 ESP32-S3 设备。

任务：

- Web Serial 连接封装
- 串口日志读取
- 串口断开和错误处理
- 浏览器兼容性提示
- 设备身份识别

## Milestone 3：真实烧录

目标：能刷写 ESP32-S3 固件。

任务：

- 接入 esptool-js 或 ESP Web Tools 能力
- 固件 manifest 管理
- bootloader / partition / app offset 配置
- 烧录进度和错误诊断
- ESP-Claw / xiaozhi 兼容固件 Profile

## Milestone 4：设备调试台

目标：让用户知道设备为什么失败、哪里需要处理。

任务：

- 串口日志面板
- Wi-Fi 状态
- 麦克风/扬声器/屏幕/按键自检
- Agent 对话测试
- 技能调用记录

## Milestone 5：项目持久化与模板市场

目标：支持真实用户项目保存和模板复用。

任务：

- PostgreSQL 数据模型
- 用户项目保存
- 私有模板和公开模板
- 固件版本管理
- OTA 任务模型
