import { OrgConfig, SectionDefinition } from "../types/type";

const SECTIONS_CORP: SectionDefinition[] = [
  {
    sectionTitle: "Sistemas Corporativos",
    services: [
      {
        service: "JD Edwards",
        title: "JDE ",
        query: '(priority:(p1 OR p2) AND jde AND -ssl tag:("dashboard:site"))',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-d02b8325d79af5d4d91e7f9caff3e823?fromUser=false&refresh_mode=sliding&tpl_var_Endpoint%5B0%5D=%2A&from_ts=1775122750377&to_ts=1775137150377&live=true",
      },
      {
        service: "Siebel",
        title: "Siebel",
        query: `
             -ssl ( tag:("plataforma:ipiranga") OR tag:("plataforma:ipiranga-corporativo") OR tag:("plataforma:ipiranga-marketing")) AND siebel AND tag:("dashboard:site")`,
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-45ad9c6441a3d69fbeb77064fd2bb8c1",
      },
      {
        service: "APCO",
        title: "APCO",
        query: `(tag:("plataforma:ipiranga") OR tag:("plataforma:ipiranga-corporativo") OR tag:("plataforma:ipiranga-marketing")) AND APCO AND -ssl tag:("dashboard:site")`,
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-2de33b5115a960e731ca4fff619bcd34",
      },
      {
        service: "Aprix",
        title: "Aprix",
        query: 'tag:("service:aprix") -ssl tag:("dashboard:site")',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-bfc8ba14a2c471818003820c84db830e",
      },
      {
        service: "App do motorista",
        title: "App do motorista (em construção)",
        query: `"[Ipiranga]" muted:false -ssl tag:("projeto:appMotorista")`,
        maintenance: true,

        dashboardLink:
          "https://app.datadoghq.com/dashboard/vtw-a26-634?fromUser=false&refresh_mode=sliding&from_ts=1774879141433&to_ts=1774882741433&live=true",
      },
      {
        service: "Chatbot",
        title: "Chatbot",
        query: `"[Ipiranga]" status:ok -ssl  tag:("service:ChatBot")`,
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-b16d611f346a15ede8c042396d7f3577",
      },
    ],
  },
  {
    sectionTitle: "Produtos digitais",
    services: [
      {
        service: "Portal Ipiranga",
        title: "PortalRI",
        query: 'portalri priority:(p1 OR p2) AND muted:false -ssl tag:("dashboard:site")',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-7e528c273ae899a580a04401590570d5",
      },
      {
        service: "Ipiranga Top",
        title: "Ipiranga Top",
        query: 'tag:("service:ipirangatop") -ssl tag:("dashboard:site")',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-24abe02111855faf2427320d03c532db",
      },
      {
        service: "Clube vip",
        title: "Clube vip",
        query: '"[Ipiranga]" status:ok muted:false -ssl tag:("service:clube vip")',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-45a9e55addf23ae40d1d4e807b61a043",
      },
      {
        service: "Site de marca",
        title: "Site da marca",
        query: '"[Ipiranga]" muted:false -ssl tag:("service:site da marca")',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-364962de2f039b27b6dccb545dfa4267",
      },
      {
        service: "Automações Ipiranga",
        title: "Automações Ipiranga",
        query: '"[Ipiranga]" AND robopix priority:(p1 OR p2) -ssl tag:("dashboard:site")',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-81a57921e6b26fadb6b8b5914d0410cb",
      },
      {
        service: "Sefaz",
        title: "Sefaz",
        query: '"[SEFAZ] [StatusPage]"  tag:("dashboard:site")',
        dashboardLink:
          "https://p.datadoghq.com/sb/e6ba99a2-3062-11ed-84b0-da7ad0900002-81a57921e6b26fadb6b8b5914d0410cb",
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
          'priority:(p1 OR p2) -ssl tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login" OR "categoria:degradação") tag:("service:Capturas-Autorização-de-pagamento")',
        orgOverride: "digital",
        dashboardLink:
          "https://p.datadoghq.com/sb/1c68d43a-33fc-11ef-8efb-fab1c81556b3-e17b395584de0c692feab63d2a3fa6ef",
      },

      {
        service: "Abastecimento de profrotas",
        title: "Transacional Profrotas",
        query:
          '(priority:(p1 OR p2) -ssl tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:"plataforma:Profrotas" AND tag:"contexto:abastecimento-profrotas")',
        orgOverride: "digital",
        dashboardLink:
          "https://p.datadoghq.com/sb/1c68d43a-33fc-11ef-8efb-fab1c81556b3-4f35f3776e61542fc54d038e7f3dda70",
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
