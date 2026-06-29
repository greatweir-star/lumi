import { AgentStudioWizard } from "../../components/agent-studio-wizard";
import { agentTemplates, devices } from "../../lib/mock";

export default function StudioPage() {
  const defaultTemplate = agentTemplates[0];
  const defaultDevice = devices[0];

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links">
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/debugger">Device Debugger</a>
          <a href="/">返回首页</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">AI Native Agent Studio</div>
          <h1>配置设备端 Agent Runtime。</h1>
          <p className="lead">这里不是普通模板表单，而是 LumiForge 的核心工作台：硬件能力声明、Agent Loop、LLM/Lua 策略、事件路由、本地记忆、Skills、MCP、IM 通道、Web 控制台和固件灌装。</p>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">硬</div><div><h3>{defaultDevice.name}</h3><p>{defaultDevice.purchaseNotes}</p></div></div>
          <div className="step"><div className="step-num">模</div><div><h3>{defaultTemplate.name}</h3><p>{defaultTemplate.tagline}</p></div></div>
          <div className="step"><div className="step-num">核</div><div><h3>AI Native Runtime</h3><p>对齐 ESP-Claw：Agent Core、Capability Runtime、Event Router、Memory、Skills、MCP 与 Lua。</p></div></div>
        </div>
      </section>

      <AgentStudioWizard devices={devices} templates={agentTemplates} />
    </main>
  );
}
