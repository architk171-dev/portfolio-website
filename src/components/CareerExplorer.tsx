import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { roles } from "../data/roles";
import "./styles/CareerExplorer.css";

const CareerExplorer = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section tl-section" id="experience" aria-labelledby="experience-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Experience</p>
        <h2 className="section-title" id="experience-title">
          Every role, <em>and what I shipped in it.</em>
        </h2>
        <p className="section-intro">Open any role to see what I owned and the numbers behind it.</p>
      </div>

      <ol className="tl">
        {roles.map((r) => {
          const open = openId === r.id;
          return (
            <li className="tl-item" key={r.id} data-reveal>
              <span className="tl-date">{r.dates}</span>
              <span className={`tl-dot${r.current ? " is-current" : ""}`} aria-hidden="true" />
              <article className={`tl-card${open ? " is-open" : ""}`}>
                <h3 className="tl-head">
                  <button
                    type="button"
                    className="tl-trigger"
                    aria-expanded={open}
                    aria-controls={`tl-more-${r.id}`}
                    id={`tl-trigger-${r.id}`}
                    onClick={() => setOpenId(open ? null : r.id)}
                  >
                    <span className="tl-titles">
                      <span className="tl-company">{r.company}</span>
                      <span className="tl-meta">{r.meta}</span>
                    </span>
                    {r.current && <span className="tl-badge">Current</span>}
                    <span className="tl-chev" aria-hidden="true">
                      <MdAdd />
                    </span>
                  </button>
                </h3>

                <p className="tl-summary">{r.summary}</p>

                <div
                  className="tl-more"
                  id={`tl-more-${r.id}`}
                  role="region"
                  aria-labelledby={`tl-trigger-${r.id}`}
                >
                  <div className="tl-more-inner">
                    <p className="tl-context">{r.context}</p>

                    <ul className="tl-metrics" aria-label="Key numbers">
                      {r.metrics.map((m) => (
                        <li key={m.label}>
                          <span className="metric-value tl-metric-value">{m.value}</span>
                          <span className="tl-metric-label">{m.label}</span>
                        </li>
                      ))}
                    </ul>

                    {r.groups.map((g) => (
                      <section className="tl-group" key={g.title}>
                        <h4>{g.title}</h4>
                        <ul>
                          {g.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </section>
                    ))}

                    <ul className="chip-list tl-tools" aria-label="Tools">
                      {r.tools.map((t) => (
                        <li className="chip" key={t}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default CareerExplorer;
