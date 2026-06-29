import type { FastifyInstance } from "fastify";
import { isInstallAllowed, scoreSkillsLabPackage, SkillsLabPackageSchema } from "@lumiforge/core";
import { skillsLabPackages } from "./data";

export async function registerSkillsLabRoutes(app: FastifyInstance) {
  app.get("/skills-lab/packages", async () =>
    skillsLabPackages.map((pkg) => ({
      ...pkg,
      computedScore: scoreSkillsLabPackage(pkg),
      installAllowed: isInstallAllowed(pkg)
    }))
  );

  app.get("/skills-lab/packages/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const pkg = skillsLabPackages.find((item) => item.id === id);
    return pkg
      ? { ...pkg, computedScore: scoreSkillsLabPackage(pkg), installAllowed: isInstallAllowed(pkg) }
      : reply.code(404).send({ message: "Skills Lab package not found" });
  });

  app.get("/skills-lab/stats", async () => ({
    packages: skillsLabPackages.length,
    approved: skillsLabPackages.filter((item) => item.quality.status === "approved").length,
    reviewing: skillsLabPackages.filter((item) => item.quality.status === "reviewing").length,
    unreviewed: skillsLabPackages.filter((item) => item.security.reviewStatus === "unreviewed").length,
    highRisk: skillsLabPackages.filter((item) => item.security.riskLevel === "high").length,
    luaFiles: skillsLabPackages.reduce((sum, item) => sum + item.skill.files.filter((file) => file.kind === "lua").length, 0)
  }));

  app.get("/skills-lab/categories", async () => {
    const categories = new Map<string, number>();
    for (const item of skillsLabPackages) {
      for (const category of item.skill.category ?? []) categories.set(category, (categories.get(category) ?? 0) + 1);
      for (const tag of item.skill.tags ?? []) categories.set(tag, (categories.get(tag) ?? 0) + 1);
    }
    return Array.from(categories.entries()).map(([id, count]) => ({ id, count }));
  });

  app.get("/skills-lab/share-template", async () => ({
    requiredFiles: ["SKILL.md"],
    optionalFiles: ["scripts/*.lua", "references/*", "assets/*"],
    requiredMetadata: ["id", "name", "description", "author", "source", "license", "skill", "quality", "security", "distribution"],
    reviewChecklist: ["license", "permissions", "riskLevel", "runtimeProfiles", "hardwareClaws", "skillTests", "cleanRoomBoundary"]
  }));

  app.post("/skills-lab/packages", async (request, reply) => {
    const parsed = SkillsLabPackageSchema.parse(request.body);
    const existing = skillsLabPackages.find((item) => item.id === parsed.id);
    if (existing) return reply.code(409).send({ message: "Skills Lab package already exists" });
    const draft = {
      ...parsed,
      quality: { ...parsed.quality, status: "reviewing" as const },
      security: { ...parsed.security, reviewStatus: "unreviewed" as const }
    };
    skillsLabPackages.push(draft);
    return reply.code(201).send({ ...draft, computedScore: scoreSkillsLabPackage(draft), installAllowed: isInstallAllowed(draft) });
  });

  app.post("/skills-lab/packages/:id/install-plan", async (request, reply) => {
    const { id } = request.params as { id: string };
    const pkg = skillsLabPackages.find((item) => item.id === id);
    if (!pkg) return reply.code(404).send({ message: "Skills Lab package not found" });
    return {
      packageId: pkg.id,
      skillId: pkg.skill.skillId,
      installAllowed: isInstallAllowed(pkg),
      installMode: pkg.distribution.installMode,
      installPrompt: pkg.distribution.installPrompt,
      files: pkg.skill.files,
      permissions: pkg.security.permissions,
      warnings: pkg.security.warnings
    };
  });
}
