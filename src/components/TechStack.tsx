// styles in index.css

const tools = [
  { name: "Figma", category: "Design" },
  { name: "JIRA", category: "Project Mgmt" },
  { name: "Confluence", category: "Documentation" },
  { name: "SQL", category: "Data" },
  { name: "Python", category: "Analytics" },
  { name: "Mixpanel", category: "Product Analytics" },
  { name: "Metabase", category: "BI & Dashboards" },
  { name: "Google Analytics", category: "Web Analytics" },
  { name: "n8n", category: "Automation" },
  { name: "Hotjar", category: "UX Research" },
  { name: "Notion", category: "Productivity" },
  { name: "Miro", category: "Collaboration" },
];

const TechStack = () => {
  return (
    <div className="techstack-section section-container">
      <h2>
        My <span>Toolkit</span>
      </h2>
      <div className="techstack-grid">
        {tools.map((tool, i) => (
          <div className="techstack-card" key={i}>
            <h4>{tool.name}</h4>
            <p>{tool.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
