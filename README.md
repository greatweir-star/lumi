# 灵机工坊 Lingji Workshop

一站式 AI 智能硬件开发平台：从硬件选型、Agent 配置、一键烧录、在线调试到 OTA 与模板发布。

> Repo: `greatweir-star/lumi`

## MVP

第一阶段聚焦 AI 陪伴类智能硬件：AI 吧唧、AI 桌宠、AI 语音助手、AI 情绪灯、AI 拍照识别助手。

首批硬件：ESP32-S3 屏幕开发板、M5Stack CoreS3、小智 ESP32 语音硬件、Seeed XIAO ESP32S3 Sense。

## 目录

```text
apps/web                 Next.js 前端控制台原型
apps/api                 Fastify API 服务骨架
packages/core            领域模型与推荐评分
packages/agent-runtime   Agent 配置编译与事件路由
packages/firmware-adapters WebSerial/ESP 烧录适配抽象
templates                设备与 Agent 模板数据
docs                     PRD、架构、路线图
```

## 启动

```bash
pnpm install
pnpm dev
```

Web: `http://localhost:3000`  
API: `http://localhost:8787`
