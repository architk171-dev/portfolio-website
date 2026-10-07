import "./styles/WhatIDo.css";

const areas = [
  {
    title: "Product",
    sub: "Strategy & Execution",
    text: "End-to-end product ownership from discovery to GTM: roadmapping, PRD writing, user research, A/B testing, and cross-functional stakeholder management.",
    tools: ["Product Discovery", "Roadmapping", "PRD Writing", "A/B Testing", "GTM Strategy", "Figma", "JIRA", "Confluence"],
  },
  {
    title: "Growth",
    sub: "Analytics & AI",
    text: "Driving revenue, conversion, and retention through funnel analysis, persona-based re-engagement, and shipping AI-powered tools that cut manual effort and scale operations.",
    tools: ["SQL", "Python", "Mixpanel", "Metabase", "Google Analytics", "n8n", "Funnel Analysis", "Retention"],
  },
];

const WhatIDo = () => (
  <section className="section what-section" id="what" aria-labelledby="what-title">
    <div className="what-grid">
      <div className="what-intro" data-reveal>
        <p className="eyebrow">Skills</p>
        <h2 className="title" id="what-title">
          What I <em>do.</em>
        </h2>
        <p className="what-note">Two lanes I keep sharp: <em>shipping product end to end</em>, and <em>using data and AI</em> to move the numbers.</p>
      </div>
      <div className="what-list">
        {areas.map((a) => (
          <article className="what-card" key={a.title} data-reveal>
            <h3>{a.title}</h3>
            <p className="what-sub">{a.sub}</p>
            <p className="what-text">{a.text}</p>
            <ul className="what-tools" aria-label={`${a.title} skills and tools`}>
              {a.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WhatIDo;
