import "./styles/About.css";

const domains = [
  "Payments & checkout",
  "Funnel & conversion",
  "Marketplace & supply growth",
  "Partner / API onboarding",
  "Post-purchase CX",
  "AI-led products",
];

const About = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-me">
        <p className="eyebrow">About me</p>
        <h2 className="about-statement" id="about-title">
          I tried every seat at the table <em>before choosing product.</em>
        </h2>
        <p className="about-body">
          As an engineering student I interned across very different
          functions: marketing at Fansee, operations at CrepDogCrew and machine
          learning at Coforge.
        </p>
        <p className="about-body">
          Each one showed me a piece of the puzzle. Product was where they came
          together: solving a real user problem end-to-end. That took me to
          Freecharge, then INDmoney and FarMart.
        </p>
        <ul className="chip-list about-domains" aria-label="Domains">
          {domains.map((d) => (
            <li className="chip" key={d}>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
