import { searchMonitors } from "../repository/monitors-repository";
import { Monitor, OrgConfig, SectionResponse, ServiceStatus } from "../types/type";

function calculateStatus(monitors: Monitor[]): {
  status: "OK" | "WARN" | "ALERT";
  alertCount: number;
} {
  const states = monitors.map((m) => m.overall_state ?? m.status ?? "OK");

  const alertCount = states.filter((s) => s === "Alert").length;
  const hasWarn = states.includes("Warn");

  if (alertCount > 0) return { status: "ALERT", alertCount };
  if (hasWarn) return { status: "WARN", alertCount: 0 };
  return { status: "OK", alertCount: 0 };
}

export async function buildSections(config: OrgConfig): Promise<SectionResponse[]> {
  return Promise.all(
    config.sections.map(async (section) => {
      const services: ServiceStatus[] = await Promise.all(
        section.services.map(async (serviceDef) => {
          const monitors = await searchMonitors(serviceDef.query, config.apiKey, config.appKey);

          const { status, alertCount } = calculateStatus(monitors);

          return {
            service: serviceDef.service,
            title: serviceDef.title,
            status,
            alertCount,
          };
        }),
      );

      return {
        title: section.sectionTitle,
        services,
      };
    }),
  );
}
