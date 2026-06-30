import importsJson from "../../../datasets/skills-lab/imports/esp-claw-skills-lab.metadata.json";
import upstreamsJson from "../../../datasets/skills-lab/upstreams.json";

export type SkillsLabImportItem = {
  id: string;
  upstreamSkillId: string;
  name: string;
  title: string;
  description: string;
  author: string;
  metadata: {
    category?: string[];
    tags?: string[];
    peripherals?: string[];
    cap_groups?: string[];
    manage_mode?: string;
  };
  files: string[];
  extraFiles: {
    references: string[];
    scripts: string[];
    assets: string[];
  };
  source: {
    repository: string;
    path: string;
    url: string;
  };
  security: {
    reviewStatus: string;
    riskLevel: string;
    warnings: string[];
  };
};

export type SkillsLabImportSnapshot = {
  upstreamId: string;
  repository: string;
  branch: string;
  syncMode: string;
  syncedAt: string;
  totalSkillsDiscovered?: number;
  items: SkillsLabImportItem[];
};

export type SkillsLabUpstream = {
  id: string;
  name: string;
  type: string;
  repository: string;
  branch: string;
  skillsRoot: string;
  siteUrl: string;
  licensePolicy: string;
  syncMode: string;
  securityPolicy: Record<string, unknown>;
  notes: string;
};

export const skillsLabImportSnapshot = importsJson as SkillsLabImportSnapshot;
export const skillsLabUpstreams = upstreamsJson as SkillsLabUpstream[];
