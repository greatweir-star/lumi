import packagesJson from "../../../datasets/skills-lab/packages.json";

export type SkillsLabPackage = {
  id: string;
  name: string;
  kind: "skill" | "lua_script" | "bundle" | "template";
  description: string;
  author: string;
  entry: string;
  tags: string[];
  assets: Array<{ type: string; path: string; sha256?: string }>;
  compatibility: {
    runtimeProfiles: string[];
    hardwareClaws: string[];
    requiredCapabilities: string[];
  };
  quality: {
    level: "draft" | "community" | "verified" | "featured";
    score: number;
    installs: number;
    testStatus: "untested" | "passing" | "failing" | "blocked";
  };
  provenance: {
    source: string;
    license: string;
    sharePolicy: "original" | "clean_room_rewrite" | "vendor_provided" | "community_import";
    notes?: string;
  };
};

export const skillsLabPackages = packagesJson as SkillsLabPackage[];

export function computeSkillsLabStats() {
  return {
    packages: skillsLabPackages.length,
    skills: skillsLabPackages.filter((item) => item.kind === "skill").length,
    luaScripts: skillsLabPackages.filter((item) => item.kind === "lua_script").length,
    bundles: skillsLabPackages.filter((item) => item.kind === "bundle").length,
    verified: skillsLabPackages.filter((item) => item.quality.level === "verified" || item.quality.level === "featured").length
  };
}
