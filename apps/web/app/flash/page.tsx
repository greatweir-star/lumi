import { espWebToolsManifest, firmwareManifest, getFlashReadiness } from "../../lib/flash";

export default function FlashPage() {
  const readiness = getFlashReadiness();
  const parts = espWebToolsManifest.builds[0]?.parts ?? [];

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/ai-native">AI Native Readiness</a>
          <a href="/runtime-fs">Runtime FS</a>
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/datasets">Claw Dataset</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">Browser Flash Preview</div>
          <h1>把 Runtime FS 包接到浏览器烧录流程。</h1>
          <p className="lead">
            这里展示 LumiForge 固件 manifest 和 ESP Web Tools 预览 manifest。当前状态是 missing_binaries：还没有真实 bootloader、partition table、app binary 和 runtime-fs image，所以页面只做烧录计划预览，不开放真实写入。
          </p>
          <div className="actions">
            <a className="btn primary" href="/runtime-fs">查看 Runtime FS 包</a>
            <a className="btn" href="/ai-native">查看 AI Native 缺口</a>
            <a className="btn" href="/runtime">查看 Runtime Blueprint</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{readiness.status}</div><div><h3>Readiness</h3><p>只有所有 required artifacts 可用后，才允许真实烧录。</p></div></div>
          <div className="step"><div className="step-num">{readiness.available}/{readiness.required}</div><div><h3>Required Artifacts</h3><p>bootloader、partition、app、runtime-fs image 准备度。</p></div></div>
          <div className="step"><div className="step-num">{firmwareManifest.targetChip}</div><div><h3>Target Chip</h3><p>{firmwareManifest.flashSizeMB}MB Flash · {firmwareManifest.partitionScheme}</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>LumiForge Firmware Manifest</h2><p>平台自己的固件与灌装计划，包含 artifact 状态和 blocker。</p></div></div>
        <div className="grid">
          {firmwareManifest.artifacts.map((artifact) => (
            <article className="card" key={artifact.name}>
              <h3>{artifact.name}</h3>
              <p>{artifact.notes}</p>
              <div className="tags"><span className="tag">offset {artifact.offset}</span><span className="tag">{artifact.required ? "required" : "optional"}</span><span className="tag">{artifact.available ? "available" : "missing"}</span></div>
              <div className="tags"><span className="tag">{artifact.path}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>ESP Web Tools Preview Manifest</h2><p>后续可直接交给 ESP Web Tools / Web Serial writer 使用的烧录 parts 结构。</p></div></div>
        <div className="grid">
          {parts.map((part) => (
            <article className="card" key={`${part.path}-${part.offset}`}>
              <h3>{part.path}</h3>
              <p>offset {part.offset} / 0x{part.offset.toString(16)}</p>
              <div className="tags"><span className="tag">{espWebToolsManifest.builds[0].chipFamily}</span><span className="tag">preview</span></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Blockers</h2><p>这些完成前，不应该开放真实烧录按钮。</p></div></div>
        <div className="pipeline">
          {readiness.blockers.map((blocker) => <div className="pipeline-item" key={blocker}><strong>Blocked</strong><span>{blocker}</span></div>)}
        </div>
      </section>
    </main>
  );
}
