export type Monitor = {
  id: number;
  name: string;
  overall_state?: string;
  overall_state_modified: number;
  status?: string;
};

export type ServiceDefinition = {
  service: string;
  title: string;
  query: string;
};

export type SectionDefinition = {
  sectionTitle: string;
  services: ServiceDefinition[];
};

export type OrgConfig = {
  apiKey: string;
  appKey: string;
  sections: SectionDefinition[];
};

export type ServiceStatus = {
  service: string;
  title: string;
  status: "OK" | "WARN" | "ALERT";
  alertCount: number;
  statusSince: number | null;
};

export type SectionResponse = {
  title: string;
  services: ServiceStatus[];
};

export type Section = {
  title: string;
  services: ServiceStatus[];
};
