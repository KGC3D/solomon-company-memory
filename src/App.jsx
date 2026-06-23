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
  return (
    <div className="previewPanel graphPanel">
      <div className="panelTitle">
        <Network size={15} />
        Knowledge graph
      </div>
      <div className="graphCanvas">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <line x1="46" y1="48" x2="31" y2="28" />
          <line x1="46" y1="48" x2="63" y2="24" />
          <line x1="46" y1="48" x2="73" y2="54" />
          <line x1="46" y1="48" x2="48" y2="74" />
          <line x1="46" y1="48" x2="22" y2="67" />
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
    ["Wedge", "Replace manual Obsidian/Notion upkeep for teams."],
    ["Model", "$20/user/month, $299 workspace, $2k+ enterprise."],
    ["Moat", "Source graph + daily agents + connectors = company memory lock-in."],
  ];

  return (
    <section className="businessBand" id="pricing">
      {items.map(([label, text]) => (
        <div className="businessItem" key={label}>
          <span>{label}</span>
          <p>{text}</p>
        </div>
      ))}
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
  const [url, setUrl] = useState("https://example.com/crumbl-franchise-breakdown");
  const [selected, setSelected] = useState(wikiPages[0]);

  const generatedAnswer = useMemo(() => {
    if (!query.trim()) return "Ask Solomon anything about your company memory.";
    return "Solomon found 4 linked sources. Crumbl research connects franchise velocity, menu rotation, local demand, and onboarding gaps. Best next source: franchise churn data.";
  }, [query]);

  function ingestSource() {
    const next = {
      id: sources.length + 1,
      type: "URL",
      title: "New source captured from phone/web",
      source: url.replace("https://", ""),
      status: "Wiki generated",
      time: "now",
      concepts: ["source capture", "entity extraction", "agent context"],
    };
    setSources([next, ...sources]);
    setSelected({
      title: "New Source Intelligence Brief",
      updated: "Generated now",
      summary:
        "Solomon saved the raw page, extracted entities and concepts, linked it to existing wiki pages, and added it to the agent context layer.",
      links: ["Source capture", "Entity extraction", "Daily recommendations"],
    });
  }

  return (
    <section className="dashboard" id="demo">
      <aside className="appSidebar">
        <Logo />
        <button className="sideActive">
          <Sparkles size={16} />
          Daily agent
        </button>
        <button>
          <Link size={16} />
          Raw sources
        </button>
        <button>
          <BookOpenText size={16} />
          Wiki
        </button>
        <button>
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
          <section className="appPanel rawList">
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

          <section className="appPanel wikiEditor">
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

          <section className="appPanel briefPanel">
            <div className="panelTitle">
              <Sparkles size={15} />
              Tomorrow's brief
            </div>
            {recommendations.map((item) => (
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

          <GraphCard />
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
      <BusinessModel />
      <Integrations />
      <Dashboard />
    </>
  );
}
