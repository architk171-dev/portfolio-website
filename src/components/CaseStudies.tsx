import { KeyboardEvent, useRef, useState } from "react";
import "./styles/CaseStudies.css";

type Project = {
  id: string;
  name: string;
  short: string;
  context: string;
  problem: string;
  actions: string[];
  impact: { value: string; label: string }[];
  tools: string[];
};

const projects: Project[] = [
  {
    id: "farmart-ops",
    name: "Supply-chain automation",
    short: "FarMart",
    context: "FarMart · Product Manager 1 · AgriTech",
    problem:
      "Peak-season dispatch ran on multi-truck supplier workflows, while buyer KYC, credit notes and invoice tracking were largely manual.",
    actions: [
      "Re-architected multi-truck supplier workflows for peak season",
      "Onboarded Cashfree API to automate buyer KYC, removing a manual-approval role",
      "Shipped AI-powered deduction-report extraction and invoicing-automation tracking",
      "Launched automated credit-note generation",
    ],
    impact: [
      { value: "55%", label: "faster dispatch turnaround" },
      { value: "80%", label: "fewer manual-entry & validation errors" },
      { value: "25 min", label: "invoicing TAT, down from 2 days" },
      { value: "30 min", label: "AR turnaround, down from 1–2 days" },
    ],
    tools: ["JIRA", "Figma", "SQL", "Metabase", "Cashfree API", "n8n"],
  },
  {
    id: "farmart-growth",
    name: "Agri-retailer growth & CRM",
    short: "FarMart",
    context: "FarMart · Product Manager 1 · Growth & GTM",
    problem:
      "Trade with Tier-3 agri-retailers leaned heavily on on-ground manual effort.",
    actions: [
      "Launched app-based trade across 10 states via FarMart's app",
      "Ran persona-based re-engagement for Tier-3 agri-retailers",
      "Worked as an embedded FDE to ship an in-house CRM end-to-end",
      "Shipped PO-throughput analytics that surfaced bottlenecks for the roadmap",
    ],
    impact: [
      { value: "6K→15K", label: "daily active users" },
      { value: "65%", label: "retention among agri-retailers" },
      { value: "16%", label: "supplier QoQ retention" },
      { value: "10", label: "states live on app-based trade" },
    ],
    tools: ["SQL", "Metabase", "Figma", "JIRA"],
  },
  {
    id: "indmoney",
    name: "Onboarding, checkout & payments",
    short: "INDmoney",
    context: "INDmoney · Associate Product Manager · FinTech",
    problem:
      "Day-0 funnel conversion sat at 1.5%, and mutual-fund investors had no UPI checkout.",
    actions: [
      "Re-architected the onboarding-to-activation flow",
      "Launched India's first UPI-for-mutual-funds with ICICI and Razorpay",
      "Launched Mutual Fund Baskets with a unified checkout",
      "Built an AI-powered self-serve Help Center",
    ],
    impact: [
      { value: "3.5%", label: "Day-0 conversion, up from 1.5%" },
      { value: "84%", label: "UPI checkout success" },
      { value: "15K+", label: "Q1 investors via MF Baskets" },
      { value: "+28%", label: "average order value" },
    ],
    tools: ["Mixpanel", "SQL", "Figma", "Razorpay", "ICICI UPI"],
  },
  {
    id: "corra",
    name: "Landing page & conversion",
    short: "Corra Club",
    context: "Corra Club · Freelance Product Consultant",
    problem:
      "First-time conversion was 4%, and checkout breakages put conversions at risk.",
    actions: [
      "Redesigned landing-page UX, information architecture and messaging",
      "Monitored the checkout flow for breakages and ran RCAs to resolve failures",
    ],
    impact: [
      { value: "2×", label: "first-time conversion" },
      { value: "4→8%", label: "conversion rate" },
    ],
    tools: ["Google Analytics", "Figma", "Hotjar"],
  },
  {
    id: "cafe",
    name: "Bootstrapped café",
    short: "Café venture",
    context: "Café venture, Noida · Co-founder · F&B",
    problem: "Build and run a café business from scratch with no outside funding.",
    actions: [
      "Owned the P&L, unit economics and growth end-to-end",
      "Ran A/B experiments on menu, packaging and pricing",
      "Negotiated visibility deals on Swiggy and Zomato",
      "Drove Instagram marketing and ran daily operations, vendors and staffing",
    ],
    impact: [{ value: "~₹75L", label: "revenue generated" }],
    tools: ["Petpooja POS", "Swiggy", "Zomato", "Instagram"],
  },
];

const CaseStudies = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = projects[active];

  const select = (i: number) => {
    setActive(i);
    const tab = tabRefs.current[i];
    tab?.focus({ preventScroll: true });
    const list = tab?.parentElement;
    if (tab && list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - list.offsetLeft - 16, behavior: "smooth" });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = projects.length - 1;
    if (["ArrowDown", "ArrowRight"].includes(e.key)) select(active === last ? 0 : active + 1);
    else if (["ArrowUp", "ArrowLeft"].includes(e.key)) select(active === 0 ? last : active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  };

  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Selected work</p>
        <h2 className="section-title" id="work-title">
          Problems I've solved, <em>and what changed.</em>
        </h2>
      </div>

      <div className="cs-layout" data-reveal>
        <div className="cs-tabs" role="tablist" aria-label="Projects" aria-orientation="vertical" onKeyDown={onKeyDown}>
          {projects.map((proj, i) => (
            <button
              key={proj.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`tab-${proj.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${proj.id}`}
              tabIndex={i === active ? 0 : -1}
              className={`cs-tab${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="cs-tab-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cs-tab-text">
                <span className="cs-tab-name">{proj.name}</span>
                <span className="cs-tab-short">{proj.short}</span>
              </span>
            </button>
          ))}
        </div>

        <article
          className="cs-panel card"
          role="tabpanel"
          id={`panel-${p.id}`}
          aria-labelledby={`tab-${p.id}`}
          key={p.id}
        >
          <header className="cs-header">
            <p className="cs-context">{p.context}</p>
            <h3 className="cs-title">{p.name}</h3>
          </header>

          <ul className={`cs-impact cs-impact-${p.impact.length}`} aria-label="Impact">
            {p.impact.map((m) => (
              <li key={m.label}>
                <span className="metric-value cs-impact-value">{m.value}</span>
                <span className="cs-impact-label">{m.label}</span>
              </li>
            ))}
          </ul>

          <div className="cs-body">
            <div>
              <h4 className="cs-label">The problem</h4>
              <p className="cs-problem">{p.problem}</p>
            </div>
            <div>
              <h4 className="cs-label">What I did</h4>
              <ul className="cs-actions">
                {p.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          <footer className="cs-footer">
            <h4 className="visually-hidden">Tools</h4>
            <ul className="chip-list">
              {p.tools.map((t) => (
                <li className="chip cs-chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </footer>
        </article>
      </div>
    </section>
  );
};

export default CaseStudies;
