import type { FastifyInstance } from "fastify";
import { skillsLabPackages } from "./data";

function packageScore(item: { quality: { score: number; installs: number; testStatus: string } }) {
  const testBonus = item.quality.testStatus === "passing" ? 20 : item.quality.testStatus === "untested" ? 0 : -10;
  const installBonus = Math.min(item.quality.installs / 10, 20);
  return Math.max(0, Math.min(100, item.quality.score + testBonus + installBonus));
}

export async function registerSkillsLabRoutes(app: FastifyInstance) {
  app.get("/skills-lab/packages", async () =>
    skillsLabPackages.map((item) => ({ ...item, computedScore: packageScore(item) }))
  );

  app.get("/skills-lab/packages/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const item = skillsLabPackages.find((entry) => entry.id === id);
    return item ? { ...item, computedScore: packageScore(item) } : reply.code(404).send({ message: "Skills Lab package not found" });
  });

  app.get("/skills-lab/categories", async () => {
    const categories = new Map<string, number>();
    for (const item of skillsLabPackages) {
      categories.set(item.kind, (categories.get(item.kind) ?? 0) + 1);
      for (const tag of item.tags ?? []) categories.set(tag, (categories.get(tag) ?? 0) + 1);
    }
    return Array.from(categories.entries()).map(([id, count]) => ({ id, count }));
  });

  app.get("/skills-lab/share-template", async () => ({
    requiredFiles: ["SKILL.md", "manifest.json"],
    optionalFiles: ["scripts/*.lua", "resources/*", "tests/*.json"],
    requiredMetadata: ["id", "name", "kind", "entry", "assets", "compatibility", "quality", "provenance"],
    reviewChecklist: ["license", "permissions", "runtimeProfiles", "hardwareClaws", "skillTests", "cleanRoomBoundary"]
  }));
}
