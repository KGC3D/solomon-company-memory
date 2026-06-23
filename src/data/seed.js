export const rawSources = [
  {
    id: 1,
    type: "URL",
    title: "Crumbl expansion analysis",
    source: "crumbl-growth.memo",
    status: "Wiki generated",
    time: "8:12 AM",
    concepts: ["franchise velocity", "local demand", "menu rotation"],
  },
  {
    id: 2,
    type: "Notion",
    title: "Q3 customer research",
    source: "Notion / Research",
    status: "Entities extracted",
    time: "9:04 AM",
    concepts: ["buyer pain", "team memory", "switching cost"],
  },
  {
    id: 3,
    type: "Slack",
    title: "Support thread: onboarding gaps",
    source: "#customer-success",
    status: "Needs review",
    time: "9:47 AM",
    concepts: ["activation", "missing docs", "sales enablement"],
  },
];

export const wikiPages = [
  {
    title: "Crumbl Cookies Market Map",
    updated: "Generated 12 min ago",
    summary:
      "Synthesizes growth signals, regional demand patterns, franchise economics, and content loops into a reusable company research page.",
    links: ["Franchise velocity", "Local demand signals", "Consumer taste cycles"],
  },
  {
    title: "Second Brain Buying Criteria",
    updated: "Updated today",
    summary:
      "Teams switch when capture is automatic, trust is source-backed, and agents can reuse context without manual copy-paste.",
    links: ["Agent-ready context", "Knowledge graph", "Daily brief"],
  },
];

export const recommendations = [
  "Find 3 new sources on Crumbl franchise churn before tomorrow's strategy review.",
  "Turn the onboarding Slack thread into a support enablement wiki page.",
  "Connect Linear project notes to the Q3 customer research page.",
];

export const graphNodes = [
  { label: "Raw sources", x: 46, y: 48, size: "large" },
  { label: "Crumbl", x: 31, y: 28 },
  { label: "Franchise velocity", x: 63, y: 24 },
  { label: "Daily brief", x: 73, y: 54 },
  { label: "Agent context", x: 48, y: 74 },
  { label: "Notion research", x: 22, y: 67 },
];
