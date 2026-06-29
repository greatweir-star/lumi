import { DeviceCard } from "../components/device-card";
import { TemplateCard } from "../components/template-card";
import { agentTemplates, devices } from "../lib/mock";

const pipeline = [
  ["Claw Dataset", "沉淀硬件 Claw、Runtime Claw、Skill Claw、兼容矩阵和测试结果，这是 LumiForge 最核心资产。"],
  ["AI Native Runtime", "设备端 Agent Loop、LLM+Lua、事件路由、本地记忆、Skills 和 MCP 双向互联。"],
  ["硬件能力声明", "通过 Capability Registry 描述屏幕、摄像头、音频、传感器、GPIO、网络与外部服务。"],
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
          <a href="/datasets">Claw Dataset</a>
          <a href="/capabilities">Capability Catalog</a>
          <a href="/skills">Skills Manager</a>
          <a href="/runtime">Runtime Blueprint</a>
          <a href="/studio">Agent Studio</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">AI Native 智能硬件开发平台</div>
          <h1>把 Agent 运行时和 Claw 数据集，灌进真实硬件。</h1>
          <p className="lead">
            LumiForge 的长期价值来自高质量 Claw 数据集：我们会持续收集、适配、重写真实硬件的 Claw，沉淀 Board Profile、Runtime Profile、Skills、兼容矩阵、测试结果和来源边界。
          </p>
          <div className="actions">
            <a className="btn primary" href="/datasets">查看 Claw 数据集</a>
            <a className="btn" href="/studio">进入 Agent Studio</a>
            <a className="btn" href="/capabilities">查看能力重构</a>
            <a className="btn" href="/skills">打开 Skills Manager</a>
            <a className="btn" href="/runtime">查看 Runtime Blueprint</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">1</div><div><h3>Claw 数据集</h3><p>记录硬件、Runtime、Skills、测试、兼容性和 clean-room rewrite 边界。</p></div></div>
          <div className="step"><div className="step-num">2</div><div><h3>纯 C Agent 内核</h3><p>面向智能硬件运行的轻量 Agent Core，而不是只跑在云端的应用。</p></div></div>
          <div className="step"><div className="step-num">3</div><div><h3>本地运行</h3><p>关键路径离线确定性执行，复杂任务云边协同调用 LLM。</p></div></div>
        </div>
      </section>

      <section id="pipeline">
        <div className="section-title"><div><h2>LumiForge 核心资产</h2><p>平台壳会被复制，真正难复制的是高质量 Claw 数据、适配经验和端侧 Runtime。</p></div></div>
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

      <footer className="footer">LumiForge · Claw dataset + AI Native hardware agent platform · 2026</footer>
    </main>
  );
}
