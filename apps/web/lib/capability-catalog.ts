import catalogJson from "../../../templates/runtime/capability-catalog.json";

export type CapabilityCatalogItem = {
  id: string;
  name: string;
  group: string;
  description: string;
  espClawReference: string;
  lumiForgeModule: string;
  mvpStatus: "designed" | "partial" | "implemented";
};

export const capabilityCatalog = catalogJson as CapabilityCatalogItem[];
