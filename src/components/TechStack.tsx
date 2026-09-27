import "./styles/TechStack.css";

const groups = [
  {
    title: "Product",
    items: [
      "Product strategy",
      "Product discovery",
      "Roadmap & prioritisation",
      "User research",
      "PRD writing",
      "GTM strategy",
      "Stakeholder management",
    ],
  },
  {
    title: "Growth & commerce",
    items: [
      "Funnel / CRO",
      "Checkout optimisation",
      "A/B testing & experimentation",
      "Marketplace & supply growth",
      "Partner / API onboarding",
      "B2B API distribution",
      "Post-purchase CX & CSAT",
    ],
  },
  {
    title: "Tools & technical",
    items: [
      "SQL",
      "Python",
      "REST APIs",
      "Metabase",
      "Mixpanel",
      "Google Analytics",
      "Figma",
      "JIRA",
      "Confluence",
      "n8n",
    ],
  },
];

const TechStack = () => {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Skills</p>
        <h2 className="section-title" id="skills-title">
          Product sense, <em>backed by data and tooling.</em>
        </h2>
      </div>
      <div className="skills-grid">
        {groups.map((g) => (
          <div className="skills-group" key={g.title} data-reveal>
            <h3>{g.title}</h3>
            <ul className="chip-list">
              {g.items.map((item) => (
                <li className="chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
