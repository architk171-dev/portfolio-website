import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "../shims/ScrollSmoother";
import { TbFileText, TbMenu2, TbX } from "react-icons/tb";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

export const RESUME_URL = "/Archit_Kumar_Resume.pdf";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create();
    smoother.scrollTop(0);
    smoother.paused(true);

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.intersectionRatio));
        let best = "";
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        });
        setActive(bestRatio > 0 ? best : "");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] }
    );
    const observe = () =>
      links.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    observe();
    const retry = window.setTimeout(observe, 1500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(retry);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className={`header${scrolled ? " header-scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#home" className="navbar-title" aria-label="Archit Kumar, back to top">
            AK<span className="navbar-title-name">Archit Kumar</span>
          </a>

          <nav aria-label="Primary" className={`nav${menuOpen ? " nav-open" : ""}`} id="primary-nav">
            <ul>
              {links.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? "is-active" : undefined}
                    aria-current={active === id ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="btn btn-primary nav-resume"
              href={RESUME_URL}
              target="_blank"
              rel="noopener"
            >
              <TbFileText aria-hidden="true" /> Resume
            </a>
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <TbX aria-hidden="true" /> : <TbMenu2 aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div className="landing-circle1" aria-hidden="true"></div>
      <div className="landing-circle2" aria-hidden="true"></div>
    </>
  );
};

export default Navbar;
