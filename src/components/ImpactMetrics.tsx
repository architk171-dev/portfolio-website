import "./styles/ImpactMetrics.css";

const metrics = [
  { value: "55%", label: "faster dispatch turnaround", context: "FarMart · multi-truck supplier workflows" },
  { value: "1.5→3.5%", label: "Day-0 funnel conversion", context: "INDmoney · onboarding-to-activation" },
  { value: "15K+", label: "Q1 investors, +28% AOV", context: "INDmoney · Mutual Fund Baskets" },
  { value: "6K→15K", label: "DAU at 65% retention", context: "FarMart · Tier-3 agri-retailers" },
  { value: "84%", label: "checkout success", context: "INDmoney · India's first UPI for mutual funds" },
  { value: "80%", label: "fewer manual-entry errors", context: "FarMart · AI deduction-report extraction" },
  { value: "2×", label: "first-time conversion", context: "Corra Club · 4% → 8% via landing-page UX" },
  { value: "~₹75L", label: "revenue, full P&L", context: "Café venture · co-founder" },
];

const ImpactMetrics = () => {
  return (
    <section className="section impact-section" id="impact" aria-labelledby="impact-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Impact at a glance</p>
        <h2 className="section-title" id="impact-title">
          Outcomes, <em>not output.</em>
        </h2>
      </div>
      <ul className="impact-grid">
        {metrics.map((m) => (
          <li className="impact-card" key={m.label} data-reveal>
            <span className="metric-value impact-value">{m.value}</span>
            <span className="impact-label">{m.label}</span>
            <span className="impact-context">{m.context}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ImpactMetrics;
