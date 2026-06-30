import { getRuntimeFsPreviewPackage } from "../../lib/runtime-fs-package";

export default function RuntimeFsPage() {
  const runtimeFsPackage = getRuntimeFsPreviewPackage();
  const filesByKind = runtimeFsPackage.files.reduce<Record<string, number>>((acc, file) => {
    acc[file.kind] = (acc[file.kind] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/ai-native">AI Native Readiness</a>
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/datasets">Claw Dataset</a>
          <a href="/skills-lab">Skills Lab</a>
          <a href="/">首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">Runtime FS Package Compiler</div>
          <h1>把 Runtime Profile 编译成可灌装的设备文件包。</h1>
          <p className="lead">
            Runtime FS Package 是 Browser Flash 的前置产物：它把 Agent Config、Runtime Profile、Capabilities、Memory Seed、Skills Manifest、Router Rules、Scheduler 和设备身份整理成带 manifest 与 checksum 的文件列表。
          </p>
          <div className="actions">
            <a className="btn primary" href="/runtime">查看 Runtime Blueprint</a>
            <a className="btn" href="/ai-native">查看 AI Native 缺口</a>
            <a className="btn" href="/datasets">查看 Claw Dataset</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">{runtimeFsPackage.manifest.fileCount}</div><div><h3>Files</h3><p>本次预览包将写入设备 Runtime FS 的文件数。</p></div></div>
          <div className="step"><div className="step-num">{Math.ceil(runtimeFsPackage.manifest.totalSizeBytes / 1024)}KB</div><div><h3>Total Size</h3><p>预估写入 FATFS / SPIFFS 的配置与种子数据体积。</p></div></div>
          <div className="step"><div className="step-num">{runtimeFsPackage.manifest.checksum}</div><div><h3>Checksum</h3><p>用于后续烧录校验和失败回滚。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Package Manifest</h2><p>浏览器烧录和设备端校验都以 manifest 为准。</p></div></div>
        <div className="grid">
          <article className="card">
            <h3>{runtimeFsPackage.manifest.id}</h3>
            <p>{runtimeFsPackage.manifest.format} · {runtimeFsPackage.manifest.version}</p>
            <div className="tags"><span className="tag">root {runtimeFsPackage.manifest.root}</span><span className="tag">profile {runtimeFsPackage.manifest.runtimeProfileId}</span><span className="tag">{runtimeFsPackage.manifest.checksumAlgorithm}</span></div>
          </article>
          {Object.entries(filesByKind).map(([kind, count]) => (
            <article className="card" key={kind}>
              <h3>{kind}</h3>
              <p>{count} files</p>
              <div className="tags"><span className="tag">runtime-fs</span><span className="tag">compiled</span></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>Files to Write</h2><p>下一步 Browser Flash 会按这个列表写入设备文件系统。</p></div></div>
        <div className="grid">
          {runtimeFsPackage.files.map((file) => (
            <article className="card" key={file.path}>
              <h3>{file.path}</h3>
              <p>{file.kind}</p>
              <div className="tags"><span className="tag">{file.sizeBytes} bytes</span><span className="tag">{file.checksum}</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
