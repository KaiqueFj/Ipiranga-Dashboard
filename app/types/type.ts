export type Monitor = {
  id: number;
  name: string;
  overall_state?: string;
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
};

export type SectionResponse = {
  title: string;
  services: ServiceStatus[];
};
