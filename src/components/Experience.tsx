import { ReactNode } from "react";
import "./styles/Experience.css";

type Role = {
  company: string;
  context: string;
  role: string;
  period: string;
  summary: string;
  highlights: ReactNode[];
};

const roles: Role[] = [
  {
    company: "FarMart",
    context: "AgriTech · ₹2,500 Cr+ revenue",
    role: "Product Manager 1",
    period: "Jan 2025 – Jun 2026",
    summary:
      "Owned marketplace, supply and partner integrations, then growth, GTM and AI-led products.",
    highlights: [
      <>Onboarded <strong>Cashfree API</strong> to automate 50% of buyer KYC, eliminating a manual-approval role.</>,
      <>Worked as an embedded FDE to ship an <strong>in-house CRM</strong> end-to-end.</>,
      <>Defined a <strong>ROCE-optimisation framework</strong> mapping AP–AR cycles to cut working-capital needs.</>,
    ],
  },
  {
    company: "INDmoney",
    context: "FinTech · Wealth management",
    role: "Associate Product Manager",
    period: "Jul 2023 – Jan 2025",
    summary: "Owned revenue, conversion and payments, then post-purchase CX and AI self-serve.",
    highlights: [
      <>Launched <strong>F&amp;O trading</strong> on the INDmoney web terminal, expanding the derivatives offering.</>,
      <>Cut the tickets-to-transactor ratio to <strong>1%</strong> with an AI-powered self-serve Help Center.</>,
      <>Built <strong>AI Portfolio Scan</strong> with in-app Stories, driving 6% repeat conversion.</>,
    ],
  },
  {
    company: "Freecharge",
    context: "FinTech · Axis Bank",
    role: "Product Intern",
    period: "Feb 2023 – Jul 2023",
    summary: "Merchant onboarding and payment integrations.",
    highlights: [
      <>Drove B2B POS/EDC API integrations with <strong>Pine Labs, Zomato &amp; PayU</strong>.</>,
      <>Reduced merchant incident TAT by owning structured RCA across engineering and ops.</>,
    ],
  },
];

const alongside = [
  {
    company: "Café venture, Noida",
    role: "Co-founder",
    period: "Jul 2023 – May 2024",
    line: <>Bootstrapped and self-started; owned the P&amp;L, pricing experiments and Swiggy/Zomato partnerships.</>,
  },
  {
    company: "Corra Club",
    role: "Freelance Product Consultant",
    period: "2025 – Present",
    line: <>Landing-page UX, IA and messaging, plus checkout RCAs to protect conversion.</>,
  },
];

const Experience = () => {
  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Experience</p>
        <h2 className="section-title" id="experience-title">
          From integrations to <em>owning outcomes.</em>
        </h2>
        <p className="section-intro">
          Each role widened the scope: from API integrations, to conversion and payments, to
          marketplace growth and AI-led operations.
        </p>
      </div>

      <ol className="timeline">
        {roles.map((r) => (
          <li className="timeline-item" key={r.company} data-reveal>
            <div className="timeline-meta">
              <span className="timeline-period">{r.period}</span>
              <span className="timeline-context">{r.context}</span>
            </div>
            <article className="timeline-card card">
              <header>
                <h3 className="timeline-company">{r.company}</h3>
                <p className="timeline-role">{r.role}</p>
              </header>
              <p className="timeline-summary">{r.summary}</p>
              <ul className="timeline-highlights">
                {r.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <div className="alongside" data-reveal>
        <h3 className="alongside-title">Before product</h3>
        <ul className="early-list">
          <li><span className="alongside-company">Fansee</span><span className="timeline-role">Marketing Intern</span></li>
          <li><span className="alongside-company">Cpredogcrew</span><span className="timeline-role">Operations Intern</span></li>
          <li><span className="alongside-company">Coforge</span><span className="timeline-role">Machine Learning Intern</span></li>
        </ul>
      </div>

      <div className="alongside" data-reveal>
        <h3 className="alongside-title">Alongside</h3>
        <ul className="alongside-grid">
          {alongside.map((a) => (
            <li className="card alongside-card" key={a.company}>
              <div className="alongside-head">
                <span className="alongside-company">{a.company}</span>
                <span className="timeline-period">{a.period}</span>
              </div>
              <span className="timeline-role">{a.role}</span>
              <p>{a.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
