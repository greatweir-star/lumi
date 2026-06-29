import type { AgentTemplate } from "@lumiforge/core";

export function TemplateCard({ template }: { template: AgentTemplate }) {
  return (
    <article className="card">
      <h3>{template.name}</h3>
      <p>{template.tagline}</p>
      <div className="tags">
        {template.requiredCapabilities.slice(0, 4).map((item) => <span className="tag" key={item}>{item}</span>)}
      </div>
    </article>
  );
}
