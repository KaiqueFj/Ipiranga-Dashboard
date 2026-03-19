import { OrgConfig, SectionDefinition } from "../types/type";

const SECTIONS_CORP: SectionDefinition[] = [
  {
    sectionTitle: "Sistemas Corporativos",
    services: [
      { service: "JD Edwards", title: "JDE", query: '(priority:(p1 OR p2) AND jde AND tag:("dashboard:site"))' },
      {
        service: "Siebel",
        title: "Siebel",
        query: `
            ( tag:("plataforma:ipiranga") OR tag:("plataforma:ipiranga-corporativo") OR tag:("plataforma:ipiranga-marketing")) AND siebel AND tag:("dashboard:site")`,
      },
      {
        service: "APCO",
        title: "APCO",
        query: `(tag:("plataforma:ipiranga") OR tag:("plataforma:ipiranga-corporativo") OR tag:("plataforma:ipiranga-marketing")) AND APCO AND tag:("dashboard:site")`,
      },
      { service: "Aprix", title: "Aprix", query: 'tag:("service:aprix") tag:("dashboard:site")' },
      {
        service: "App do motorista",
        title: "App do motorista",
        query: `"[Ipiranga]" muted:false tag:("projeto:appMotorista")`,
      },
      {
        service: "Chatbot",
        title: "Chatbot",
        query: `"[Ipiranga]"  tag:("service:ChatBot")`,
      },
    ],
  },
  {
    sectionTitle: "Produtos digitais",
    services: [
      {
        service: "Portal Ipiranga",
        title: "PortalRI",
        query: 'portalri priority:(p1 OR p2) AND muted:false tag:("dashboard:site")',
      },
      { service: "Ipiranga Top", title: "Ipiranga Top", query: 'tag:("service:ipirangatop") tag:("dashboard:site")' },
      { service: "Clube vip", title: "Clube vip", query: '"[Ipiranga]" muted:false tag:("service:clube vip")' },
      {
        service: "Site de marca",
        title: "Site da marca",
        query: '"[Ipiranga]" muted:false tag:("service:site da marca")',
      },
      {
        service: "Automações Ipiranga",
        title: "Automações Ipiranga",
        query: '"[Ipiranga]" AND robopix tag:("dashboard:site")',
      },
    ],
  },

  {
    sectionTitle: "Fluxos de negócio",
    services: [
      {
        service: "Capturas e Autorização de pagamento",
        title: "Transacional Kmv",
        query:
          'priority:(p1 OR p2) tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:("service:Capturas-Autorização-de-pagamento")',
        orgOverride: "digital",
      },
      {
        service: "Pedido Digitado",
        title: "Transacional Conecta",
        query:
          '(priority:(p1 OR p2) tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:("plataforma:conecta") AND tag:"service:Pedido-digitado")',
        orgOverride: "digital",
      },
      {
        service: "Abastecimento de profrotas",
        title: "Transacional Profrotas",
        query:
          '(priority:(p1 OR p2) tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:"plataforma:Profrotas" AND tag:"contexto:abastecimento-profrotas")',
        orgOverride: "digital",
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
    sections: [],
  },
};
