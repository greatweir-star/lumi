import type { HardwareTarget } from "@lingji/core";

export function DeviceCard({ device }: { device: HardwareTarget }) {
  return (
    <article className="card">
      <h3>{device.name}</h3>
      <p>{device.vendor} · {device.chip} · Flash {device.flashMB}MB{device.psramMB ? ` · PSRAM ${device.psramMB}MB` : ""}</p>
      <div className="tags">
        {device.recommendedUseCases.slice(0, 3).map((item) => <span className="tag" key={item}>{item}</span>)}
        <span className="tag">{device.maturity}</span>
      </div>
    </article>
  );
}
