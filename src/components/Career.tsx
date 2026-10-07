import "./styles/Career.css";

const education = [
  {
    stat: "25%",
    statLabel: "Merit scholarship",
    school: "Masters' Union",
    degree: "PGP in Technology & Business Management",
    period: "2026 to present",
    detail: "Manoj Kohli Merit Scholarship. Product Management and FOCOS.",
  },
  {
    stat: "9.0",
    statLabel: "CGPA out of 10",
    school: "Bharati Vidyapeeth's College of Engineering",
    degree: "BTech, Electronics & Communication Engineering (GGSIPU)",
    period: "2019 to 2023",
    detail: "Top 5% of the ECE department.",
  },
];

const achievements = [
  {
    stat: "₹50K",
    badge: "2nd runner-up",
    title: "IIT Roorkee E-Summit Case Competition",
    detail: "Placed among the top 50 teams.",
  },
  {
    stat: "95%",
    badge: "IEEE ICCCNT 2023",
    title: "Co-authored paper, IIT Delhi",
    detail: "ML-based malicious-DNS detection at 95% accuracy.",
  },
  {
    stat: "30+",
    badge: "Medals",
    title: "State & National Karate",
    detail: "Brown-Black Belt after 8+ years of training.",
  },
  {
    stat: "70+",
    badge: "Vice President",
    title: "Enactus BVCOE",
    detail: "Led a 70+ member team across 3 social enterprises. Won the KPMG Ethics Grant and a ₹25,000 Sulabh grant.",
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

      <h3 className="edu-col-title" data-reveal>Education</h3>
      <ul className="edu-list edu-two" data-reveal>
        {education.map((e) => (
          <li className="edu-card" key={e.school}>
            <div className="edu-stat">
              <span className="edu-num">{e.stat}</span>
              <span className="edu-num-label">{e.statLabel}</span>
            </div>
            <div className="edu-main">
              <span className="edu-period">{e.period}</span>
              <h4>{e.school}</h4>
              <p className="edu-degree">{e.degree}</p>
              <p className="edu-detail">{e.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="edu-col-title edu-col-gap" data-reveal>Achievements</h3>
      <ul className="edu-list edu-four" data-reveal>
        {achievements.map((a) => (
          <li className="edu-card edu-ach" key={a.title}>
            <span className="edu-num">{a.stat}</span>
            <span className="edu-badge">{a.badge}</span>
            <h4>{a.title}</h4>
            <p className="edu-detail">{a.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Career;
