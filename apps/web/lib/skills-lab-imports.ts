import importsJson from "../../../datasets/skills-lab/imports/esp-claw-skills-lab.metadata.json";
import reviewQueueJson from "../../../datasets/skills-lab/review-queue.json";
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

export type SkillsLabReview = {
  id: string;
  importedSkillId: string;
  upstreamSkillId: string;
  title: string;
  riskLevel: "low" | "medium" | "high" | "unknown";
  recommendedStatus: "metadata_only" | "manual_review" | "sandbox_required" | "blocked";
  findings: Array<{
    ruleId: string;
    severity: "low" | "medium" | "high";
    message: string;
    matchedTerms: string[];
  }>;
  decision: string;
  reviewer: string | null;
  reviewedAt: string | null;
  source: {
    repository: string;
    path: string;
    url: string;
  };
};

export type SkillsLabReviewQueue = {
  upstreamId: string;
  generatedAt: string;
  summary: Record<string, number>;
  reviews: SkillsLabReview[];
};

export const skillsLabImportSnapshot = importsJson as SkillsLabImportSnapshot;
export const skillsLabReviewQueue = reviewQueueJson as SkillsLabReviewQueue;
export const skillsLabUpstreams = upstreamsJson as SkillsLabUpstream[];
