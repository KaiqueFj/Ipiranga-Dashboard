import { OrgConfig, SectionDefinition } from "../types/type";

const SECTIONS_CORP: SectionDefinition[] = [
  {
    sectionTitle: "Overview - Serviços Críticos (ACN Corporativo)",
    services: [
      { service: "JD Edwards", title: "JDE", query: '"[Ipiranga]" muted:false tag:("service:jde")' },
      { service: "Siebel", title: "Siebel", query: '"[Ipiranga]" muted:false tag:("service:siebel")' },
      { service: "APCO", title: "APCO", query: '"[Ipiranga]" muted:false tag:("service:apco")' },
      { service: "Aprix", title: "Aprix", query: '"[Ipiranga]" muted:false tag:("service:aprix")' },
      { service: "Autobasi", title: "Autobasi", query: '"[Ipiranga]" muted:false tag:("service:autobasi")' },
      {
        service: "App do motorista",
        title: "App do motorista",
        query: `"[Ipiranga]" muted:false tag:("projeto:appMotorista")`,
      },
      { service: "Chatbot", title: "Chatbot", query: '"[Ipiranga]" muted:false tag:("service:ChatBOT")' },
    ],
  },
  {
    sectionTitle: "Overview - Plataformas e Parceiros dos serviços digitais",
    services: [
      { service: "Portal Ipiranga", title: "PortalRI", query: '"[Ipiranga]" muted:false tag:("service:PortalRi")' },
      { service: "Ipiranga Top", title: "Ipiranga Top", query: '"[Ipiranga]" muted:false tag:("service:ipirangatop")' },
      { service: "Clube vip", title: "Clube vip", query: '"[Ipiranga]" muted:false tag:("service:clube vip")' },
      {
        service: "Site de marca",
        title: "Site da marca",
        query: '"[Ipiranga]" muted:false tag:("service:site da marca")',
      },
    ],
  },
];

/* ===========================
   DIGITAL ORG
=========================== */

const SECTIONS_DIGITAL: SectionDefinition[] = [
  {
    sectionTitle: "Overview - Serviços Digitais",
    services: [
      {
        service: "Capturas e Autorização de pagamento",
        title: "Transacional Kmv",
        query:
          'priority:(p1 OR p2) tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:("service:Capturas-Autorização-de-pagamento")',
      },
      {
        service: "Pedido Digitado",
        title: "Transacional Conecta",
        query:
          '(priority:(p1 OR p2) tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:("plataforma:conecta") AND tag:"service:Pedido-digitado")',
      },
      {
        service: "Abastecimento de profrotas",
        title: "Transacional Profrotas",
        query:
          '(priority:(p1 OR p2) tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:"plataforma:Profrotas" AND tag:"contexto:abastecimento-profrotas")',
      },
    ],
  },
];

/* ===========================
   ORG CONFIG
=========================== */

export const ORG_CONFIG: Record<string, OrgConfig> = {
  corp: {
    apiKey: process.env.DD_CORP_API_KEY!,
    appKey: process.env.DD_CORP_APP_KEY!,
    sections: SECTIONS_CORP,
  },
  digital: {
    apiKey: process.env.DD_DIGITAL_API_KEY!,
    appKey: process.env.DD_DIGITAL_APP_KEY!,
    sections: SECTIONS_DIGITAL,
  },
};
