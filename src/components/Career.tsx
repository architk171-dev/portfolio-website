import "./styles/Career.css";

const education = [
  {
    school: "Masters' Union",
    degree: "PGP in Technology & Business Management",
    period: "2026 – Present",
    detail: "Manoj Kohli Merit Scholarship (25%) · Product Management & FOCOS",
  },
  {
    school: "Bharati Vidyapeeth's College of Engineering (GGSIPU)",
    degree: "BTech, Electronics & Communication Engineering",
    period: "2019 – 2023",
    detail: "CGPA 9.0/10 · Top 5% of ECE department",
  },
];

const achievements = [
  {
    badge: "2nd Runner-up · ₹50,000",
    title: "IIT Roorkee E-Summit Case Competition",
    detail: "Placed among the top 50 teams.",
  },
  {
    badge: "IEEE ICCCNT 2023",
    title: "Co-authored research paper, IIT Delhi",
    detail: "ML-based malicious-DNS detection at 95% accuracy.",
  },
  {
    badge: "30+ medals",
    title: "State & National Karate",
    detail: "Brown-Black Belt after 8+ years of training.",
  },
  {
    badge: "Vice President",
    title: "Enactus BVCOE",
    detail: "Led a 70+ member team across 3 social enterprises; won the KPMG Ethics Grant and a ₹25,000 Sulabh grant.",
  },
];

const Career = () => {
  return (
    <section className="section edu-section" id="education" aria-labelledby="edu-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Education &amp; achievements</p>
        <h2 className="section-title" id="edu-title">
          Foundations <em>and recognition.</em>
        </h2>
      </div>

      <div className="edu-grid">
        <div data-reveal>
          <h3 className="edu-col-title">Education</h3>
          <ul className="edu-list">
            {education.map((e) => (
              <li className="card edu-card" key={e.school}>
                <div className="edu-top">
                  <h4>{e.school}</h4>
                  <span className="edu-period">{e.period}</span>
                </div>
                <p className="edu-degree">{e.degree}</p>
                <p className="edu-detail">{e.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <h3 className="edu-col-title">Achievements</h3>
          <ul className="edu-list">
            {achievements.map((a) => (
              <li className="card edu-card" key={a.title}>
                <span className="edu-badge">{a.badge}</span>
                <h4>{a.title}</h4>
                <p className="edu-detail">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Career;
