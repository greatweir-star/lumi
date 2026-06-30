export type SkillsLabReviewSeverity = "low" | "medium" | "high";

export type SkillsLabReviewRule = {
  id: string;
  severity: SkillsLabReviewSeverity;
  match: string[];
  message: string;
};

export type ImportedSkillMetadata = {
  id: string;
  upstreamSkillId: string;
  name: string;
  title?: string;
  description: string;
  metadata?: {
    category?: string[];
    tags?: string[];
    peripherals?: string[];
    cap_groups?: string[];
    manage_mode?: string;
  };
  files?: string[];
  extraFiles?: {
    references?: string[];
    scripts?: string[];
    assets?: string[];
  };
};

export type SkillsLabReviewFinding = {
  ruleId: string;
  severity: SkillsLabReviewSeverity;
  message: string;
  matchedTerms: string[];
};

export type SkillsLabReviewResult = {
  id: string;
  upstreamSkillId: string;
  riskLevel: "low" | "medium" | "high" | "unknown";
  recommendedStatus: "metadata_only" | "manual_review" | "sandbox_required" | "blocked";
  findings: SkillsLabReviewFinding[];
};

function corpusFor(item: ImportedSkillMetadata): string {
  return [
    item.id,
    item.upstreamSkillId,
    item.name,
    item.title ?? "",
    item.description,
    ...(item.metadata?.category ?? []),
    ...(item.metadata?.tags ?? []),
    ...(item.metadata?.peripherals ?? []),
    ...(item.metadata?.cap_groups ?? []),
    item.metadata?.manage_mode ?? "",
    ...(item.files ?? []),
    ...(item.extraFiles?.scripts ?? []),
    ...(item.extraFiles?.references ?? []),
    ...(item.extraFiles?.assets ?? [])
  ].join(" ").toLowerCase();
}

export function reviewImportedSkillMetadata(
  item: ImportedSkillMetadata,
  rules: SkillsLabReviewRule[]
): SkillsLabReviewResult {
  const corpus = corpusFor(item);
  const findings = rules.flatMap((rule) => {
    const matchedTerms = rule.match.filter((term) => corpus.includes(term.toLowerCase()));
    return matchedTerms.length
      ? [{ ruleId: rule.id, severity: rule.severity, message: rule.message, matchedTerms }]
      : [];
  });

  const hasHigh = findings.some((finding) => finding.severity === "high");
  const hasMedium = findings.some((finding) => finding.severity === "medium");
  const riskLevel = hasHigh ? "high" : hasMedium ? "medium" : findings.length ? "low" : "unknown";
  const recommendedStatus = hasHigh
    ? "sandbox_required"
    : hasMedium
      ? "manual_review"
      : findings.length
        ? "metadata_only"
        : "manual_review";

  return {
    id: item.id,
    upstreamSkillId: item.upstreamSkillId,
    riskLevel,
    recommendedStatus,
    findings
  };
}
