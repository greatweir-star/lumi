import firmwareManifestJson from "../../../templates/firmware/esp32s3/lumiforge-runtime-esp32s3.firmware.json";
import espWebToolsManifestJson from "../../../templates/firmware/esp32s3/esp-web-tools.preview.json";

export type FirmwareArtifact = {
  name: string;
  offset: string;
  path: string;
  url: string;
  required: boolean;
  available: boolean;
  notes: string;
};

export type LumiForgeFirmwareManifest = {
  id: string;
  name: string;
  version: string;
  targetChip: string;
  chipFamily: string;
  runtime: string;
  status: "missing_binaries" | "ready_to_flash";
  deviceTargets: string[];
  flashSizeMB: number;
  partitionScheme: string;
  artifacts: FirmwareArtifact[];
  provisioning: Record<string, string>;
  blockers: string[];
};

export type EspWebToolsPreviewManifest = {
  name: string;
  version: string;
  home_assistant_domain?: string;
  new_install_prompt_erase: boolean;
  builds: Array<{
    chipFamily: string;
    improv: boolean;
    parts: Array<{ path: string; offset: number }>;
  }>;
  x_lumiforge: {
    status: string;
    firmwareManifestId: string;
    runtimeFsPackageEndpoint: string;
    notes: string;
  };
};

export const firmwareManifest = firmwareManifestJson as LumiForgeFirmwareManifest;
export const espWebToolsManifest = espWebToolsManifestJson as EspWebToolsPreviewManifest;

export function getFlashReadiness() {
  const required = firmwareManifest.artifacts.filter((artifact) => artifact.required);
  const missing = required.filter((artifact) => !artifact.available);
  return {
    status: missing.length === 0 ? "ready_to_flash" : "missing_binaries",
    required: required.length,
    missing: missing.length,
    available: required.length - missing.length,
    blockers: firmwareManifest.blockers
  };
}
