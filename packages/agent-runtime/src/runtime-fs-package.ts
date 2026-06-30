import type { RuntimeDeploymentUnit } from "./deployment-unit";

export type RuntimeFsPackageFileKind =
  | "manifest"
  | "runtime_profile"
  | "agent_config"
  | "capabilities"
  | "mcp_config"
  | "im_config"
  | "web_console"
  | "device_identity"
  | "memory"
  | "skill_manifest"
  | "lua_script"
  | "router_rules"
  | "scheduler";

export type RuntimeFsPackageFile = {
  path: string;
  kind: RuntimeFsPackageFileKind;
  content: string;
  sizeBytes: number;
  checksum: string;
};

export type RuntimeFsPackageManifest = {
  id: string;
  format: "lumiforge-runtime-fs-package";
  version: "0.1.0";
  root: string;
  runtimeProfileId: string;
  deviceIdentity: RuntimeDeploymentUnit["deviceIdentity"];
  generatedAt: string;
  fileCount: number;
  totalSizeBytes: number;
  checksumAlgorithm: "fnv1a32";
  checksum: string;
  files: Array<{
    path: string;
    kind: RuntimeFsPackageFileKind;
    sizeBytes: number;
    checksum: string;
  }>;
};

export type RuntimeFsPackage = {
  manifest: RuntimeFsPackageManifest;
  files: RuntimeFsPackageFile[];
};

function normalizeRoot(root: string) {
  return root.endsWith("/") ? root.slice(0, -1) : root;
}

function normalizePath(root: string, path: string) {
  const cleanRoot = normalizeRoot(root || "/fatfs");
  const raw = path.startsWith("/") ? path : `${cleanRoot}/${path}`;
  const normalized = raw.replace(/\/+/g, "/");
  if (normalized.includes("..")) throw new Error(`Unsafe runtime fs path: ${path}`);
  return normalized.startsWith(cleanRoot) ? normalized : `${cleanRoot}${normalized}`;
}

function stableJson(value: unknown): string {
  return `${JSON.stringify(value, Object.keys(value as Record<string, unknown>).sort(), 2)}\n`;
}

function jsonFile(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function fnv1a32(input: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function makeFile(root: string, path: string, kind: RuntimeFsPackageFileKind, content: string): RuntimeFsPackageFile {
  const normalizedPath = normalizePath(root, path);
  return {
    path: normalizedPath,
    kind,
    content,
    sizeBytes: new TextEncoder().encode(content).length,
    checksum: fnv1a32(`${normalizedPath}\n${kind}\n${content}`)
  };
}

function addUniqueFile(files: RuntimeFsPackageFile[], file: RuntimeFsPackageFile) {
  const existing = files.find((item) => item.path === file.path);
  if (existing) throw new Error(`Duplicate runtime fs file path: ${file.path}`);
  files.push(file);
}

export function compileRuntimeFsPackage(
  deployment: RuntimeDeploymentUnit,
  options: { generatedAt?: string } = {}
): RuntimeFsPackage {
  const root = normalizeRoot(deployment.runtimeFsSeed.root || "/fatfs");
  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const files: RuntimeFsPackageFile[] = [];

  addUniqueFile(files, makeFile(root, ".lumiforge/runtime_profile.json", "runtime_profile", jsonFile(deployment.runtimeProfile)));
  addUniqueFile(files, makeFile(root, ".lumiforge/agent_config.json", "agent_config", jsonFile(deployment.agentConfig)));
  addUniqueFile(files, makeFile(root, ".lumiforge/capabilities.json", "capabilities", jsonFile(deployment.runtimeProfile.capabilities)));
  addUniqueFile(files, makeFile(root, ".lumiforge/mcp.json", "mcp_config", jsonFile(deployment.runtimeProfile.mcp)));
  addUniqueFile(files, makeFile(root, ".lumiforge/im.json", "im_config", jsonFile(deployment.runtimeProfile.im)));
  addUniqueFile(files, makeFile(root, ".lumiforge/web_console.json", "web_console", jsonFile(deployment.runtimeProfile.webConsole)));
  addUniqueFile(files, makeFile(root, "device/identity.json", "device_identity", jsonFile(deployment.deviceIdentity)));

  for (const memoryFile of deployment.memorySeed.files) {
    addUniqueFile(files, makeFile(root, memoryFile.path, "memory", memoryFile.content));
  }

  addUniqueFile(files, makeFile(root, `${deployment.runtimeFsSeed.skillsDir}/skills.manifest.json`, "skill_manifest", jsonFile(deployment.skills)));
  for (const script of deployment.luaScripts) {
    addUniqueFile(files, makeFile(root, script.path, "lua_script", script.content));
  }

  addUniqueFile(files, makeFile(root, `${deployment.runtimeFsSeed.routerRulesDir}/rules.json`, "router_rules", jsonFile(deployment.routerRules)));
  addUniqueFile(files, makeFile(root, `${deployment.runtimeFsSeed.schedulerDir}/scheduler.json`, "scheduler", jsonFile(deployment.schedulerConfig)));

  const sortedFiles = files.sort((a, b) => a.path.localeCompare(b.path));
  const totalSizeBytes = sortedFiles.reduce((sum, file) => sum + file.sizeBytes, 0);
  const manifestFiles = sortedFiles.map((file) => ({
    path: file.path,
    kind: file.kind,
    sizeBytes: file.sizeBytes,
    checksum: file.checksum
  }));
  const manifestWithoutChecksum = {
    id: deployment.id,
    format: "lumiforge-runtime-fs-package" as const,
    version: "0.1.0" as const,
    root,
    runtimeProfileId: deployment.runtimeProfile.id,
    deviceIdentity: deployment.deviceIdentity,
    generatedAt,
    fileCount: sortedFiles.length + 1,
    totalSizeBytes,
    checksumAlgorithm: "fnv1a32" as const,
    files: manifestFiles
  };
  const checksum = fnv1a32(stableJson(manifestWithoutChecksum));
  const manifest: RuntimeFsPackageManifest = {
    ...manifestWithoutChecksum,
    checksum,
    totalSizeBytes: totalSizeBytes + new TextEncoder().encode(jsonFile({ ...manifestWithoutChecksum, checksum })).length
  };
  const manifestFile = makeFile(root, ".lumiforge/runtime-fs.manifest.json", "manifest", jsonFile(manifest));
  const finalFiles = [manifestFile, ...sortedFiles].sort((a, b) => a.path.localeCompare(b.path));

  return {
    manifest: {
      ...manifest,
      fileCount: finalFiles.length,
      totalSizeBytes: finalFiles.reduce((sum, file) => sum + file.sizeBytes, 0),
      files: finalFiles.map((file) => ({ path: file.path, kind: file.kind, sizeBytes: file.sizeBytes, checksum: file.checksum }))
    },
    files: finalFiles
  };
}
