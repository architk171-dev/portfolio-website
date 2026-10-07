import { useEffect, useRef } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdArrowForward, MdOutlineEmail } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { RESUME_URL } from "./Navbar";
import { EMAIL, LINKEDIN_URL } from "./SocialIcons";
import "./styles/Landing.css";

// Lightweight upward-drifting dust, like the illustrated portfolios. Canvas so
// it stays cheap; gated on fine pointer + motion so phones and reduced-motion
// users skip it. `boost` is a live multiplier (1 = idle) raised on scroll.
const useDust = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  boost: React.MutableRefObject<number>
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    type P = { x: number; y: number; r: number; s: number; a: number; tw: number };
    let dots: P[] = [];

    const seed = () => {
      const count = Math.round((w * h) / 16000);
      dots = Array.from({ length: Math.min(120, Math.max(40, count)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        s: Math.random() * 0.28 + 0.06,
        a: Math.random() * 0.5 + 0.35,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const mult = boost.current;
      for (const d of dots) {
        d.y -= d.s * mult;
        d.tw += 0.02;
        if (d.y < -4) {
          d.y = h + 4;
          d.x = Math.random() * w;
        }
        const alpha = d.a * (0.6 + 0.4 * Math.sin(d.tw));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(207, 186, 255, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, [canvasRef]);
};

const Landing = () => {
  const portrait = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const boost = useRef(1);
  useDust(dustRef, boost);

  // Scroll choreography for the hero: parallax (portrait lags the text),
  // a fade-and-scale as the next section rises over it, and faster dust.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.85)));
      section.style.setProperty("--hp", p.toFixed(4));
      boost.current = 1 + p * 6;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
    <section className="landing-section" id="home" aria-labelledby="hero-name" onPointerMove={onMove} ref={sectionRef}>
      <canvas className="hero-dust" ref={dustRef} aria-hidden="true" />
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
            <svg className="hero-arrow" viewBox="0 0 120 70" fill="none" aria-hidden="true">
              <path
                d="M4 10 C40 2 70 6 92 30 C98 37 101 46 100 56"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d="M88 46 L100 58 L112 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
          <svg className="hero-spark" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M40 8 L40 30" />
              <path d="M40 50 L40 72" />
              <path d="M8 40 L30 40" />
              <path d="M50 40 L72 40" />
              <path d="M18 18 L32 32" />
              <path d="M48 48 L62 62" />
              <path d="M62 18 L48 32" />
              <path d="M32 48 L18 62" />
            </g>
          </svg>
          <img src="/images/archit-pixar.webp" alt="Pixar-style portrait of Archit Kumar" width="1100" height="1143" decoding="async" />
        </div>
      </div>
    </section>
  );
};

export default Landing;
