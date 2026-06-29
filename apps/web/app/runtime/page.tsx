import { getRuntimeModuleLabel, runtimeBlueprint } from "../../lib/runtime";

export default function RuntimePage() {
  const fsEntries = Object.entries(runtimeBlueprint.fileSystem);

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/studio">Agent Studio</a>
          <a href="/debugger">Device Debugger</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">Runtime Blueprint</div>
          <h1>{runtimeBlueprint.id}</h1>
          <p className="lead">
            这是 LumiForge 当前默认的 ESP-Claw Compatible Runtime Profile。它定义了设备端 Agent Runtime 的模块、文件系统、记忆、MCP、IM、Web Console 和 Capability Manifest。
          </p>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">M</div><div><h3>{runtimeBlueprint.modules.length} Runtime Modules</h3><p>{runtimeBlueprint.modules.map(getRuntimeModuleLabel).slice(0, 5).join("、")}...</p></div></div>
          <div className="step"><div className="step-num">C</div><div><h3>{runtimeBlueprint.capabilities.length} Capabilities</h3><p>System、Files、Scheduler、MCP、Lua、Skills、IM、Web Search。</p></div></div>
          <div className="step"><div className="step-num">F</div><div><h3>{runtimeBlueprint.fileSystem.root}</h3><p>sessions / memory / skills / scripts / router_rules / scheduler / static / inbox。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Runtime Modules</h2><p>对齐 ESP-Claw 的端侧 Agent Runtime 能力面。</p></div></div>
        <div className="grid">
          {runtimeBlueprint.modules.map((moduleId) => (
            <article className="card" key={moduleId}>
              <h3>{getRuntimeModuleLabel(moduleId)}</h3>
              <p>{moduleId}</p>
              <div className="tags"><span className="tag">enabled</span></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Capability Registry</h2><p>LLM、Lua、MCP 和 Web Console 都通过 Capability Manifest 访问能力。</p></div></div>
        <div className="grid">
          {runtimeBlueprint.capabilities.map((capability) => (
            <article className="card" key={capability.id}>
              <h3>{capability.name}</h3>
              <p>{capability.description}</p>
              <div className="tags">
                <span className="tag">{capability.category}</span>
                <span className="tag">{capability.tools.length} tools</span>
                <span className="tag">{capability.enabledByDefault ? "default on" : "default off"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Runtime File System</h2><p>后续真实烧录时会作为 Runtime FS Seed 写入设备。</p></div></div>
        <div className="panel">
          <div className="pipeline">
            {fsEntries.map(([key, value]) => (
              <div className="pipeline-item" key={key}><strong>{key}</strong><span>{value}</span></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
