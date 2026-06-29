import { clawPackages, computeClawStats } from "../../lib/claws";
import { compatibilityMatrix, skillTests } from "../../lib/dataset-assets";

export default function DatasetsPage() {
  const stats = computeClawStats();

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/capabilities">Capability Catalog</a>
          <a href="/skills">Skills Manager</a>
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/studio">Agent Studio</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">Claw Dataset</div>
          <h1>真正值钱的是适配数据。</h1>
          <p className="lead">
            LumiForge 的核心资产是高质量 Claw 数据集：每一个硬件 Claw 都记录 Board Profile、Capability Map、Runtime Profile、Skills、测试结果、质量评分和来源边界。
          </p>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{stats.claws}</div><div><h3>Total Claws</h3><p>当前仓库中的 Claw 适配包数量。</p></div></div>
          <div className="step"><div className="step-num">{skillTests.length}</div><div><h3>Skill Tests</h3><p>每个 Skill 都应该有跨硬件、跨 Runtime 的回归测试。</p></div></div>
          <div className="step"><div className="step-num">{compatibilityMatrix.length}</div><div><h3>Compatibility Rows</h3><p>硬件 × Runtime × Skill 的兼容矩阵。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Claw Packages</h2><p>每个 Claw 都必须记录来源、许可证和 clean-room rewrite 边界。</p></div></div>
        <div className="grid">
          {clawPackages.map((claw) => (
            <article className="card" key={claw.id}>
              <h3>{claw.name}</h3>
              <p>{claw.target.vendor ?? "Unknown"} · {claw.target.chip} · {claw.target.board}</p>
              <div className="tags"><span className="tag">{claw.kind}</span><span className="tag">{claw.quality.level}</span><span className="tag">score {claw.quality.score}</span><span className="tag">{claw.provenance.rewritePolicy}</span></div>
              <div className="tags">{claw.runtimeProfiles.map((profile) => <span className="tag" key={profile}>{profile}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Skill Test Dataset</h2><p>Skill 价值要通过测试集沉淀，不只靠描述。</p></div></div>
        <div className="grid">
          {skillTests.map((test) => (
            <article className="card" key={test.id}>
              <h3>{test.skillId}</h3>
              <p>{test.target.hardwareClaw} · {test.target.runtimeProfile}</p>
              <div className="tags"><span className="tag">{test.quality.priority}</span><span className="tag">{test.quality.status}</span><span className="tag">{test.target.chip}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Compatibility Matrix</h2><p>量产前最值钱的数据：哪些硬件、Runtime、Skill 组合可以跑。</p></div></div>
        <div className="grid">
          {compatibilityMatrix.map((row) => (
            <article className="card" key={row.id}>
              <h3>{row.runtimeProfile}</h3>
              <p>{row.hardwareClaw}</p>
              <div className="tags"><span className="tag">{row.status}</span><span className="tag">{row.skillIds.length} skills</span></div>
              <div className="tags">{Object.entries(row.coverage).slice(0, 5).map(([key, value]) => <span className="tag" key={key}>{key}:{value}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
