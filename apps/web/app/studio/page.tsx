import { agentTemplates, devices } from "../../lib/mock";

export default function StudioPage() {
  const defaultTemplate = agentTemplates[0];
  const defaultDevice = devices[0];

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊</a>
        <div className="nav-links"><a href="/">返回首页</a></div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">Agent Studio 原型</div>
          <h1>配置你的第一个 AI 硬件项目。</h1>
          <p className="lead">这里是后续要扩展的核心工作台：选择硬件、选择模板、配置人设、语音、记忆、技能、MCP 工具和部署参数。</p>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">硬</div><div><h3>{defaultDevice.name}</h3><p>{defaultDevice.purchaseNotes}</p></div></div>
          <div className="step"><div className="step-num">模</div><div><h3>{defaultTemplate.name}</h3><p>{defaultTemplate.tagline}</p></div></div>
          <div className="step"><div className="step-num">灌</div><div><h3>部署状态</h3><p>当前为交互原型，下一步接入 Web Serial 与 API。</p></div></div>
        </div>
      </section>

      <section>
        <div className="section-title"><div><h2>配置表单占位</h2><p>下一阶段将拆成 Project Wizard + Agent Config + Device Debugger 三个页面。</p></div></div>
        <div className="panel">
          <div className="pipeline">
            <div className="pipeline-item"><strong>人设</strong><span>{defaultTemplate.defaultPersona}</span></div>
            <div className="pipeline-item"><strong>唤醒词</strong><span>{defaultTemplate.defaultWakeWord ?? "无"}</span></div>
            <div className="pipeline-item"><strong>模型</strong><span>OpenAI / DeepSeek / Qwen / Ollama / Custom</span></div>
            <div className="pipeline-item"><strong>记忆</strong><span>关闭 / 会话 / 本地 / 云端</span></div>
            <div className="pipeline-item"><strong>技能</strong><span>{defaultTemplate.skills.map((skill) => skill.name).join("、")}</span></div>
            <div className="pipeline-item"><strong>部署</strong><span>固件 Profile + Agent Config + Device ID</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
