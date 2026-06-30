import { skillsLabImportSnapshot, skillsLabUpstreams } from "../../lib/skills-lab-imports";
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
            <a className="btn" href="/runtime">查看 Runtime</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{stats.packages}</div><div><h3>Lab Packages</h3><p>社区 Skill、Lua、Bundle 和模板包。</p></div></div>
          <div className="step"><div className="step-num">{skillsLabImportSnapshot.items.length}</div><div><h3>Imported Metadata</h3><p>来自上游 Skills Lab 的 metadata-only 导入。</p></div></div>
          <div className="step"><div className="step-num">{stats.unreviewed}</div><div><h3>Unreviewed</h3><p>未审查包默认只做 metadata-only，不直接安装。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Upstream Sources</h2><p>在线 Skills Lab 同步源，当前只做元数据导入。</p></div></div>
        <div className="grid">
          {skillsLabUpstreams.map((upstream) => (
            <article className="card" key={upstream.id}>
              <h3>{upstream.name}</h3>
              <p>{upstream.repository} · {upstream.branch} · {upstream.syncMode}</p>
              <div className="tags"><span className="tag">{upstream.type}</span><span className="tag">{upstream.licensePolicy}</span><span className="tag">metadata-only</span></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Community Packages</h2><p>当前是内置种子数据，后续接在线社区源、搜索、评分、提交和审核。</p></div></div>
        <div className="grid">
          {skillsLabPackages.map((item) => (
            <article className="card" key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="tags"><span className="tag">{item.source.type}</span><span className="tag">{item.quality.status}</span><span className="tag">score {item.quality.score}</span><span className="tag">risk {item.security.riskLevel}</span></div>
              <div className="tags">{item.skill.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="tags">{item.security.permissions.slice(0, 4).map((permission) => <span className="tag" key={permission}>{permission}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>ESP-Claw Metadata Imports</h2><p>仅导入 SKILL.md 元信息、文件路径和安全提示，不复制或执行第三方 Lua。</p></div></div>
        <div className="grid">
          {skillsLabImportSnapshot.items.map((item) => (
            <article className="card" key={item.id}>
              <h3>{item.title || item.name}</h3>
              <p>{item.description}</p>
              <div className="tags"><span className="tag">{item.upstreamSkillId}</span><span className="tag">{item.security.reviewStatus}</span><span className="tag">risk {item.security.riskLevel}</span></div>
              <div className="tags">{(item.metadata.tags ?? []).slice(0, 5).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="tags">{(item.metadata.cap_groups ?? []).map((cap) => <span className="tag" key={cap}>{cap}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Install Safety Gate</h2><p>第三方 Skill / Lua 必须先过来源、许可证、权限、风险和兼容性检查。</p></div></div>
        <div className="pipeline">
          <div className="pipeline-item"><strong>Import</strong><span>从 ESP-Claw Skills Lab 或社区源导入 metadata，不直接执行代码。</span></div>
          <div className="pipeline-item"><strong>Parse</strong><span>解析 SKILL.md frontmatter、cap groups、category、tags、peripherals。</span></div>
          <div className="pipeline-item"><strong>Review</strong><span>检查许可证、来源、权限、风险和 clean-room rewrite 边界。</span></div>
          <div className="pipeline-item"><strong>Sandbox</strong><span>在模拟器或测试设备上运行 Lua / Skill Tests。</span></div>
          <div className="pipeline-item"><strong>Matrix</strong><span>写入硬件 × Runtime × Skill 兼容矩阵。</span></div>
          <div className="pipeline-item"><strong>Publish</strong><span>通过后进入 Skills Lab，可生成安装提示词或同步包。</span></div>
        </div>
      </section>
    </main>
  );
}
