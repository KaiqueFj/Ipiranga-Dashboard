import { OrgConfig, SectionDefinition } from "../types/type";

const SECTIONS_CORP: SectionDefinition[] = [
  {
    sectionTitle: "Sistemas Corporativos",
    services: [
      {
        service: "JD Edwards",
        title: "JDE (Em construção)",
        query: '(priority:(p1 OR p2) AND jde AND tag:("dashboard:site"))',
        dashboardLink:
          "https://app.datadoghq.com/dashboard/r3a-f95-2zx?fromUser=false&refresh_mode=sliding&from_ts=1774868183061&to_ts=1774882583061&live=true",
      },
      {
        service: "Siebel",
        title: "Siebel",
        query: `
            ( tag:("plataforma:ipiranga") OR tag:("plataforma:ipiranga-corporativo") OR tag:("plataforma:ipiranga-marketing")) AND siebel AND tag:("dashboard:site")`,
        dashboardLink:
          "https://app.datadoghq.com/dashboard/3ic-6gh-68e/ipiranga-overview-siebel?fromUser=false&refresh_mode=sliding&from_ts=1774879033207&to_ts=1774882633207&live=true",
      },
      {
        service: "APCO",
        title: "APCO",
        query: `(tag:("plataforma:ipiranga") OR tag:("plataforma:ipiranga-corporativo") OR tag:("plataforma:ipiranga-marketing")) AND APCO AND tag:("dashboard:site")`,
        dashboardLink:
          "https://app.datadoghq.com/dashboard/c8a-eid-guq/ipiranga-boc-overview-fluxo-apco-v2?fromUser=false&refresh_mode=sliding&from_ts=1774879068299&to_ts=1774882668299&live=true",
      },
      {
        service: "Aprix",
        title: "Aprix",
        query: 'tag:("service:aprix") tag:("dashboard:site")',
        dashboardLink:
          "https://app.datadoghq.com/dashboard/5y2-mpi-bsf?fromUser=true&refresh_mode=sliding&from_ts=1767890597823&to_ts=1767976997823&live=true",
      },
      {
        service: "App do motorista",
        title: "App do motorista (em construção)",
        query: `"[Ipiranga]" muted:false tag:("projeto:appMotorista")`,
        dashboardLink:
          "https://app.datadoghq.com/dashboard/vtw-a26-634?fromUser=false&refresh_mode=sliding&from_ts=1774879141433&to_ts=1774882741433&live=true",
      },
      {
        service: "Chatbot",
        title: "Chatbot",
        query: `"[Ipiranga]" status:ok tag:("service:ChatBot")`,
        dashboardLink:
          "https://app.datadoghq.com/dashboard/g8z-hz2-5t9/ipiranga-overview-chat-bot?fromUser=false&refresh_mode=sliding&from_ts=1774879185440&to_ts=1774882785440&live=true",
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
        dashboardLink:
          "https://app.datadoghq.com/dashboard/ptx-yqn-cyq/ipiranga-boc-overview-fluxo-portal-ri-v2?fromUser=false&refresh_mode=sliding&from_ts=1768329035639&to_ts=1768332635639&live=true",
      },
      {
        service: "Ipiranga Top",
        title: "Ipiranga Top",
        query: 'tag:("service:ipirangatop") tag:("dashboard:site")',
        dashboardLink: "https://app.datadoghq.com/dashboard/jqc-e5d-zvx/ipiranga-ipiranga-top",
      },
      {
        service: "Clube vip",
        title: "Clube vip",
        query: '"[Ipiranga]" status:ok muted:false tag:("service:clube vip")',
        dashboardLink: "https://app.datadoghq.com/dashboard/z4w-6ir-7zg/ipiranga-clube-vip",
      },
      {
        service: "Site de marca",
        title: "Site da marca",
        query: '"[Ipiranga]" muted:false tag:("service:site da marca")',
        dashboardLink: "https://app.datadoghq.com/dashboard/fsg-7c9-h8c/ipiranga-site-da-marca",
      },
      {
        service: "Automações Ipiranga",
        title: "Automações Ipiranga",
        query: '"[Ipiranga]" AND robopix priority:(p1 OR p2) tag:("dashboard:site")',
        dashboardLink:
          "https://app.datadoghq.com/dashboard/yk8-f23-786/ipiranga-robs-e-automaes-overview-geral?fromUser=false&refresh_mode=sliding&from_ts=1774868551224&to_ts=1774882951224&live=true",
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
        dashboardLink:
          "https://app.datadoghq.com/dashboard/3q6-kjt-n46/kmv-boc---overview-servios-crticos-e-infraestrutura-relacionada?fromUser=false&refresh_mode=sliding&from_ts=1748892871197&to_ts=1748896471197&live=true",
      },

      {
        service: "Abastecimento de profrotas",
        title: "Transacional Profrotas",
        query:
          '(priority:(p1 OR p2) tag:("impacto:Meios de pagamento" OR "categoria:queda-transacional" OR "categoria:queda-api" OR "impacto:Login") tag:"plataforma:Profrotas" AND tag:"contexto:abastecimento-profrotas")',
        orgOverride: "digital",
        dashboardLink:
          "https://app.datadoghq.com/dashboard/bcj-fvx-w5a/pr-frotas-boc-overview-servios-crticos-e-infraestrutura-relacionada?fromUser=false&refresh_mode=sliding&from_ts=1748614559279&to_ts=1748628959279&live=true",
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
