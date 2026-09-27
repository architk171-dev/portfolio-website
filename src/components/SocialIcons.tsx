import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import "./styles/SocialIcons.css";
import { RESUME_URL } from "./Navbar";

export const LINKEDIN_URL = "https://www.linkedin.com/in/archit-kumar1717";
export const EMAIL = "archit.kumar2027@masterunion.org";

const SocialIcons = () => (
  <aside className="icons-section" aria-label="Profiles">
    <ul className="social-icons">
      <li>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
          <FaLinkedinIn aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`}>
          <MdOutlineEmail aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href={RESUME_URL} target="_blank" rel="noopener" aria-label="Resume (PDF)">
          <TbFileText aria-hidden="true" />
        </a>
      </li>
    </ul>
    <span className="social-line" aria-hidden="true"></span>
  </aside>
);

export default SocialIcons;
