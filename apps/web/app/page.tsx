import { DeviceCard } from "../components/device-card";
import { TemplateCard } from "../components/template-card";
import { agentTemplates, devices } from "../lib/mock";

const pipeline = [
  ["AI Native Readiness", "持续追踪 Agent Core、LLM+Lua、Event Router、Memory、MCP、Browser Flash 等关键缺口。"],
  ["Runtime FS Package", "把 Runtime Profile、Agent Config、Memory Seed、Skills、Router Rules 编译成可灌装设备文件包。"],
  ["Claw Dataset", "沉淀硬件 Claw、Runtime Claw、Skill Claw、兼容矩阵和测试结果，这是 LumiForge 最核心资产。"],
  ["Skills Lab", "发现、分享、导入和验证 ESP-Claw / LumiForge 风格的 Skills 与 Lua 脚本。"],
  ["AI Native Runtime", "设备端 Agent Loop、LLM+Lua、事件路由、本地记忆、Skills 和 MCP 双向互联。"],
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
          <a href="/ai-native">AI Native Readiness</a>
          <a href="/runtime-fs">Runtime FS</a>
          <a href="/datasets">Claw Dataset</a>
          <a href="/skills-lab">Skills Lab</a>
          <a href="/capabilities">Capability Catalog</a>
          <a href="/studio">Agent Studio</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">AI Native 智能硬件开发平台</div>
          <h1>把 Agent 运行时、Claw 数据集和 Skills Lab，灌进真实硬件。</h1>
          <p className="lead">
            LumiForge 的长期价值来自高质量 Claw 数据集和 Skills Lab：持续收集、适配、重写真实硬件 Claw，沉淀 Board Profile、Runtime Profile、Skills/Lua、兼容矩阵、测试结果和来源边界。
          </p>
          <div className="actions">
            <a className="btn primary" href="/ai-native">查看 AI Native 缺口</a>
            <a className="btn" href="/runtime-fs">查看 Runtime FS 包</a>
            <a className="btn" href="/skills-lab">进入 Skills Lab</a>
            <a className="btn" href="/runtime">查看 Runtime Blueprint</a>
          </div>
        </div>
        <div className="panel deploy-card">
          <div className="step"><div className="step-num">1</div><div><h3>AI Native Readiness</h3><p>持续判断离真正设备端 AI 原生还缺哪些 P0 能力。</p></div></div>
          <div className="step"><div className="step-num">2</div><div><h3>Runtime FS Package</h3><p>把配置、记忆、Skills 和规则编译成可写入设备的文件包。</p></div></div>
          <div className="step"><div className="step-num">3</div><div><h3>纯 C Agent 内核</h3><p>面向智能硬件运行的轻量 Agent Core，而不是只跑在云端的应用。</p></div></div>
        </div>
      </section>

      <section id="pipeline">
        <div className="section-title"><div><h2>LumiForge 核心资产</h2><p>平台壳会被复制，真正难复制的是高质量 Claw 数据、Skills Lab 社区和端侧 Runtime。</p></div></div>
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

      <footer className="footer">LumiForge · Claw dataset + Skills Lab + AI Native hardware agent platform · 2026</footer>
    </main>
  );
}
