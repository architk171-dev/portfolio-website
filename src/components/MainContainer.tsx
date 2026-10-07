import { useEffect } from "react";
import About from "./About";
import Career from "./Career";
import CareerExplorer from "./CareerExplorer";
import Dropshipping from "./Dropshipping";
import Contact from "./Contact";
import Cursor from "./Cursor";
import HowIWork from "./HowIWork";
import ProductCases from "./ProductCases";
import Landing from "./Landing";
import LaptopClosed from "./LaptopClosed";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
// import TechStack from "./TechStack";
import WhatIDo from "./WhatIDo";
import setSplitText from "./utils/splitText";

const useScrollReveal = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
};

const MainContainer = () => {
  useScrollReveal();

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="container-main">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <CareerExplorer />
            <Career />
            <HowIWork />
            <ProductCases />
            <Dropshipping />
              <LaptopClosed />
            {/* <TechStack /> */}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
