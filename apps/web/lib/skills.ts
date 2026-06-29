import skillsJson from "../../../templates/skills/skills.json";

export type SkillCatalogItem = {
  id: string;
  name: string;
  entry: "SKILL.md";
  description: string;
  permissions: string[];
  triggers: string[];
  requiresCapabilities: string[];
  installSource: string;
  trustLevel: string;
  mvpStatus: string;
};

export const skillCatalog = skillsJson as SkillCatalogItem[];
