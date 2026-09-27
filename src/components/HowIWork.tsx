import "./styles/HowIWork.css";

const principles = [
  {
    title: "Start from the funnel, not the feature",
    body: "Find where users drop off before deciding what to build.",
    proof: "INDmoney: re-architected the onboarding-to-activation flow.",
  },
  {
    title: "Automate the manual work first",
    body: "Repetitive ops work is where AI and workflow tooling pay off fastest.",
    proof: "FarMart: automated KYC, credit notes, invoice tracking and deduction reports.",
  },
  {
    title: "Partner instead of rebuilding",
    body: "Good integrations ship value faster than building everything in-house.",
    proof: "UPI for mutual funds with ICICI and Razorpay; KYC automation via Cashfree.",
  },
  {
    title: "Think in P&L, not just features",
    body: "Unit economics and working capital are product decisions too.",
    proof: "Ran a café P&L as co-founder; mapped AP–AR cycles to working capital at FarMart.",
  },
];

const HowIWork = () => {
  return (
    <section className="section how-section" id="approach" aria-labelledby="how-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">How I work</p>
        <h2 className="section-title" id="how-title">
          Principles I've <em>tested in practice.</em>
        </h2>
      </div>
      <ol className="how-grid">
        {principles.map((p, i) => (
          <li className="how-card card" key={p.title} data-reveal>
            <span className="how-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{p.title}</h3>
            <p className="how-body">{p.body}</p>
            <p className="how-proof">
              <span>In practice</span>
              {p.proof}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default HowIWork;
