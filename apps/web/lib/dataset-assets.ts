import skillTestsJson from "../../../datasets/skill-tests/skill-tests.json";
import compatibilityJson from "../../../datasets/compatibility/compatibility-matrix.json";

export type SkillTestAsset = {
  id: string;
  skillId: string;
  target: {
    runtimeProfile: string;
    hardwareClaw: string;
    chip?: string;
  };
  quality: {
    priority: string;
    status: string;
    notes?: string;
  };
};

export type CompatibilityAsset = {
  id: string;
  hardwareClaw: string;
  runtimeProfile: string;
  skillIds: string[];
  status: string;
  coverage: Record<string, string>;
  metrics: Record<string, number | string | null>;
  notes: string;
};

export const skillTests = skillTestsJson as SkillTestAsset[];
export const compatibilityMatrix = compatibilityJson as CompatibilityAsset[];
