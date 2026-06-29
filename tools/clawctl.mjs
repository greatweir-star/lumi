#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
  claws: join(root, "datasets/claws/claws.json"),
  skills: join(root, "templates/skills/skills.json"),
  skillTests: join(root, "datasets/skill-tests/skill-tests.json"),
  compatibility: join(root, "datasets/compatibility/compatibility-matrix.json"),
  resultsDir: join(root, "datasets/results")
};

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function scoreClaw(claw) {
  const quality = claw.quality?.score ?? 0;
  const capabilityBonus = Math.min((claw.capabilities?.length ?? 0) * 2, 20);
  const runtimeBonus = Math.min((claw.runtimeProfiles?.length ?? 0) * 5, 15);
  const skillBonus = Math.min((claw.skills?.length ?? 0) * 3, 15);
  const testedBonus = claw.quality?.tested ? 20 : 0;
  return Math.min(100, quality + capabilityBonus + runtimeBonus + skillBonus + testedBonus);
}

function stats() {
  const claws = readJson(paths.claws);
  const skills = readJson(paths.skills);
  const tests = readJson(paths.skillTests);
  const matrix = readJson(paths.compatibility);
  const avg = claws.length ? claws.reduce((sum, claw) => sum + scoreClaw(claw), 0) / claws.length : 0;
  console.log(JSON.stringify({ claws: claws.length, skills: skills.length, skillTests: tests.length, compatibilityRows: matrix.length, averageScore: Number(avg.toFixed(2)) }, null, 2));
}

function validate() {
  const claws = readJson(paths.claws);
  const skills = new Set(readJson(paths.skills).map((skill) => skill.id));
  const tests = readJson(paths.skillTests);
  const errors = [];
  for (const claw of claws) {
    for (const skill of claw.skills ?? []) if (!skills.has(skill)) errors.push(`${claw.id}: missing skill ${skill}`);
    if (claw.provenance?.rewritePolicy !== "clean_room_rewrite") errors.push(`${claw.id}: rewritePolicy should be clean_room_rewrite before production use`);
    if (!Array.isArray(claw.artifacts) || claw.artifacts.length === 0) errors.push(`${claw.id}: artifacts required`);
  }
  for (const test of tests) {
    if (!skills.has(test.skillId)) errors.push(`${test.id}: missing skill ${test.skillId}`);
  }
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log("Claw dataset validation passed.");
}

function observationFor(test) {
  const memory = test.skillId.includes("memory") || test.id.includes("memory");
  return {
    output: memory ? "已记住桌面机器人" : "你好 capability tool ready",
    calledTools: memory ? ["memory_write"] : ["get_current_time", "heap_info"],
    wroteMemory: memory,
    latencyMs: 120
  };
}

function evaluate(test, observation) {
  const failures = [];
  for (const tool of test.expected?.mustCallTools ?? []) {
    if (!observation.calledTools.includes(tool)) failures.push(`missing tool: ${tool}`);
  }
  if (test.expected?.mustWriteMemory === true && !observation.wroteMemory) failures.push("missing memory write");
  if (typeof test.expected?.maxLatencyMs === "number" && observation.latencyMs > test.expected.maxLatencyMs) failures.push("latency exceeded");
  for (const text of test.expected?.expectedOutputContains ?? []) {
    if (!observation.output.includes(text)) failures.push(`missing output: ${text}`);
  }
  return { id: test.id, skillId: test.skillId, passed: failures.length === 0, failures };
}

function test() {
  const tests = readJson(paths.skillTests);
  const results = tests.map((item) => evaluate(item, observationFor(item)));
  const passed = results.filter((item) => item.passed).length;
  console.log(JSON.stringify({ summary: { total: results.length, passed, failed: results.length - passed, passRate: results.length ? passed / results.length : 0 }, results }, null, 2));
}

function writeResult() {
  const [, , , testId = "manual-test", status = "draft"] = process.argv;
  const outputPath = join(paths.resultsDir, `${testId}.json`);
  writeJson(outputPath, {
    id: testId,
    status,
    capturedAt: new Date().toISOString(),
    source: "clawctl",
    metrics: { latencyMs: null, flashKb: null, ramKb: null, bootMs: null, passRate: null },
    logs: [],
    notes: "Manual result placeholder. Replace metrics after hardware run."
  });
  console.log(`Wrote ${outputPath}`);
}

function help() {
  console.log(`Usage: node tools/clawctl.mjs <command>\n\nCommands:\n  stats                         Print dataset stats\n  validate                      Validate basic dataset consistency\n  test                          Run mock Skill Test evaluator\n  write-result <testId> <status> Write a hardware test result placeholder\n`);
}

const command = process.argv[2];
if (!command || command === "help") help();
else if (command === "stats") stats();
else if (command === "validate") validate();
else if (command === "test") test();
else if (command === "write-result") writeResult();
else {
  console.error(`Unknown command: ${command}`);
  help();
  process.exitCode = 1;
}
