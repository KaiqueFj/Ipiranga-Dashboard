import { Monitor } from "../types/type";

const BASE_URL = "https://api.datadoghq.com/api/v1/monitor/search";

export async function searchMonitors(query: string, apiKey: string, appKey: string): Promise<Monitor[]> {
  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(`${BASE_URL}?query=${encodedQuery}`, {
    headers: {
      "DD-API-KEY": apiKey,
      "DD-APPLICATION-KEY": appKey,
    },
    next: { revalidate: 60 }, // 1 minute cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch monitors from Datadog");
  }

  const result = await response.json();

  return result.monitors || [];
}
