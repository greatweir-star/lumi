import { capabilityCatalog } from "../../lib/capability-catalog";

export default function CapabilitiesPage() {
  const groups = Array.from(new Set(capabilityCatalog.map((item) => item.group)));

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/studio">Agent Studio</a>
          <a href="/debugger">Device Debugger</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">ESP-Claw Capability Refactor</div>
          <h1>能力重构，不复制代码。</h1>
          <p className="lead">
            这里把 ESP-Claw 已有产品能力拆解为 LumiForge 自己的 Runtime 模块、Capability、API 和页面。每项能力都有来源参考、LumiForge 模块映射和 MVP 状态。
          </p>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{capabilityCatalog.length}</div><div><h3>Capability Items</h3><p>覆盖 Chat Creation、Event、Lua、Memory、MCP、Board、Flash、IM、Skills、Console。</p></div></div>
          <div className="step"><div className="step-num">{groups.length}</div><div><h3>Groups</h3><p>{groups.join(" / ")}</p></div></div>
          <div className="step"><div className="step-num">AI</div><div><h3>AI Native First</h3><p>所有能力都服务于设备端 Agent Runtime 和开发平台闭环。</p></div></div>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group}>
          <div className="section-title"><div><h2>{group}</h2><p>LumiForge Runtime capability group.</p></div></div>
          <div className="grid">
            {capabilityCatalog.filter((item) => item.group === group).map((item) => (
              <article className="card" key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="tags">
                  <span className="tag">{item.espClawReference}</span>
                  <span className="tag">{item.lumiForgeModule}</span>
                  <span className="tag">{item.mvpStatus}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
