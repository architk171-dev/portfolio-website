import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> achievements
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>PGP TBM</h4>
                <h5>Masters' Union</h5>
              </div>
              <h3>2026-Present</h3>
            </div>
            <p>
              PGP in Technology & Business Management. Awarded the Manoj Kohli
              Merit Scholarship (25% tuition). Product specialization with
              live projects at FarMart and INDmoney.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BTech ECE</h4>
                <h5>BVCOE, GGSIPU</h5>
              </div>
              <h3>2019-2023</h3>
            </div>
            <p>
              9.0 CGPA, Top 5% of class. Co-authored IEEE research paper on
              ML-based malicious DNS detection (95% accuracy) presented at
              ICCCNT 2023, IIT Delhi.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>LeadBahi.ai</h4>
                <h5>FarMart Hackathon</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              2nd Runner-up — built a voice-first WhatsApp AI tool for
              lead management. Competed against 50+ teams across product,
              engineering, and business tracks.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Café Co-founder</h4>
                <h5>F&B Venture</h5>
              </div>
              <h3>Jul'23-May'24</h3>
            </div>
            <p>
              Co-founded and scaled a café to ₹75L revenue. Full P&L ownership
              — menu experiments, vendor management, Swiggy/Zomato listings,
              and Instagram growth marketing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
