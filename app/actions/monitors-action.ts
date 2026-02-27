import { ORG_CONFIG } from "../services/monitors-config";
import { buildSections } from "../services/monitors-service";

export async function getMonitorsByOrg(org: string) {
  const config = ORG_CONFIG[org];

  if (!config) {
    throw new Error("Invalid org");
  }

  return buildSections(config);
}
