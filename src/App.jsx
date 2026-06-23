import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Brain,
  Check,
  Clock3,
  CircleDot,
  GitBranch,
  Link,
  Network,
  Smartphone,
  Plus,
  Search,
  Send,
  Sparkles,
  Workflow,
} from "lucide-react";
import { graphNodes, rawSources, recommendations, wikiPages } from "./data/seed";
import "./styles.css";

const connectors = [
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "GitHub", logo: "/logos/github.svg" },
  { name: "Linear", logo: "/logos/linear.svg" },
  { name: "Webhooks", icon: Workflow },
  { name: "Cron jobs", icon: Clock3 },
];

const painQuotes = [
  {
    quote:
      "I lost dozens and dozen of hours trying to figure out how to make Obsidian simply work, I'm about to drop it. It's driving me nuts.",
    author: "Pretend-Tank5345",
    source:
      "https://www.reddit.com/r/ObsidianMD/comments/1rwopj2/obsidian_is_an_ineffective_nightmare_a/",
  },
  {
    quote:
      "Time consuming, too many problems, too clunky, unintuitive interface, the attachments management is a nightmare, publishing is a nightmare too.",
    author: "Pretend-Tank5345",
    source:
      "https://www.reddit.com/r/ObsidianMD/comments/1rwopj2/obsidian_is_an_ineffective_nightmare_a/",
  },
  {
    quote:
      "I was staring at the graph view like a patient staring at their MRI scan, seeing everything and understanding nothing.",
    author: "jerr9185",
    source:
      "https://www.reddit.com/r/ObsidianMD/comments/1nyg7u3/the_hidden_psychology_behind_the_second_brain_hype/",
  },
];

const stopWords = new Set([
  "www",
  "com",
  "blog",
  "news",
  "article",
  "articles",
  "post",
  "posts",
  "the",
  "and",
  "for",
  "with",
  "from",
  "about",
  "into",
  "your",
  "our",
]);

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (word === "ai") return "AI";
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

function getUrlParts(rawUrl) {
  try {
    const parsed = new URL(rawUrl.includes("://") ? rawUrl : `https://${rawUrl}`);
    const words = `${parsed.hostname} ${parsed.pathname}`
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((word) => word.length > 2 && !stopWords.has(word));

    return {
      host: parsed.hostname.replace(/^www\./, ""),
      source: `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname}`.replace(/\/$/, ""),
      words: [...new Set(words)],
    };
  } catch {
    const words = rawUrl
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((word) => word.length > 2 && !stopWords.has(word));

    return { host: "source", source: rawUrl, words: [...new Set(words)] };
  }
}

function inferSourceIntelligence(rawUrl) {
  const { host, source, words } = getUrlParts(rawUrl);
  const hasFathersDay = words.includes("fathers") && words.includes("day");
  const brand = titleCase(host.split(".")[0] || "Company");

  if (hasFathersDay) {
    return {
      source,
      sourceTitle: "Father's Day cookie campaign",
      wikiPage: {
        title: "Father's Day Cookie Campaign Brief",
        updated: "Generated now",
        summary:
          "Extracted: Father's Day, gifting, seasonal demand, limited-time cookies, and family purchase intent. Solomon linked the campaign to Crumbl's seasonal demand map and queued adjacent holiday campaigns for comparison.",
        links: ["Father's Day", "Gifting", "Seasonal demand", "Limited-time cookies", "Family purchase intent"],
        topic: "Father's Day cookie campaign",
        nextSource: "Mother's Day and Valentine's Day cookie campaigns",
      },
      brief: [
        "Compare Father's Day against Mother's Day and Valentine's Day cookie campaigns.",
        "Find 3 sources on seasonal gifting demand and limited-time menu performance.",
        "Link this campaign to Crumbl's holiday calendar and store-traffic notes.",
      ],
    };
  }

  const conceptWords = words.slice(0, 5);
  const topic = titleCase(conceptWords.slice(0, 4).join(" ") || brand);
  const concepts = conceptWords.length
    ? conceptWords.map((word) => titleCase(word))
    : ["Source capture", "Entity extraction", "Company memory"];

  return {
    source,
    sourceTitle: `${topic} source`,
    wikiPage: {
      title: `${topic} Intelligence Brief`,
      updated: "Generated now",
      summary: `Extracted: ${concepts.join(", ")}. Solomon saved the raw source from ${host}, created a reusable wiki brief, connected it to the knowledge graph, and added it to agent-ready context.`,
      links: [...concepts.slice(0, 4), "Next-source recommendation"],
      topic,
      nextSource: `supporting sources on ${topic}`,
    },
    brief: [
      `Find 3 supporting sources on ${topic} before tomorrow's review.`,
      `Compare ${topic} against adjacent customer, product, or market signals.`,
      `Link this source to the ${brand} wiki page and agent context.`,
    ],
  };
}

function Logo() {
  return (
    <div className="logo" aria-label="Solomon">
      <span className="logoMark">
        <Brain size={18} />
      </span>
      <span>Solomon</span>
    </div>
  );
}

function Header() {
  return (
    <header className="siteHeader">
      <Logo />
      <nav>
        <a href="#product">Product</a>
        <a href="#integrations">Integrations</a>
        <a href="#pricing">Pricing</a>
        <a href="#demo">Demo</a>
      </nav>
      <a className="headerCta" href="#demo">
        See the demo
      </a>
    </header>
  );
}

function Hero({ onDemo }) {
  return (
    <section className="hero">
      <div className="heroCopy">
        <h1>Limitless Company Memory</h1>
        <p>
          Paste a link. Connect Notion. Solomon turns raw sources into a wiki,
          graph, search layer, and daily brief.
        </p>
        <div className="heroActions">
          <button className="primaryBtn" onClick={onDemo}>
            See the 10-second demo <ArrowRight size={16} />
          </button>
          <button className="secondaryBtn" onClick={onDemo}>
            View demo
          </button>
        </div>
      </div>
      <ProductPreview compact />
    </section>
  );
}

function ProductPreview({ compact = false }) {
  return (
    <div className={`previewShell ${compact ? "previewCompact" : ""}`} id="product">
      <div className="previewTop">
        <Logo />
        <div className="statusPill">
          <CircleDot size={13} />
          Live ingest
        </div>
      </div>
      <div className="previewGrid">
        <div className="previewPanel sourcePanel">
          <div className="panelTitle">
            <Link size={15} />
            Raw sources
          </div>
          {rawSources.slice(0, 3).map((source) => (
            <div className="sourceRow" key={source.id}>
              <span>{source.type}</span>
              <strong>{source.title}</strong>
              <small>{source.status}</small>
            </div>
          ))}
        </div>
        <div className="previewPanel wikiPanel">
          <div className="panelTitle">
            <BookOpenText size={15} />
            Auto wiki
          </div>
          <h3>{wikiPages[0].title}</h3>
          <p>{wikiPages[0].summary}</p>
          <div className="tagRow">
            {wikiPages[0].links.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <GraphCard />
      </div>
    </div>
  );
}

function PainQuotes() {
  return (
    <section className="painQuotes" aria-label="Second brain pain">
      <div className="painIntro">
        <h2>Second brains still feel like work.</h2>
        <p>Real users are tired of tools that promise memory but create maintenance.</p>
      </div>
      <div className="quoteGrid">
        {painQuotes.map((item) => (
          <figure className="painQuote" key={item.quote}>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              <span>{item.author}</span>
              <a href={item.source} target="_blank" rel="noreferrer">
                Reddit source
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function GraphCard() {
  const centerNode = graphNodes.find((node) => node.size === "large");
  const graphEdges = graphNodes
    .filter((node) => node.label !== centerNode?.label)
    .map((node) => ({ from: centerNode, to: node }));

  return (
    <div className="previewPanel graphPanel">
      <div className="panelTitle">
        <Network size={15} />
        Knowledge graph
      </div>
      <div className="graphCanvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {graphEdges.map(({ from, to }) => (
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              key={`${from.label}-${to.label}`}
            />
          ))}
        </svg>
        {graphNodes.map((node) => (
          <span
            className={`graphNode ${node.size === "large" ? "largeNode" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            key={node.label}
          >
            {node.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function BusinessModel() {
  const items = [
    ["Team", "$20", "per user / month", "Source ingest, auto wiki, graph, search, daily brief."],
    ["Workspace", "$299", "per workspace / month", "Shared company memory, Notion + Slack, scheduled agents."],
    ["Enterprise", "$2k+", "per month", "SSO, admin controls, private connectors, custom retention."],
  ];

  return (
    <section className="businessBand" id="pricing">
      <div className="pricingHeader">
        <span>Pricing</span>
        <h2>Simple company-memory pricing.</h2>
      </div>
      {items.map(([label, price, cadence, text]) => (
        <div className="businessItem" key={label}>
          <span>{label}</span>
          <strong>{price}</strong>
          <small>{cadence}</small>
          <p>{text}</p>
        </div>
      ))}
    </section>
  );
}

function WorkflowExplainer() {
  const steps = [
    ["1", "Capture", "URL, phone share, Notion, Slack, GitHub, Linear."],
    ["2", "Ingest", "Save raw source, extract entities, summarize facts."],
    ["3", "Build memory", "Create wiki pages and connect the knowledge graph."],
    ["4", "Use it", "Search, ask agents, and get a daily brief with next sources."],
  ];

  const killers = [
    ["Notion stores pages", "Solomon turns sources into connected memory automatically."],
    ["Obsidian needs manual upkeep", "Solomon ingests, links, and briefs the team every day."],
    ["Docs are passive", "Solomon is agent-ready context for company decisions."],
  ];

  return (
    <section className="workflowExplainer">
      <div className="workflowHeader">
        <span>Workflow</span>
        <h2>Drop in a source. Solomon turns it into usable company memory.</h2>
      </div>
      <div className="workflowSteps">
        {steps.map(([number, title, text]) => (
          <div className="workflowStep" key={title}>
            <span>{number}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="killerGrid">
        {killers.map(([oldWay, newWay]) => (
          <div className="killerCard" key={oldWay}>
            <span>{oldWay}</span>
            <p>{newWay}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section className="integrations" id="integrations">
      <div>
        <h2>Built where company memory already lives.</h2>
        <p>Start with URLs, phone capture, and Notion. Expand into Slack, Linear, GitHub, webhooks, and scheduled agents.</p>
      </div>
      <div className="connectorGrid">
        {connectors.map((connector) => {
          const Icon = connector.icon;
          return (
            <div className="connector" key={connector.name}>
              {connector.logo ? (
                <img className="connectorLogo" src={connector.logo} alt="" aria-hidden="true" />
              ) : (
                <Icon size={24} />
              )}
              {connector.name}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Dashboard() {
  const [sources, setSources] = useState(rawSources);
  const [query, setQuery] = useState("What do we know about Crumbl?");
  const [url, setUrl] = useState("https://crumblcookies.com/blog/fathers-day-cookies");
  const [selected, setSelected] = useState({
    ...wikiPages[0],
    topic: "Crumbl Cookies Market Map",
    nextSource: "franchise churn data",
  });
  const [briefItems, setBriefItems] = useState(recommendations);
  const [activePanel, setActivePanel] = useState("daily");

  const generatedAnswer = useMemo(() => {
    if (!query.trim()) return "Ask Solomon anything about your company memory.";
    return `Solomon found a source-backed brief on ${selected.topic}. It connects ${selected.links
      .slice(0, 3)
      .join(", ")}. Best next source: ${selected.nextSource}.`;
  }, [query, selected]);

  function ingestSource() {
    const intelligence = inferSourceIntelligence(url);
    const next = {
      id: sources.length + 1,
      type: "URL",
      title: intelligence.sourceTitle,
      source: intelligence.source,
      status: "Wiki generated",
      time: "now",
      concepts: intelligence.wikiPage.links,
    };
    setSources([next, ...sources]);
    setSelected(intelligence.wikiPage);
    setBriefItems(intelligence.brief);
    setActivePanel("wiki");
  }

  function openPanel(panelId) {
    setActivePanel(panelId);
    document.querySelector(`[data-panel="${panelId}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <section className="dashboard" id="demo">
      <aside className="appSidebar">
        <Logo />
        <button className={activePanel === "daily" ? "sideActive" : ""} onClick={() => openPanel("daily")}>
          <Sparkles size={16} />
          Daily agent
        </button>
        <button className={activePanel === "raw" ? "sideActive" : ""} onClick={() => openPanel("raw")}>
          <Link size={16} />
          Raw sources
        </button>
        <button className={activePanel === "wiki" ? "sideActive" : ""} onClick={() => openPanel("wiki")}>
          <BookOpenText size={16} />
          Wiki
        </button>
        <button className={activePanel === "graph" ? "sideActive" : ""} onClick={() => openPanel("graph")}>
          <GitBranch size={16} />
          Graph
        </button>
      </aside>

      <main className="appMain">
        <div className="appHeader">
          <div>
          <h2>Company brain demo</h2>
            <p>Ingest source. Generate wiki. Ask memory. Get tomorrow's brief.</p>
          </div>
          <div className="health">
            <Check size={16} />
            93% source-backed
          </div>
        </div>

        <div className="ingestBar">
          <Plus size={17} />
          <input value={url} onChange={(event) => setUrl(event.target.value)} aria-label="Source URL" />
          <button onClick={ingestSource}>Ingest</button>
        </div>

        <div className="workspaceGrid">
          <section className="appPanel rawList" data-panel="raw">
            <div className="panelTitle">
              <Link size={15} />
              Raw folder
            </div>
            {sources.map((source) => (
              <button className="sourceButton" key={source.id}>
                <span>{source.time}</span>
                <strong>{source.title}</strong>
                <small>{source.source}</small>
              </button>
            ))}
          </section>

          <section className="appPanel wikiEditor" data-panel="wiki">
            <div className="panelTitle">
              <BookOpenText size={15} />
              Wiki page
            </div>
            <h3>{selected.title}</h3>
            <small>{selected.updated}</small>
            <p>{selected.summary}</p>
            <div className="wikiLinks">
              {selected.links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </section>

          <section className="appPanel searchPanel">
            <div className="panelTitle">
              <Search size={15} />
              Agent-ready search
            </div>
            <div className="searchBox">
              <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Ask Solomon" />
              <Send size={16} />
            </div>
            <p>{generatedAnswer}</p>
          </section>

          <section className="appPanel briefPanel" data-panel="daily">
            <div className="panelTitle">
              <Sparkles size={15} />
              Tomorrow's brief
            </div>
            {briefItems.map((item) => (
              <div className="briefItem" key={item}>
                <Check size={15} />
                <span>{item}</span>
              </div>
            ))}
          </section>

          <section className="appPanel phonePanel">
            <div className="panelTitle">
              <Smartphone size={15} />
              Phone capture
            </div>
            <div className="phoneMock">
              <div className="phoneTop">Share to Solomon</div>
              <p>Tweet, article, PDF, or note saved to raw sources.</p>
              <button onClick={ingestSource}>Capture from phone</button>
            </div>
          </section>

          <div data-panel="graph">
            <GraphCard />
          </div>
        </div>
      </main>
    </section>
  );
}

export default function App() {
  function scrollToDemo() {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Header />
      <Hero onDemo={scrollToDemo} />
      <PainQuotes />
      <WorkflowExplainer />
      <Integrations />
      <BusinessModel />
      <Dashboard />
    </>
  );
}
