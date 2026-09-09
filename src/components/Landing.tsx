import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ARCHIT
              <br />
              <span>KUMAR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Product</h3>
            <h2 className="landing-info-h2 landing-role-text">
              <span>Manager</span>
            </h2>
            <h2 className="landing-role-text-sub">
              <span>& Builder</span>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
