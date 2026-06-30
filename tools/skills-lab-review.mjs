#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
  imports: join(root, "datasets/skills-lab/imports/esp-claw-skills-lab.metadata.json"),
  rules: join(root, "datasets/skills-lab/review-rules.json"),
  output: join(root, "datasets/skills-lab/review-queue.json")
};

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function corpusFor(item) {
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

function review(item, rules) {
  const corpus = corpusFor(item);
  const findings = [];
  for (const rule of rules) {
    const matchedTerms = rule.match.filter((term) => corpus.includes(String(term).toLowerCase()));
    if (matchedTerms.length) {
      findings.push({ ruleId: rule.id, severity: rule.severity, message: rule.message, matchedTerms });
    }
  }
  const hasHigh = findings.some((finding) => finding.severity === "high");
  const hasMedium = findings.some((finding) => finding.severity === "medium");
  const riskLevel = hasHigh ? "high" : hasMedium ? "medium" : findings.length ? "low" : "unknown";
  const recommendedStatus = hasHigh ? "sandbox_required" : hasMedium ? "manual_review" : findings.length ? "metadata_only" : "manual_review";
  return {
    id: `review_${item.id}`,
    importedSkillId: item.id,
    upstreamSkillId: item.upstreamSkillId,
    title: item.title || item.name,
    riskLevel,
    recommendedStatus,
    findings,
    decision: "pending",
    reviewer: null,
    reviewedAt: null,
    source: item.source
  };
}

function main() {
  const snapshot = readJson(paths.imports);
  const rules = readJson(paths.rules).rules ?? [];
  const items = snapshot.items ?? [];
  const reviews = items.map((item) => review(item, rules));
  const summary = {
    total: reviews.length,
    highRisk: reviews.filter((item) => item.riskLevel === "high").length,
    mediumRisk: reviews.filter((item) => item.riskLevel === "medium").length,
    pending: reviews.filter((item) => item.decision === "pending").length
  };
  const queue = {
    upstreamId: snapshot.upstreamId,
    generatedAt: new Date().toISOString(),
    summary,
    reviews
  };
  writeJson(paths.output, queue);
  console.log(JSON.stringify(summary, null, 2));
}

main();
