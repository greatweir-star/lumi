import clawsJson from "../../../datasets/claws/claws.json";

export type ClawPackage = {
  id: string;
  name: string;
  kind: "hardware" | "runtime" | "skill" | "compatibility" | "evaluation";
  target: {
    chip: string;
    board: string;
    vendor?: string;
  };
  quality: {
    level: "draft" | "bench_tested" | "field_tested" | "production_ready";
    score: number;
    tested: boolean;
    notes?: string;
  };
  capabilities: string[];
  runtimeProfiles: string[];
  skills: string[];
  artifacts: Array<{ type: string; path: string; sha256?: string }>;
  provenance: {
    source: string;
    license: string;
    rewritePolicy: "clean_room_rewrite" | "original" | "vendor_provided" | "unknown";
    notes?: string;
  };
};

export const clawPackages = clawsJson as ClawPackage[];

export function computeClawStats() {
  return {
    claws: clawPackages.length,
    hardwareClaws: clawPackages.filter((item) => item.kind === "hardware").length,
    testedClaws: clawPackages.filter((item) => item.quality.tested).length,
    avgScore: clawPackages.length
      ? Math.round(clawPackages.reduce((sum, item) => sum + item.quality.score, 0) / clawPackages.length)
      : 0
  };
}
