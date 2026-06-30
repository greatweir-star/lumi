#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(root, "datasets/skills-lab/imports/esp-claw-skills-lab.metadata.json");

const upstream = {
  upstreamId: "esp-claw-skills-lab",
  repository: "espressif/esp-claw-skills-lab",
  branch: "master",
  skillsRoot: "skills",
  syncMode: "metadata_only"
};

const apiBase = `https://api.github.com/repos/${upstream.repository}`;
const rawBase = `https://raw.githubusercontent.com/${upstream.repository}/${upstream.branch}`;

async function githubJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/vnd.github+json",
      "user-agent": "lumiforge-skills-lab-sync"
    }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function githubText(url) {
  const response = await fetch(url, { headers: { "user-agent": "lumiforge-skills-lab-sync" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
}

function parseSkillMd(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, title: "", body: raw };
  let frontmatter = {};
  try {
    frontmatter = JSON.parse(match[1]);
  } catch (error) {
    frontmatter = { parseError: String(error) };
  }
  const body = match[2];
  const titleMatch = body.match(/^#\s+(.+)$/m);
  return { frontmatter, title: titleMatch ? titleMatch[1].trim() : String(frontmatter.name ?? ""), body };
}

function classifyFiles(tree, skillDir) {
  const prefix = `${skillDir}/`;
  const files = tree
    .filter((item) => item.type === "blob" && item.path.startsWith(prefix))
    .map((item) => item.path.slice(prefix.length));
  return {
    files,
    extraFiles: {
      references: files.filter((item) => item.startsWith("references/")).map((item) => item.slice("references/".length)),
      scripts: files.filter((item) => item.startsWith("scripts/")).map((item) => item.slice("scripts/".length)),
      assets: files.filter((item) => item.startsWith("assets/")).map((item) => item.slice("assets/".length))
    }
  };
}

function toMetadataItem(skillId, raw, tree) {
  const { frontmatter, title } = parseSkillMd(raw);
  const metadata = frontmatter.metadata && typeof frontmatter.metadata === "object" ? frontmatter.metadata : {};
  const skillDir = `${upstream.skillsRoot}/${skillId}`;
  const { files, extraFiles } = classifyFiles(tree, skillDir);
  return {
    id: `esp_claw_${skillId.replace(/[^a-zA-Z0-9_]/g, "_")}`,
    upstreamSkillId: skillId,
    name: String(frontmatter.name ?? skillId),
    title,
    description: String(frontmatter.description ?? ""),
    author: String(frontmatter.author ?? ""),
    metadata,
    files,
    extraFiles,
    source: {
      repository: upstream.repository,
      path: `${skillDir}/SKILL.md`,
      url: `https://github.com/${upstream.repository}/tree/${upstream.branch}/${skillDir}`
    },
    security: {
      reviewStatus: "unreviewed",
      riskLevel: "unknown",
      warnings: ["Metadata imported only. Review third-party Skill/Lua before install or redistribution."]
    }
  };
}

async function main() {
  const treeResponse = await githubJson(`${apiBase}/git/trees/${upstream.branch}?recursive=1`);
  const tree = Array.isArray(treeResponse.tree) ? treeResponse.tree : [];
  const skillIds = tree
    .filter((item) => item.type === "blob" && item.path.startsWith(`${upstream.skillsRoot}/`) && item.path.endsWith("/SKILL.md"))
    .map((item) => item.path.split("/")[1])
    .sort();

  const limitArg = Number(process.argv.find((arg) => arg.startsWith("--limit="))?.split("=")[1] ?? "0");
  const selectedSkillIds = limitArg > 0 ? skillIds.slice(0, limitArg) : skillIds;
  const items = [];
  for (const skillId of selectedSkillIds) {
    const raw = await githubText(`${rawBase}/${upstream.skillsRoot}/${skillId}/SKILL.md`);
    items.push(toMetadataItem(skillId, raw, tree));
  }

  const snapshot = {
    upstreamId: upstream.upstreamId,
    repository: upstream.repository,
    branch: upstream.branch,
    syncMode: upstream.syncMode,
    syncedAt: new Date().toISOString(),
    totalSkillsDiscovered: skillIds.length,
    items
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Imported ${items.length}/${skillIds.length} metadata entries into ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
