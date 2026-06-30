#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "templates/firmware/esp32s3/lumiforge-runtime-esp32s3.firmware.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

const required = manifest.artifacts.filter((artifact) => artifact.required);
const missing = required.filter((artifact) => !artifact.available);
const plan = {
  id: manifest.id,
  status: missing.length === 0 ? "ready_to_flash" : "missing_binaries",
  buildProject: manifest.buildProject,
  partitionTable: manifest.partitionTable,
  commands: [
    "cd firmware/lumiforge-agent-c/examples/esp_idf_agent_demo",
    "idf.py set-target esp32s3",
    "idf.py build"
  ],
  artifacts: manifest.artifacts.map((artifact) => ({
    name: artifact.name,
    required: artifact.required,
    available: artifact.available,
    offset: artifact.offset,
    buildOutput: artifact.buildOutput,
    targetPath: artifact.path
  })),
  missingRequiredArtifacts: missing.map((artifact) => artifact.name),
  blockers: manifest.blockers
};

console.log(JSON.stringify(plan, null, 2));
