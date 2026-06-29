import packagesJson from "../../../datasets/skills-lab/skills-lab.json";

export type SkillsLabPackage = {
  id: string;
  name: string;
  description: string;
  author: string;
  source: {
    type: "lumiforge_builtin" | "community" | "esp_claw_skills_lab" | "vendor";
    url: string;
    upstreamId?: string;
    rewritePolicy: "original" | "clean_room_rewrite" | "metadata_only" | "vendor_provided";
  };
  license: string;
  skill: {
    skillId: string;
    entry: "SKILL.md";
    capGroups: string[];
    category: string[];
    tags: string[];
    peripherals: string[];
    files: Array<{ path: string; kind: "skill_md" | "lua" | "reference" | "asset" | "manifest"; sha256?: string }>;
  };
  quality: {
    status: "draft" | "reviewing" | "approved" | "blocked" | "deprecated";
    score: number;
    downloads: number;
    stars: number;
  };
  security: {
    reviewStatus: "unreviewed" | "metadata_checked" | "manual_reviewed" | "sandbox_tested";
    riskLevel: "low" | "medium" | "high" | "unknown";
    permissions: string[];
    warnings: string[];
  };
  distribution: {
    installMode: "prompt_install" | "download_bundle" | "registry_sync";
    installPrompt: string;
    bundleUrl?: string;
  };
};

export const skillsLabPackages = packagesJson as SkillsLabPackage[];

export function computeSkillsLabStats() {
  return {
    packages: skillsLabPackages.length,
    approved: skillsLabPackages.filter((item) => item.quality.status === "approved").length,
    reviewing: skillsLabPackages.filter((item) => item.quality.status === "reviewing").length,
    luaScripts: skillsLabPackages.reduce((sum, item) => sum + item.skill.files.filter((file) => file.kind === "lua").length, 0),
    unreviewed: skillsLabPackages.filter((item) => item.security.reviewStatus === "unreviewed").length,
    unknownRisk: skillsLabPackages.filter((item) => item.security.riskLevel === "unknown").length
  };
}
