import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance } from "fastify";

const root = process.cwd().includes("apps/api") ? join(process.cwd(), "../..") : process.cwd();
const firmwareManifest = JSON.parse(
  readFileSync(join(root, "templates/firmware/esp32s3/lumiforge-runtime-esp32s3.firmware.json"), "utf-8")
);
const espWebToolsManifest = JSON.parse(
  readFileSync(join(root, "templates/firmware/esp32s3/esp-web-tools.preview.json"), "utf-8")
);

type FirmwareArtifact = {
  name: string;
  offset: string;
  path: string;
  buildOutput?: string;
  url: string;
  required: boolean;
  available: boolean;
  notes: string;
};

function requiredArtifacts() {
  return firmwareManifest.artifacts.filter((artifact: FirmwareArtifact) => artifact.required) as FirmwareArtifact[];
}

function missingRequiredArtifacts() {
  return requiredArtifacts().filter((artifact) => !artifact.available);
}

function readiness() {
  const missing = missingRequiredArtifacts();
  return {
    status: missing.length === 0 ? "ready_to_flash" : "missing_binaries",
    requiredArtifacts: requiredArtifacts().length,
    missingRequiredArtifacts: missing.length,
    missingArtifacts: missing.map((artifact) => ({ name: artifact.name, offset: artifact.offset, buildOutput: artifact.buildOutput, targetPath: artifact.path })),
    blockers: firmwareManifest.blockers,
    nextActions: [
      "Build ESP-IDF bootloader, partition table and app binary.",
      "Convert Runtime FS Package into FATFS/SPIFFS image.",
      "Serve binaries from the same origin as ESP Web Tools manifest.",
      "Run browser serial chip detection before enabling flash."
    ]
  };
}

function buildPlan() {
  return {
    id: firmwareManifest.id,
    buildProject: firmwareManifest.buildProject,
    partitionTable: firmwareManifest.partitionTable,
    targetChip: firmwareManifest.targetChip,
    status: readiness().status,
    commands: [
      "cd firmware/lumiforge-agent-c/examples/esp_idf_agent_demo",
      "idf.py set-target esp32s3",
      "idf.py build"
    ],
    artifacts: firmwareManifest.artifacts.map((artifact: FirmwareArtifact) => ({
      name: artifact.name,
      required: artifact.required,
      available: artifact.available,
      offset: artifact.offset,
      buildOutput: artifact.buildOutput,
      targetPath: artifact.path,
      serveUrl: artifact.url,
      notes: artifact.notes
    })),
    readiness: readiness()
  };
}

export async function registerFlashRoutes(app: FastifyInstance) {
  app.get("/flash/manifests", async () => [
    {
      id: firmwareManifest.id,
      name: firmwareManifest.name,
      version: firmwareManifest.version,
      targetChip: firmwareManifest.targetChip,
      status: firmwareManifest.status,
      artifacts: firmwareManifest.artifacts.length,
      readiness: readiness()
    }
  ]);

  app.get("/flash/manifests/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    return id === firmwareManifest.id
      ? { ...firmwareManifest, readiness: readiness() }
      : reply.code(404).send({ message: "Firmware manifest not found" });
  });

  app.get("/flash/esp-web-tools/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    if (id !== firmwareManifest.id) return reply.code(404).send({ message: "ESP Web Tools manifest not found" });
    return espWebToolsManifest;
  });

  app.get("/flash/readiness/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    return id === firmwareManifest.id ? readiness() : reply.code(404).send({ message: "Firmware manifest not found" });
  });

  app.get("/flash/build-plan/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    return id === firmwareManifest.id ? buildPlan() : reply.code(404).send({ message: "Firmware manifest not found" });
  });
}
