import { z } from "zod";

export const SkillsLabSourceSchema = z.object({
  type: z.enum(["lumiforge_builtin", "community", "esp_claw_skills_lab", "vendor"]),
  url: z.string(),
  upstreamId: z.string().optional(),
  rewritePolicy: z.enum(["original", "clean_room_rewrite", "metadata_only", "vendor_provided"])
});

export const SkillsLabPackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  author: z.string(),
  source: SkillsLabSourceSchema,
  license: z.string(),
  skill: z.object({
    skillId: z.string(),
    entry: z.literal("SKILL.md"),
    capGroups: z.array(z.string()).default([]),
    category: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    peripherals: z.array(z.string()).default([]),
    files: z.array(z.object({
      path: z.string(),
      kind: z.enum(["skill_md", "lua", "reference", "asset", "manifest"]),
      sha256: z.string().optional()
    }))
  }),
  quality: z.object({
    status: z.enum(["draft", "reviewing", "approved", "blocked", "deprecated"]),
    score: z.number().min(0).max(100),
    downloads: z.number().default(0),
    stars: z.number().default(0)
  }),
  security: z.object({
    reviewStatus: z.enum(["unreviewed", "metadata_checked", "manual_reviewed", "sandbox_tested"]),
    riskLevel: z.enum(["low", "medium", "high", "unknown"]),
    permissions: z.array(z.string()),
    warnings: z.array(z.string()).default([])
  }),
  distribution: z.object({
    installMode: z.enum(["prompt_install", "download_bundle", "registry_sync"]),
    installPrompt: z.string(),
    bundleUrl: z.string().optional()
  })
});

export type SkillsLabPackage = z.infer<typeof SkillsLabPackageSchema>;

export function scoreSkillsLabPackage(pkg: SkillsLabPackage): number {
  const reviewBonus = pkg.security.reviewStatus === "sandbox_tested" ? 30 : pkg.security.reviewStatus === "manual_reviewed" ? 20 : pkg.security.reviewStatus === "metadata_checked" ? 10 : 0;
  const riskPenalty = pkg.security.riskLevel === "high" ? 35 : pkg.security.riskLevel === "unknown" ? 20 : pkg.security.riskLevel === "medium" ? 10 : 0;
  const communityBonus = Math.min(pkg.quality.downloads / 20 + pkg.quality.stars * 2, 20);
  return Math.max(0, Math.min(100, pkg.quality.score + reviewBonus + communityBonus - riskPenalty));
}

export function isInstallAllowed(pkg: SkillsLabPackage): boolean {
  return pkg.quality.status === "approved" && pkg.security.reviewStatus !== "unreviewed" && pkg.security.riskLevel !== "high";
}
