"use client";

import { useMemo, useState } from "react";
import { WebSerialConnection } from "../lib/web-serial";

export function SerialConsole() {
  const [status, setStatus] = useState("idle");
  const [logs, setLogs] = useState<string[]>([
    "[hint] 在 Chrome/Edge 桌面版打开本页，连接 ESP32-S3 后点击连接串口。"
  ]);

  const connection = useMemo(
    () =>
      new WebSerialConnection(
        (line) => setLogs((current) => [...current.slice(-120), line]),
        (nextStatus) => setStatus(nextStatus)
      ),
    []
  );

  async function connect() {
    try {
      await connection.connect(115200);
    } catch (error) {
      setLogs((current) => [
        ...current,
        `[serial:error] ${error instanceof Error ? error.message : String(error)}`
      ]);
    }
  }

  async function disconnect() {
    try {
      await connection.disconnect();
    } catch (error) {
      setLogs((current) => [
        ...current,
        `[serial:error] ${error instanceof Error ? error.message : String(error)}`
      ]);
    }
  }

  async function ping() {
    try {
      await connection.write("\n");
      setLogs((current) => [...current, "[serial:write] newline"]);
    } catch (error) {
      setLogs((current) => [
        ...current,
        `[serial:error] ${error instanceof Error ? error.message : String(error)}`
      ]);
    }
  }

  return (
    <section className="panel">
      <div className="section-title" style={{ marginTop: 0 }}>
        <div>
          <h2>Web Serial Console</h2>
          <p>真机连接入口：先做串口日志，后续接入烧录和 Runtime FS 灌装。</p>
        </div>
        <span className="tag">{status}</span>
      </div>
      <div className="actions" style={{ marginTop: 0 }}>
        <button className="btn primary" onClick={connect}>连接串口</button>
        <button className="btn" onClick={ping}>发送换行</button>
        <button className="btn" onClick={disconnect}>断开</button>
      </div>
      <pre className="console-output">
        {logs.map((line, index) => `${String(index + 1).padStart(3, "0")} ${line}`).join("\n")}
      </pre>
    </section>
  );
}
