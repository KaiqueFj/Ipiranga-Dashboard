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

  const FIVE_MINUTES = 5 * 60 * 1000;
  const now = Date.now();

  const alertMonitors = monitors.filter((m) => (m.overall_state ?? m.status) === "Alert");

  const warnMonitors = monitors.filter((m) => (m.overall_state ?? m.status) === "Warn");

  // Only consider alerts that have been active for at least 5 minutes
  const activeAlerts = alertMonitors.filter((m) => now - m.overall_state_modified >= FIVE_MINUTES);

  if (activeAlerts.length > 0) {
    const oldestAlert = activeAlerts.reduce((prev, curr) =>
      curr.overall_state_modified < prev.overall_state_modified ? curr : prev,
    );

    return {
      status: "ALERT",
      alertCount: activeAlerts.length,
      statusSince: oldestAlert.overall_state_modified,
    };
  }

  // Only consider warnings that have been active for at least 5 minutes
  const activeWarnings = warnMonitors.filter((m) => now - m.overall_state_modified >= FIVE_MINUTES);

  if (activeWarnings.length > 0) {
    const oldestWarning = activeWarnings.reduce((prev, curr) =>
      curr.overall_state_modified < prev.overall_state_modified ? curr : prev,
    );

    return {
      status: "WARN",
      alertCount: activeWarnings.length,
      statusSince: oldestWarning.overall_state_modified,
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
            status: serviceDef.maintenance ? "MAINTENANCE" : status,
            alertCount: serviceDef.maintenance ? 0 : alertCount,
            statusSince: serviceDef.maintenance ? null : statusSince,
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
