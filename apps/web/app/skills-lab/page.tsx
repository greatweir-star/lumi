import { computeSkillsLabStats, skillsLabPackages } from "../../lib/skills-lab";

export default function SkillsLabPage() {
  const stats = computeSkillsLabStats();

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/datasets">Claw Dataset</a>
          <a href="/skills">Skills Manager</a>
          <a href="/capabilities">Capability Catalog</a>
          <a href="/studio">Agent Studio</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">LumiForge Skills Lab</div>
          <h1>分享和发现设备端 Skills / Lua 脚本。</h1>
          <p className="lead">
            Skills Lab 是 LumiForge 的社区能力层：用于发现、分享、导入和验证 ESP-Claw / LumiForge 风格的 Skills、Lua 脚本与 Bundle，并把可靠结果沉淀到 Claw Dataset。
          </p>
          <div className="actions">
            <a className="btn primary" href="/skills">打开本地 Skills Manager</a>
            <a className="btn" href="/datasets">查看 Claw Dataset</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{stats.packages}</div><div><h3>Lab Packages</h3><p>社区 Skill、Lua、Bundle 和模板包。</p></div></div>
          <div className="step"><div className="step-num">{stats.luaScripts}</div><div><h3>Lua Scripts</h3><p>可动态加载到设备 Runtime 的本地脚本。</p></div></div>
          <div className="step"><div className="step-num">{stats.verified}</div><div><h3>Verified</h3><p>通过测试和兼容矩阵后升级。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Community Packages</h2><p>当前是内置种子数据，后续接在线社区源、搜索、评分、提交和审核。</p></div></div>
        <div className="grid">
          {skillsLabPackages.map((item) => (
            <article className="card" key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="tags"><span className="tag">{item.kind}</span><span className="tag">{item.quality.level}</span><span className="tag">score {item.quality.score}</span><span className="tag">{item.quality.testStatus}</span></div>
              <div className="tags">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Share Workflow</h2><p>从社区分享进入数据资产，需要经过权限、许可证、测试和兼容性校验。</p></div></div>
        <div className="pipeline">
          <div className="pipeline-item"><strong>Submit</strong><span>上传 SKILL.md、Lua、manifest、资源和测试。</span></div>
          <div className="pipeline-item"><strong>Parse</strong><span>解析入口、权限、依赖能力和 Runtime Profile。</span></div>
          <div className="pipeline-item"><strong>Review</strong><span>检查许可证、来源和 clean-room rewrite 边界。</span></div>
          <div className="pipeline-item"><strong>Test</strong><span>运行 Skill Tests，记录工具调用、记忆写入和延迟。</span></div>
          <div className="pipeline-item"><strong>Matrix</strong><span>写入硬件 × Runtime × Skill 兼容矩阵。</span></div>
          <div className="pipeline-item"><strong>Publish</strong><span>通过后进入 Skills Lab，持续积累安装量和评分。</span></div>
        </div>
      </section>
    </main>
  );
}
