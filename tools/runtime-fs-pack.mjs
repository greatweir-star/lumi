#!/usr/bin/env node
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist/runtime-fs");
const runtimeProfile = JSON.parse(readFileSync(join(root, "templates/runtime/esp-claw-compatible.json"), "utf-8"));
const skills = JSON.parse(readFileSync(join(root, "templates/skills/skills.json"), "utf-8"));

function normalizeRoot(value) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizePath(rootPath, path) {
  const cleanRoot = normalizeRoot(rootPath || "/fatfs");
  const raw = path.startsWith("/") ? path : `${cleanRoot}/${path}`;
  const normalized = raw.replace(/\/+/g, "/");
  if (normalized.includes("..")) throw new Error(`Unsafe runtime fs path: ${path}`);
  return normalized.startsWith(cleanRoot) ? normalized : `${cleanRoot}${normalized}`;
}

function fnv1a32(input) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function byteLength(value) {
  return Buffer.byteLength(value, "utf-8");
}

function jsonFile(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function makeFile(rootPath, path, kind, content) {
  const normalizedPath = normalizePath(rootPath, path);
  return {
    path: normalizedPath,
    kind,
    content,
    sizeBytes: byteLength(content),
    checksum: fnv1a32(`${normalizedPath}\n${kind}\n${content}`)
  };
}

function writeRuntimeFile(file) {
  const relative = file.path.replace(/^\/fatfs\/?/, "");
  const target = join(outDir, "files", relative);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, file.content);
}

function main() {
  const rootPath = normalizeRoot(runtimeProfile.fileSystem.root || "/fatfs");
  const agentConfig = {
    projectId: "preview-project",
    persona: "你是一个运行在智能硬件上的 LumiForge Agent。",
    llmProvider: "openai",
    memoryMode: "local",
    skillIds: skills.map((skill) => skill.id),
    rules: [
      { id: "button.single_click", source: "button", action: "agent.chat.start", status: "enabled" },
      { id: "schedule.morning_greeting", source: "scheduler", action: "skill.daily_greeting", status: "enabled" }
    ]
  };
  const deviceIdentity = {
    deviceId: "dev_local_esp32s3",
    projectId: "preview-project",
    runtimeProfileId: runtimeProfile.id
  };
  const skillManifest = skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    entry: "SKILL.md",
    permissions: skill.permissions,
    installSource: skill.installSource,
    trustLevel: skill.trustLevel
  }));
  const files = [
    makeFile(rootPath, ".lumiforge/runtime_profile.json", "runtime_profile", jsonFile(runtimeProfile)),
    makeFile(rootPath, ".lumiforge/agent_config.json", "agent_config", jsonFile(agentConfig)),
    makeFile(rootPath, ".lumiforge/capabilities.json", "capabilities", jsonFile(runtimeProfile.capabilities)),
    makeFile(rootPath, ".lumiforge/mcp.json", "mcp_config", jsonFile(runtimeProfile.mcp)),
    makeFile(rootPath, ".lumiforge/im.json", "im_config", jsonFile(runtimeProfile.im)),
    makeFile(rootPath, ".lumiforge/web_console.json", "web_console", jsonFile(runtimeProfile.webConsole)),
    makeFile(rootPath, "device/identity.json", "device_identity", jsonFile(deviceIdentity)),
    makeFile(rootPath, runtimeProfile.memory.humanReadableFile, "memory", "# MEMORY\n"),
    makeFile(rootPath, runtimeProfile.memory.recordsFile, "memory", ""),
    makeFile(rootPath, runtimeProfile.memory.indexFile, "memory", "{}\n"),
    makeFile(rootPath, runtimeProfile.memory.digestFile, "memory", ""),
    makeFile(rootPath, runtimeProfile.memory.personaFiles.user, "memory", "# User\n"),
    makeFile(rootPath, runtimeProfile.memory.personaFiles.soul, "memory", "# Soul\n"),
    makeFile(rootPath, runtimeProfile.memory.personaFiles.identity, "memory", "# Identity\n"),
    makeFile(rootPath, `${runtimeProfile.fileSystem.skillsDir}/skills.manifest.json`, "skill_manifest", jsonFile(skillManifest)),
    makeFile(rootPath, `${runtimeProfile.fileSystem.routerRulesDir}/rules.json`, "router_rules", jsonFile(agentConfig.rules)),
    makeFile(rootPath, `${runtimeProfile.fileSystem.schedulerDir}/scheduler.json`, "scheduler", jsonFile([]))
  ].sort((a, b) => a.path.localeCompare(b.path));

  const manifest = {
    id: "runtime-fs-preview",
    format: "lumiforge-runtime-fs-package",
    version: "0.1.0",
    root: rootPath,
    runtimeProfileId: runtimeProfile.id,
    deviceIdentity,
    generatedAt: new Date().toISOString(),
    fileCount: files.length + 1,
    checksumAlgorithm: "fnv1a32",
    files: files.map((file) => ({ path: file.path, kind: file.kind, sizeBytes: file.sizeBytes, checksum: file.checksum }))
  };
  manifest.checksum = fnv1a32(JSON.stringify(manifest));
  const manifestFile = makeFile(rootPath, ".lumiforge/runtime-fs.manifest.json", "manifest", jsonFile(manifest));
  const finalFiles = [manifestFile, ...files].sort((a, b) => a.path.localeCompare(b.path));
  manifest.totalSizeBytes = finalFiles.reduce((sum, file) => sum + file.sizeBytes, 0);

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const file of finalFiles) writeRuntimeFile(file);
  writeFileSync(join(outDir, "manifest.json"), jsonFile(manifest));
  console.log(JSON.stringify({ outDir, fileCount: finalFiles.length, totalSizeBytes: manifest.totalSizeBytes, checksum: manifest.checksum }, null, 2));
}

main();
