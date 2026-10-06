import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  // Safety net: the cards normally reveal via the 3D character scroll timeline.
  // If that misfires (fast scroll, jank), force them visible once the section
  // is on screen so "What I Do" can never stay blank.
  useEffect(() => {
    const box = document.querySelector<HTMLElement>(".what-box-in");
    if (!box) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          box.style.display = "flex";
          io.disconnect();
        }
      },
      { rootMargin: "-20% 0px -20% 0px" }
    );
    io.observe(box.closest(".whatIDO") as Element);
    return () => io.disconnect();
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>PRODUCT</h3>
              <h4>Strategy & Execution</h4>
              <p>
                End-to-end product ownership from discovery to GTM — roadmapping,
                PRD writing, user research, A/B testing, and cross-functional
                stakeholder management.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Product Discovery</div>
                <div className="what-tags">Roadmapping</div>
                <div className="what-tags">PRD Writing</div>
                <div className="what-tags">A/B Testing</div>
                <div className="what-tags">GTM Strategy</div>
                <div className="what-tags">Figma</div>
                <div className="what-tags">JIRA</div>
                <div className="what-tags">Confluence</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>GROWTH</h3>
              <h4>Analytics & AI</h4>
              <p>
                Driving revenue, conversion, and retention through funnel analysis,
                persona-based re-engagement, and shipping AI-powered tools that
                cut manual effort and scale operations.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">SQL</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">Mixpanel</div>
                <div className="what-tags">Metabase</div>
                <div className="what-tags">Google Analytics</div>
                <div className="what-tags">n8n</div>
                <div className="what-tags">Funnel Analysis</div>
                <div className="what-tags">Retention</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
