import { MdArrowForward } from "react-icons/md";
import { RESUME_URL } from "./Navbar";
import { EMAIL, LINKEDIN_URL } from "./SocialIcons";
import "./styles/Contact.css";

const PHONE = "+91 81303 70300";

const links = [
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "Phone", href: "tel:+918130370300" },
  { label: "Résumé", href: RESUME_URL, external: true },
];

const Contact = () => {
  return (
    <footer className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="cta-card" data-reveal>
        <h2 className="cta-title" id="contact-title">
          Let's build something <em>people love.</em>
        </h2>
        <div className="cta-actions">
          <a className="cta-btn cta-primary" href={`mailto:${EMAIL}`}>
            Get in touch <MdArrowForward aria-hidden="true" />
          </a>
          <a className="cta-btn" href="#experience">
            See my work
          </a>
        </div>
        <p className="cta-details">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span aria-hidden="true">·</span>
          <a href="tel:+918130370300">{PHONE}</a>
        </p>
        <ul className="cta-links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="contact-foot">© 2026 Archit Kumar</p>
    </footer>
  );
};

export default Contact;
