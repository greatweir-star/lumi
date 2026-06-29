import { agentTemplates, devices } from "../../lib/mock";

export default function StudioPage() {
  const defaultTemplate = agentTemplates[0];
  const defaultDevice = devices[0];

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"><div className="logo" /> 灵机工坊 LumiForge</a>
        <div className="nav-links"><a href="/">返回首页</a></div>
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

      <section>
        <div className="section-title"><div><h2>Runtime 配置矩阵</h2><p>MVP 要覆盖端侧 Agent 的完整能力面，而不是只做创建项目和模拟部署。</p></div></div>
        <div className="panel">
          <div className="pipeline">
            <div className="pipeline-item"><strong>Agent Core</strong><span>上下文组装、工具调用、会话、LLM/Lua 决策策略。</span></div>
            <div className="pipeline-item"><strong>Capability</strong><span>硬件能力、网络能力、IM、文件、搜索、HTTP、系统工具。</span></div>
            <div className="pipeline-item"><strong>Event Router</strong><span>事件总线、规则匹配、自动化、传感器与触发器。</span></div>
            <div className="pipeline-item"><strong>Memory</strong><span>本地结构化长期记忆、标签索引、用户画像、身份和灵魂文件。</span></div>
            <div className="pipeline-item"><strong>Skills</strong><span>SKILL.md、脚本、资源、技能安装、权限和生命周期。</span></div>
            <div className="pipeline-item"><strong>MCP</strong><span>设备既是 MCP Server，也能作为 MCP Client 调用外部服务。</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
