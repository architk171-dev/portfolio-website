import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdArrowBack, MdArrowForward, MdClose, MdOpenInNew } from "react-icons/md";
import { Block, ProductCase, Screen } from "../data/productCases";
import PhoneCollage, { PhoneShot } from "./PhoneCollage";
import "./styles/ProductCaseDetail.css";

type Props = {
  c: ProductCase;
  next: ProductCase;
  onClose: () => void;
  onOpen: (id: string) => void;
};

const ScreenWalk = ({ caseId, screens }: { caseId: string; screens: Screen[] }) => {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = screens[i];

  const go = (n: number) => {
    const t = (n + screens.length) % screens.length;
    setI(t);
    refs.current[t]?.focus({ preventScroll: true });
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (["ArrowDown", "ArrowRight"].includes(e.key)) go(i + 1);
    else if (["ArrowUp", "ArrowLeft"].includes(e.key)) go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(screens.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="pc-walk">
      <div className="pc-walk-stage">
        <PhoneShot key={s.file} src={`/cases/${caseId}/${s.file}.webp`} alt={`${s.name} screen`} className="pc-walk-phone" />
        <div className="pc-walk-nav">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous screen">
            <MdArrowBack aria-hidden="true" />
          </button>
          <span>
            {String(i + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next screen">
            <MdArrowForward aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="pc-walk-list" role="tablist" aria-label="Screens" aria-orientation="vertical" onKeyDown={onKey}>
        {screens.map((sc, n) => (
          <button
            key={sc.file}
            ref={(el) => (refs.current[n] = el)}
            role="tab"
            id={`walk-${caseId}-${n}`}
            aria-selected={n === i}
            tabIndex={n === i ? 0 : -1}
            className={`pc-walk-item${n === i ? " is-active" : ""}`}
            onClick={() => setI(n)}
          >
            <span className="pc-walk-n">{String(n + 1).padStart(2, "0")}</span>
            <span className="pc-walk-body">
              <span className="pc-walk-name">{sc.name}</span>
              {n === i && (
                <span className="pc-walk-detail">
                  <span>
                    <b>Job of the screen</b>
                    {sc.job}
                  </span>
                  <span>
                    <b>Choice worth defending</b>
                    {sc.choice}
                  </span>
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Blocks = ({ blocks, c }: { blocks: Block[]; c: ProductCase }) => (
  <>
    {blocks.map((b, idx) => {
      switch (b.t) {
        case "p":
          return <p className="pc-p" key={idx}>{b.text}</p>;
        case "list":
          return (
            <ul className="pc-list-plain" key={idx}>
              {b.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        case "steps":
          return (
            <div className="pc-block" key={idx}>
              {b.heading && <h3 className="pc-h3">{b.heading}</h3>}
              <ol className="pc-steps">
                {b.items.map((it, n) => (
                  <li key={it.title}>
                    <span className="pc-step-n" aria-hidden="true">{n + 1}</span>
                    <div>
                      <h4>{it.title}</h4>
                      <p>{it.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        case "table":
          return (
            <div className="pc-block" key={idx}>
              {b.heading && <h3 className="pc-h3">{b.heading}</h3>}
              <div className="pc-table-wrap">
                <table className="pc-table">
                  <thead>
                    <tr>
                      {b.columns.map((col) => (
                        <th key={col} scope="col">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, k) => (
                          <td key={k} data-label={b.columns[k]}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        case "callout":
          return (
            <aside className="pc-callout" key={idx}>
              <span>{b.label}</span>
              <p>{b.text}</p>
            </aside>
          );
        case "scenario":
          return (
            <article className="pc-scenario" key={idx}>
              <h3>{b.title}</h3>
              <dl>
                <div><dt>How we catch it</dt><dd>{b.catch}</dd></div>
                <div><dt>Who fixes it</dt><dd>{b.fix}</dd></div>
                <div><dt>What the user sees</dt><dd>{b.user}</dd></div>
              </dl>
              {b.columns && b.rows && (
                <div className="pc-table-wrap">
                  <table className="pc-table">
                    <thead>
                      <tr>
                        {b.columns.map((col) => (
                          <th key={col} scope="col">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, k) => (
                            <td key={k} data-label={b.columns![k]}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          );
        case "screens":
          return <ScreenWalk key={idx} caseId={c.id} screens={c.screens} />;
        default:
          return null;
      }
    })}
  </>
);

const ProductCaseDetail = ({ c, next, onClose, onOpen }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(c.sections[0].id);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    document.body.classList.add("case-open");
    rootRef.current?.focus();
    const onKey = (e: KeyboardEvent | globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey as EventListener);
      document.body.style.overflowY = prevOverflow || "auto";
      document.body.classList.remove("case-open");
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.scrollTo({ top: 0 });
    setActive(c.sections[0].id);
    const update = () => {
      const line = root.getBoundingClientRect().top + 200;
      let current = c.sections[0].id;
      c.sections.forEach((s) => {
        const el = document.getElementById(`${c.id}-${s.id}`);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      });
      setActive(current);
    };
    root.addEventListener("scroll", update, { passive: true });
    return () => root.removeEventListener("scroll", update);
  }, [c]);

  const jump = (id: string) => {
    document.getElementById(`${c.id}-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return createPortal(
    <div
      className="pc-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pc-title"
      ref={rootRef}
      tabIndex={-1}
    >
      <div className="pc-bar">
        <button type="button" className="pc-back" onClick={onClose}>
          <MdArrowBack aria-hidden="true" /> Back to work
        </button>
        <span className="pc-bar-meta">
          Case study {c.number} · {c.kind} · {c.year}
        </span>
        <button type="button" className="pc-x" onClick={onClose} aria-label="Close case study">
          <MdClose aria-hidden="true" />
        </button>
      </div>

      <nav className="pc-chips" aria-label="Sections">
        {c.sections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={active === s.id ? "is-active" : undefined}
            aria-current={active === s.id ? "true" : undefined}
            onClick={() => jump(s.id)}
          >
            {s.title} {s.accent.replace(/\.$/, "")}
          </button>
        ))}
      </nav>

      <article className="pc-page" key={c.id}>
        <header className="pc-hero">
          <p className="eyebrow">
            Case study {c.number} · {c.kind} · {c.year}
          </p>
          <h1 className="pc-title" id="pc-title">
            {c.headline} <em>{c.accent}</em>
          </h1>
          <p className="pc-lede">{c.summary}</p>
          <a className="pc-figma" href={c.figmaUrl} target="_blank" rel="noopener noreferrer">
            View the designs in Figma <MdOpenInNew aria-hidden="true" />
          </a>
        </header>

        <div className="pc-hero-art">
          <PhoneCollage {...c.collage} label={`${c.focus}: app screens`} />
        </div>

        <dl className="pc-brief">
          <div><dt>Type</dt><dd>{c.kind}</dd></div>
          <div><dt>Focus</dt><dd>{c.focus}</dd></div>
          <div><dt>Year</dt><dd>{c.period}</dd></div>
          <div><dt>Skills</dt><dd>{c.tools.join(", ")}</dd></div>
        </dl>

        {c.sections.map((s) => (
          <section className="pc-sec" id={`${c.id}-${s.id}`} key={s.id} aria-labelledby={`${c.id}-${s.id}-h`}>
            <h2 className="pc-h2" id={`${c.id}-${s.id}-h`}>
              {s.title} <em>{s.accent}</em>
            </h2>
            <Blocks blocks={s.blocks} c={c} />
          </section>
        ))}

        <footer className="pc-foot">
          <p className="pc-foot-label">Next case study</p>
          <button type="button" className="pc-next" onClick={() => onOpen(next.id)}>
            <span>
              {next.headline} <em>{next.accent}</em>
            </span>
            <MdArrowForward aria-hidden="true" />
          </button>
          <button type="button" className="pc-more" onClick={onClose}>
            Back to all work
          </button>
        </footer>
      </article>
    </div>,
    document.body
  );
};

export default ProductCaseDetail;
