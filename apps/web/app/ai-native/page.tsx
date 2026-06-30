import { aiNativeReadiness, summarizeReadiness } from "../../lib/ai-native-readiness";

export default function AiNativePage() {
  const summary = summarizeReadiness();

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/datasets">Claw Dataset</a>
          <a href="/skills-lab">Skills Lab</a>
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/studio">Agent Studio</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">AI Native Readiness</div>
          <h1>距离真正 AI 原生，还差哪些关键能力？</h1>
          <p className="lead">{aiNativeReadiness.overallTarget}</p>
          <div className="actions">
            <a className="btn primary" href="/runtime">查看 Runtime Blueprint</a>
            <a className="btn" href="/datasets">查看 Claw Dataset</a>
            <a className="btn" href="/skills-lab">查看 Skills Lab</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{summary.averageScore}</div><div><h3>Average Score</h3><p>当前整体成熟度，低于 60 说明仍偏平台骨架。</p></div></div>
          <div className="step"><div className="step-num">{summary.p0}</div><div><h3>P0 Gaps</h3><p>影响 MVP 是否真正 AI 原生的关键缺口。</p></div></div>
          <div className="step"><div className="step-num">{summary.gaps}</div><div><h3>Hard Gaps</h3><p>还没有进入可运行闭环的能力模块。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Critical Path</h2><p>优先做这些，LumiForge 才能从“配置平台”变成“AI 原生智能硬件平台”。</p></div></div>
        <div className="grid">
          {summary.criticalPath.map((area) => (
            <article className="card" key={area.id}>
              <h3>{area.name}</h3>
              <p>{area.current}</p>
              <div className="tags"><span className="tag">{area.priority}</span><span className="tag">{area.status}</span><span className="tag">score {area.score}</span></div>
              <div className="tags">{area.missing.slice(0, 4).map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Readiness Matrix</h2><p>按 PRD/MVP 能力面拆解：目标、现状、缺口、下一步动作。</p></div></div>
        <div className="grid">
          {aiNativeReadiness.areas.map((area) => (
            <article className="card" key={area.id}>
              <h3>{area.name}</h3>
              <p>{area.target}</p>
              <div className="tags"><span className="tag">{area.priority}</span><span className="tag">{area.status}</span><span className="tag">score {area.score}</span></div>
              <p>{area.current}</p>
              <div className="tags">{area.nextActions.slice(0, 3).map((action) => <span className="tag" key={action}>{action}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
