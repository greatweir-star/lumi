import { DeviceCard } from "../components/device-card";
import { TemplateCard } from "../components/template-card";
import { agentTemplates, devices } from "../lib/mock";

const pipeline = [
  ["AI Native Runtime", "设备端 Agent Loop、LLM+Lua、事件路由、本地记忆、Skills 和 MCP 双向互联。"],
  ["硬件能力声明", "通过 Capability Registry 描述屏幕、摄像头、音频、传感器、GPIO、网络与外部服务。"],
  ["聊天造物", "用自然语言生成规则、脚本、技能和设备行为，并将关键逻辑固化到本地。"],
  ["一键灌装", "浏览器串口识别设备，写入固件、运行时、设备 ID、Agent 配置与技能包。"],
  ["在线调试", "查看串口日志、系统状态、Capabilities、Lua 模块、文件系统、记忆和技能调用。"],
  ["生态发布", "发布硬件模板、Agent 模板、Skills、Lua 脚本、固件 Profile 和量产烧录包。"]
];

export default function HomePage() {
  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand"><div className="logo" /> 灵机工坊 LumiForge</div>
        <div className="nav-links">
          <a href="#devices">硬件中心</a>
          <a href="#templates">模板市场</a>
          <a href="#pipeline">AI Native 架构</a>
          <a href="/studio">Agent Studio</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">AI Native 智能硬件开发平台</div>
          <h1>把 Agent 运行时，灌进真实硬件。</h1>
          <p className="lead">
            LumiForge 不做轻量烧录器，而是做设备端 AI Native Runtime：Agent Loop、LLM+Lua、事件驱动、本地结构化记忆、MCP Server/Client、Skills、IM 接入和 Web 控制台。
            MVP 目标对齐 ESP-Claw 能力面，再扩展到多硬件、多固件、多模板生态。
          </p>
          <div className="actions">
            <a className="btn primary" href="/studio">进入 Agent Studio</a>
            <a className="btn" href="#pipeline">查看 AI Native 架构</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">1</div><div><h3>能力声明</h3><p>设备上报 Capability、外设、运行时、文件系统与可用工具。</p></div></div>
          <div className="step"><div className="step-num">2</div><div><h3>聊天造物</h3><p>通过对话生成 Agent 行为、Lua 规则、Skills 和 MCP 工具调用。</p></div></div>
          <div className="step"><div className="step-num">3</div><div><h3>本地运行</h3><p>关键路径离线确定性执行，复杂任务云边协同调用 LLM。</p></div></div>
        </div>
      </section>

      <section id="pipeline">
        <div className="section-title"><div><h2>AI Native MVP 基线</h2><p>MVP 不是 demo，而是对齐 ESP-Claw 的端侧 Agent Runtime 和控制台能力。</p></div></div>
        <div className="pipeline">
          {pipeline.map(([title, desc]) => <div className="pipeline-item" key={title}><strong>{title}</strong><span>{desc}</span></div>)}
        </div>
      </section>

      <section id="templates">
        <div className="section-title"><div><h2>首批 Agent 模板</h2><p>模板将包含人设、技能、规则、Lua 脚本、MCP 工具和硬件能力依赖。</p></div></div>
        <div className="grid">{agentTemplates.map((template) => <TemplateCard key={template.id} template={template} />)}</div>
      </section>

      <section id="devices">
        <div className="section-title"><div><h2>首批支持硬件</h2><p>先对齐 ESP32-S3 / P4 / C5 / S31 运行时，再扩展 M5Stack、小智、Seeed、树莓派、nRF、STM32 和 Linux SBC。</p></div></div>
        <div className="grid">{devices.map((device) => <DeviceCard key={device.id} device={device} />)}</div>
      </section>

      <footer className="footer">LumiForge · AI Native hardware agent platform · 2026</footer>
    </main>
  );
}
