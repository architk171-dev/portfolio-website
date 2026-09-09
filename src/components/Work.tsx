import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "FarMart Supply Chain",
    category: "AgriTech · PM1",
    tools: "JIRA, Figma, SQL, Metabase, Cashfree API, n8n",
    desc: "Re-architected multi-truck workflows, AI deduction reports, automated KYC & invoicing",
    metric: "55%",
    metricLabel: "TAT Reduction",
    gradient: "linear-gradient(135deg, #1a472a, #2d7a4f)",
  },
  {
    title: "INDmoney Growth",
    category: "FinTech · APM",
    tools: "Mixpanel, SQL, Figma, Razorpay, ICICI UPI",
    desc: "MF Baskets, UPI for mutual funds, F&O trading, AI Portfolio Scan",
    metric: "15K+",
    metricLabel: "New Investors",
    gradient: "linear-gradient(135deg, #1a1a4f, #3d2d7a)",
  },
  {
    title: "Café Venture",
    category: "F&B · Co-founder",
    tools: "Petpooja POS, Swiggy, Zomato, Instagram Ads",
    desc: "₹75L revenue, P&L ownership, menu experiments, vendor management",
    metric: "₹75L",
    metricLabel: "Revenue",
    gradient: "linear-gradient(135deg, #4a2a1a, #7a4d2d)",
  },
  {
    title: "Corra Club",
    category: "Freelance · Consultant",
    tools: "Google Analytics, Figma, Hotjar",
    desc: "Doubled conversion 4%→8% via landing page UX redesign & checkout RCAs",
    metric: "2×",
    metricLabel: "Conversion Lift",
    gradient: "linear-gradient(135deg, #2a1a4a, #5d2d7a)",
  },
  {
    title: "LeadBahi.ai",
    category: "Hackathon · 2nd Runner-up",
    tools: "WhatsApp API, AI/ML, Voice-first UX",
    desc: "Voice-first WhatsApp AI tool for lead management, FarMart Hackathon 2025",
    metric: "AI",
    metricLabel: "Voice-first UX",
    gradient: "linear-gradient(135deg, #1a3a4a, #2d6a7a)",
  },
  {
    title: "IEEE Research",
    category: "ICCCNT 2023 · IIT Delhi",
    tools: "Python, ML, DNS Analysis",
    desc: "Co-authored paper on ML malicious-DNS detection at 95% accuracy",
    metric: "95%",
    metricLabel: "Detection Accuracy",
    gradient: "linear-gradient(135deg, #3a1a1a, #7a2d2d)",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Stack</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "12px", opacity: 0.7, fontSize: "14px" }}>
                  {project.desc}
                </p>
              </div>
              <div className="work-image">
                <div
                  className="work-metric-card"
                  style={{ background: project.gradient }}
                >
                  <span className="work-metric-value">{project.metric}</span>
                  <span className="work-metric-label">{project.metricLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
