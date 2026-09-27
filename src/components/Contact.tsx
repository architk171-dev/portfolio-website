import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { RESUME_URL } from "./Navbar";
import { EMAIL, LINKEDIN_URL } from "./SocialIcons";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <footer className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-card card" data-reveal>
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title" id="contact-title">
            Hiring for product? <em>Let's talk.</em>
          </h2>
          <p className="section-intro">
            The fastest way to reach me is email or LinkedIn. My resume has the full detail.
          </p>
        </div>
        <ul className="contact-links">
          <li>
            <a href={`mailto:${EMAIL}`} className="contact-link">
              <MdOutlineEmail aria-hidden="true" />
              <span>
                <span className="contact-link-label">Email</span>
                <span className="contact-link-value">{EMAIL}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaLinkedinIn aria-hidden="true" />
              <span>
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">in/archit-kumar1717</span>
              </span>
            </a>
          </li>
          <li>
            <a href="tel:+918130370300" className="contact-link">
              <MdOutlinePhone aria-hidden="true" />
              <span>
                <span className="contact-link-label">Phone</span>
                <span className="contact-link-value">+91 81303 70300</span>
              </span>
            </a>
          </li>
          <li>
            <a href={RESUME_URL} target="_blank" rel="noopener" className="contact-link">
              <TbFileText aria-hidden="true" />
              <span>
                <span className="contact-link-label">Resume</span>
                <span className="contact-link-value">Download PDF</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <p className="contact-foot">© 2026 Archit Kumar</p>
    </footer>
  );
};

export default Contact;
