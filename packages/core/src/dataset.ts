import { z } from "zod";

export const ClawQualitySchema = z.object({
  level: z.enum(["draft", "bench_tested", "field_tested", "production_ready"]),
  score: z.number().min(0).max(100),
  tested: z.boolean(),
  notes: z.string().optional()
});

export const ClawProvenanceSchema = z.object({
  source: z.string(),
  license: z.string(),
  rewritePolicy: z.enum(["clean_room_rewrite", "original", "vendor_provided", "unknown"]),
  notes: z.string().optional()
});

export const ClawArtifactSchema = z.object({
  type: z.string(),
  path: z.string(),
  sha256: z.string().optional()
});

export const ClawPackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.enum(["hardware", "runtime", "skill", "compatibility", "evaluation"]),
  target: z.object({
    chip: z.string(),
    board: z.string(),
    vendor: z.string().optional()
  }),
  quality: ClawQualitySchema,
  capabilities: z.array(z.string()).default([]),
  runtimeProfiles: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  artifacts: z.array(ClawArtifactSchema),
  provenance: ClawProvenanceSchema
});

export type ClawQuality = z.infer<typeof ClawQualitySchema>;
export type ClawPackage = z.infer<typeof ClawPackageSchema>;

export function scoreClawPackage(claw: ClawPackage): number {
  const quality = claw.quality.score;
  const capabilityBonus = Math.min(claw.capabilities.length * 2, 20);
  const runtimeBonus = Math.min(claw.runtimeProfiles.length * 5, 15);
  const skillBonus = Math.min(claw.skills.length * 3, 15);
  const testedBonus = claw.quality.tested ? 20 : 0;
  return Math.min(100, quality + capabilityBonus + runtimeBonus + skillBonus + testedBonus);
}
