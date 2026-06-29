import { DeviceCard } from "../components/device-card";
import { TemplateCard } from "../components/template-card";
import { agentTemplates, devices } from "../lib/mock";

const pipeline = [
  ["选硬件", "从使用场景反推开发板、模组、外设和量产成熟度。"],
  ["选模板", "选择 AI 吧唧、桌宠、语音助手、情绪灯、视觉助手。"],
  ["配 Agent", "配置人设、模型、语音、记忆、技能、MCP 工具和触发规则。"],
  ["一键烧录", "浏览器串口识别设备，写入固件、设备 ID 和 Agent 配置。"],
  ["在线调试", "查看串口日志、联网状态、外设自检、技能调用记录。"],
  ["发布量产", "保存项目、发布模板、生成烧录包、OTA 和设备后台。"]
];

export default function HomePage() {
  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand"><div className="logo" /> 灵机工坊</div>
        <div className="nav-links">
          <a href="#devices">硬件中心</a>
          <a href="#templates">模板市场</a>
          <a href="#pipeline">开发流程</a>
          <a href="/studio">Agent Studio</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">一站式 AI 智能硬件开发平台</div>
          <h1>把一个想法，灌进真实硬件。</h1>
          <p className="lead">
            灵机工坊帮助 AI 硬件创业者和独立开发者完成硬件选型、Agent 配置、一键烧录、在线调试、OTA 和模板发布。
            第一阶段聚焦 AI 吧唧、AI 桌宠、小智语音硬件和 ESP32-S3 开发板。
          </p>
          <div className="actions">
            <a className="btn primary" href="/studio">开始创建项目</a>
            <a className="btn" href="#devices">查看支持硬件</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">1</div><div><h3>连接设备</h3><p>通过 Web Serial 识别 ESP32-S3、M5Stack 或小智硬件。</p></div></div>
          <div className="step"><div className="step-num">2</div><div><h3>选择 Agent 模板</h3><p>从陪伴吧唧、桌宠、语音助手、视觉助手开始。</p></div></div>
          <div className="step"><div className="step-num">3</div><div><h3>部署到硬件</h3><p>自动烧录固件、写入配置、打开在线调试台。</p></div></div>
        </div>
      </section>

      <section id="pipeline">
        <div className="section-title"><div><h2>产品闭环</h2><p>不是烧录工具，而是智能硬件应用搭建平台。</p></div></div>
        <div className="pipeline">
          {pipeline.map(([title, desc]) => <div className="pipeline-item" key={title}><strong>{title}</strong><span>{desc}</span></div>)}
        </div>
      </section>

      <section id="templates">
        <div className="section-title"><div><h2>首批 Agent 模板</h2><p>用户选择的是“做成什么产品”，不是下载哪个 bin 文件。</p></div></div>
        <div className="grid">{agentTemplates.map((template) => <TemplateCard key={template.id} template={template} />)}</div>
      </section>

      <section id="devices">
        <div className="section-title"><div><h2>首批支持硬件</h2><p>先打穿 ESP32-S3 / M5Stack / 小智硬件，再扩展树莓派、nRF、STM32 和 Linux SBC。</p></div></div>
        <div className="grid">{devices.map((device) => <DeviceCard key={device.id} device={device} />)}</div>
      </section>

      <footer className="footer">Lingji Workshop · MVP scaffold · 2026</footer>
    </main>
  );
}
