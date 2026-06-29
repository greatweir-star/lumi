import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "灵机工坊 | 一站式智能硬件开发平台",
  description: "硬件选型、Agent 配置、一键烧录、在线调试、OTA、模板市场。"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
