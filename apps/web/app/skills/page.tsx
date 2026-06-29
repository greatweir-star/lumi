import { skillCatalog } from "../../lib/skills";

export default function SkillsPage() {
  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links"><a href="/capabilities">Capability Catalog</a><a href="/runtime">Runtime Blueprint</a><a href="/studio">Agent Studio</a><a href="/debugger">Device Debugger</a><a href="/">首页</a></div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">Skills Manager</div>
          <h1>以 SKILL.md 为入口的设备技能。</h1>
          <p className="lead">这里是 LumiForge 对 ESP-Claw Skills 能力的重构：Skill 是包含说明、权限、触发器、脚本、资源和生命周期的可安装包。</p>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{skillCatalog.length}</div><div><h3>Builtin Skills</h3><p>每日问候、按键对话、拍照问答、记忆采集、MCP 桥接器。</p></div></div>
          <div className="step"><div className="step-num">P</div><div><h3>Permission First</h3><p>每个 Skill 都要声明文件、网络、硬件、MCP、LLM、调度权限。</p></div></div>
          <div className="step"><div className="step-num">L</div><div><h3>Lifecycle</h3><p>安装、启用、停用、更新、卸载。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Skill Catalog</h2><p>当前是 mock catalog，下一步接入安装目录和 Runtime FS。</p></div></div>
        <div className="grid">
          {skillCatalog.map((skill) => (
            <article className="card" key={skill.id}>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
              <div className="tags"><span className="tag">{skill.entry}</span><span className="tag">{skill.trustLevel}</span><span className="tag">{skill.mvpStatus}</span></div>
              <div className="tags">{skill.permissions.map((permission) => <span className="tag" key={permission}>{permission}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
