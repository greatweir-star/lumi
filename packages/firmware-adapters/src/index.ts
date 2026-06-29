import type { DeployRequest, Deployment, HardwareTarget } from "@lingji/core";

export type FlashProgress = {
  stage: "connect" | "erase" | "write" | "verify" | "configure" | "done" | "error";
  percent: number;
  message: string;
};

export type FirmwareManifest = {
  id: string;
  name: string;
  version: string;
  targetChip: string;
  runtime: "esp-claw" | "xiaozhi" | "lingji-runtime" | "custom";
  artifacts: Array<{
    name: string;
    offset: string;
    url: string;
    sha256?: string;
  }>;
};

export interface FirmwareAdapter {
  id: string;
  name: string;
  supports(target: HardwareTarget): boolean;
  listFirmware(target: HardwareTarget): Promise<FirmwareManifest[]>;
  flash(request: DeployRequest, onProgress: (progress: FlashProgress) => void): Promise<Deployment>;
}

export class WebSerialEspAdapter implements FirmwareAdapter {
  id = "webserial-esp";
  name = "ESP WebSerial 烧录适配器";

  supports(target: HardwareTarget): boolean {
    return target.capabilities.includes("web_serial_flash") && target.chip.toLowerCase().includes("esp32");
  }

  async listFirmware(target: HardwareTarget): Promise<FirmwareManifest[]> {
    return target.firmwareProfiles.map((profile) => ({
      id: `${target.id}-${profile}`,
      name: profile,
      version: "0.1.0",
      targetChip: target.chip,
      runtime: profile.includes("xiaozhi") ? "xiaozhi" : profile.includes("esp-claw") ? "esp-claw" : "lingji-runtime",
      artifacts: []
    }));
  }

  async flash(request: DeployRequest, onProgress: (progress: FlashProgress) => void): Promise<Deployment> {
    const createdAt = new Date().toISOString();
    onProgress({ stage: "connect", percent: 5, message: "等待浏览器串口授权" });
    onProgress({ stage: "erase", percent: 25, message: "擦除 Flash 分区" });
    onProgress({ stage: "write", percent: 65, message: "写入基础固件与 Agent 配置" });
    onProgress({ stage: "verify", percent: 85, message: "校验固件 Hash" });
    onProgress({ stage: "configure", percent: 95, message: "写入设备身份与运行时参数" });
    onProgress({ stage: "done", percent: 100, message: "部署完成，等待设备上线" });

    return {
      id: `dep_${crypto.randomUUID()}`,
      projectId: request.projectId,
      deviceId: request.deviceId,
      status: "online",
      firmwareProfile: request.firmwareProfile,
      logs: ["模拟烧录完成。下一步接入 esptool-js / Web Serial。"],
      createdAt,
      finishedAt: new Date().toISOString()
    };
  }
}

export const defaultFirmwareAdapters: FirmwareAdapter[] = [new WebSerialEspAdapter()];
