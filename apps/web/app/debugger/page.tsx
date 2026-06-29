import { SerialConsole } from "../../components/serial-console";
import { mockRuntimeState, runtimeBlueprint } from "../../lib/runtime";

export default function DebuggerPage() {
  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/studio">Agent Studio</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">Device Debugger / Web Console</div>
          <h1>调试端侧 Agent Runtime。</h1>
          <p className="lead">
            这里复刻 ESP-Claw Web Console 的开发者视角：系统状态、串口日志、Capabilities、Memory、Skills、Router Rules、Runtime FS 和 MCP 状态。
            当前先用 mock runtime state 展示信息架构，并接入 Web Serial 真机日志。
          </p>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">D</div><div><h3>{mockRuntimeState.device.name}</h3><p>{mockRuntimeState.device.status} · {mockRuntimeState.device.firmware}</p></div></div>
          <div className="step"><div className="step-num">IP</div><div><h3>{mockRuntimeState.device.ip}</h3><p>Heap Free {mockRuntimeState.device.heapFree} · Uptime {mockRuntimeState.device.uptime}</p></div></div>
          <div className="step"><div className="step-num">R</div><div><h3>{runtimeBlueprint.id}</h3><p>{runtimeBlueprint.modules.length} modules · {runtimeBlueprint.capabilities.length} capabilities</p></div></div>
        </div>
      </section>

      <SerialConsole />

      <section>
        <div className="section-title"><div><h2>Runtime Logs</h2><p>模拟设备启动和运行时注册过程。</p></div></div>
        <div className="panel">
          <pre className="console-output">{mockRuntimeState.logs.join("\n")}</pre>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Event Router Rules</h2><p>按钮、定时、视觉、IM、传感器等事件会先经过本地规则，再进入 Agent/LLM。</p></div></div>
        <div className="grid">
          {mockRuntimeState.eventRouter.map((rule) => (
            <article className="card" key={rule.id}>
              <h3>{rule.id}</h3>
              <p>{rule.source} → {rule.action}</p>
              <div className="tags"><span className="tag">{rule.status}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Runtime FS</h2><p>后续会变成真实设备文件浏览器和 Runtime FS Seed 管理器。</p></div></div>
        <div className="panel">
          <pre className="console-output">{mockRuntimeState.files.join("\n")}</pre>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Web Console Modules</h2><p>状态、聊天、设置、记忆、能力、Lua、文件、调度、规则和 Skills。</p></div></div>
        <div className="grid">
          {runtimeBlueprint.webConsole.map((moduleId) => (
            <article className="card" key={moduleId}>
              <h3>{moduleId}</h3>
              <p>Web Console module placeholder</p>
              <div className="tags"><span className="tag">enabled</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
