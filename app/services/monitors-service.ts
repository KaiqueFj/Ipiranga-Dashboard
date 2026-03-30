import { searchMonitors } from "../repository/monitors-repository";
import { Monitor, OrgConfig, SectionResponse, ServiceStatus } from "../types/type";
import { ORG_CONFIG } from "./monitors-config";

function calculateStatus(monitors: Monitor[]): {
  status: "OK" | "WARN" | "ALERT";
  alertCount: number;
  statusSince: number | null;
} {
  if (!monitors.length) {
    return { status: "OK", alertCount: 0, statusSince: null };
  }

  const alertMonitors = monitors.filter((m) => (m.overall_state ?? m.status) === "Alert");

  const warnMonitors = monitors.filter((m) => (m.overall_state ?? m.status) === "Warn");

  if (alertMonitors.length > 0) {
    const oldestAlert = alertMonitors.reduce((prev, curr) =>
      curr.overall_state_modified < prev.overall_state_modified ? curr : prev,
    );

    return {
      status: "ALERT",
      alertCount: alertMonitors.length,
      statusSince: oldestAlert.overall_state_modified,
    };
  }

  if (warnMonitors.length > 0) {
    const oldestWarn = warnMonitors.reduce((prev, curr) =>
      curr.overall_state_modified < prev.overall_state_modified ? curr : prev,
    );

    return {
      status: "WARN",
      alertCount: warnMonitors.length,
      statusSince: oldestWarn.overall_state_modified,
    };
  }

  return { status: "OK", alertCount: 0, statusSince: null };
}

export async function buildSections(config: OrgConfig): Promise<SectionResponse[]> {
  return Promise.all(
    config.sections.map(async (section) => {
      const services: ServiceStatus[] = await Promise.all(
        section.services.map(async (serviceDef) => {
          const credentials = serviceDef.orgOverride === "digital" ? ORG_CONFIG.digital : config;

          const monitors = await searchMonitors(serviceDef.query, credentials.apiKey, credentials.appKey);
          const { status, alertCount, statusSince } = calculateStatus(monitors);

          return {
            service: serviceDef.service,
            title: serviceDef.title,
            status,
            alertCount,
            statusSince,
            dashboardLink: serviceDef.dashboardLink ?? null,
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
