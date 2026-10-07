import { useRef } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdArrowForward, MdOutlineEmail } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { RESUME_URL } from "./Navbar";
import { EMAIL, LINKEDIN_URL } from "./SocialIcons";
import "./styles/Landing.css";

const Landing = () => {
  const portrait = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = portrait.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    el.style.setProperty("--px", String(Math.max(-1, Math.min(1, x * 2.2))));
    el.style.setProperty("--py", String(Math.max(-1, Math.min(1, y * 2.2))));
  };
  return (
    <section className="landing-section" id="home" aria-labelledby="hero-name" onPointerMove={onMove}>
      <div className="landing-container" id="landingDiv">
        <div className="hero">
          <p className="hero-hello">Hi, I'm</p>
          <h1 className="hero-name" id="hero-name">
            Archit Kumar
          </h1>
          <p className="hero-role">
            Product Manager <span>&amp; Builder</span>
          </p>
          <p className="hero-summary">
            3+ years owning payments, growth and AI-led products at INDmoney
            and FarMart, from discovery to GTM.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#experience">
              View work <MdArrowForward aria-hidden="true" />
            </a>
            <a className="btn" href={RESUME_URL} target="_blank" rel="noopener">
              <TbFileText aria-hidden="true" /> Resume
            </a>
            <a
              className="btn btn-icon"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a className="btn btn-icon" href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`}>
              <MdOutlineEmail aria-hidden="true" />
            </a>
          </div>
          <p className="hero-proof">
            <span>FarMart</span>
            <span>INDmoney</span>
            <span>Freecharge</span>
          </p>
        </div>
        <div className="hero-portrait" ref={portrait}>
          <img src="/images/archit-pixar.webp" alt="Pixar-style portrait of Archit Kumar" width="1100" height="1143" decoding="async" />
        </div>
      </div>
    </section>
  );
};

export default Landing;
