import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { DropJourney, dropshipping } from "../data/dropshipping";
import "./styles/Dropshipping.css";

const useCountUp = (target: number, run: boolean) => {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !run) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 700;
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);
  return value;
};

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

const Count = ({ value, prefix = "", suffix = "", run }: { value: number; prefix?: string; suffix?: string; run: boolean }) => {
  const v = useCountUp(value, run);
  const neg = v < 0;
  return (
    <>
      {neg ? "-" : ""}
      {prefix}
      {fmt(Math.abs(v))}
      {suffix}
    </>
  );
};

const Journey = ({ d }: { d: DropJourney }) => {
  const [i, setI] = useState(() => {
    const best = d.months.reduce((b, m, n) => (m.revenue > d.months[b].revenue ? n : b), 0);
    return best;
  });
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = d.months[i];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const totals = d.months.reduce(
    (a, x) => ({
      revenue: a.revenue + x.revenue,
      orders: a.orders + (x.orders ?? 0),
      cogs: a.cogs + (x.cogs ?? 0),
      adSpend: a.adSpend + x.adSpend,
      profit: a.profit + x.profit,
    }),
    { revenue: 0, orders: 0, cogs: 0, adSpend: 0, profit: 0 }
  );
  const hasOrders = d.months.every((x) => x.orders !== undefined);
  const hasCogs = d.months.every((x) => x.cogs !== undefined);
  const roas = d.showRoas && totals.adSpend > 0 ? totals.revenue / totals.adSpend : null;
  const gm = hasCogs && totals.revenue > 0 ? ((totals.revenue - totals.cogs) / totals.revenue) * 100 : null;
  const margin = totals.revenue > 0 ? (totals.profit / totals.revenue) * 100 : null;
  const noun = d.periodNoun ?? "Month";
  const profitLabel = d.profitLabel ?? "Profit";
  const maxVal = Math.max(...d.months.flatMap((x) => [x.revenue, x.adSpend]), 1);
  const bestIdx = d.months.reduce((b, x, n) => (x.profit > d.months[b].profit ? n : b), 0);

  const select = (n: number) => {
    const t = (n + d.months.length) % d.months.length;
    setI(t);
    tabRefs.current[t]?.focus({ preventScroll: true });
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") select(i + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") select(i - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(d.months.length - 1);
    else return;
    e.preventDefault();
  };

  const cur = d.currency;
  const mRoas = d.showRoas && m.adSpend > 0 ? m.revenue / m.adSpend : null;
  const mAov = m.orders ? m.revenue / m.orders : null;
  const mGm = m.cogs !== undefined && m.revenue > 0 ? ((m.revenue - m.cogs) / m.revenue) * 100 : null;
  const mMargin = m.revenue > 0 ? (m.profit / m.revenue) * 100 : null;

  return (
    <div ref={rootRef}>
      <div className="section-head" data-reveal>
        <p className="eyebrow">Side venture</p>
        <h2 className="section-title" id="drop-title">
          My dropshipping <em>journey.</em>
        </h2>
        <p className="section-intro">{d.summary}</p>
      </div>

      <div className="ds-meta" data-reveal>
        <span>{d.storeName}</span>
        <span>{d.niche}</span>
        <span>{d.platform}</span>
        <span>{d.period}</span>
        <span className="ds-status">{d.status}</span>
      </div>

      <ul className="ds-totals" aria-label="Totals" data-reveal>
        <li>
          <span className="ds-t-label">Revenue</span>
          <span className="metric-value ds-t-value"><Count value={totals.revenue} prefix={cur} run={inView} /></span>
        </li>
        {hasOrders && (
          <li>
            <span className="ds-t-label">Orders</span>
            <span className="metric-value ds-t-value"><Count value={totals.orders} run={inView} /></span>
          </li>
        )}
        {gm !== null && (
          <li>
            <span className="ds-t-label">Gross margin</span>
            <span className="metric-value ds-t-value">{gm.toFixed(1)}%</span>
          </li>
        )}
        <li>
          <span className="ds-t-label">Ad spend</span>
          <span className="metric-value ds-t-value"><Count value={totals.adSpend} prefix={cur} run={inView} /></span>
        </li>
        <li>
          <span className="ds-t-label">{profitLabel}</span>
          <span className={`metric-value ds-t-value${totals.profit < 0 ? " is-neg" : ""}`}>
            <Count value={totals.profit} prefix={cur} run={inView} />
          </span>
          {margin !== null && <span className="ds-t-sub">{margin.toFixed(1)}% of revenue</span>}
        </li>
        {roas !== null && (
          <li>
            <span className="ds-t-label">ROAS</span>
            <span className="metric-value ds-t-value">{roas.toFixed(1)}x</span>
          </li>
        )}
      </ul>

      <div className="ds-dash" data-reveal>
        <div className="ds-chart-card">
          <div className="ds-legend" aria-hidden="true">
            <span><i className="ds-dot ds-dot-rev" /> Revenue</span>
            <span><i className="ds-dot ds-dot-ad" /> Ad spend</span>
          </div>
          <div className="ds-chart" role="tablist" aria-label="Months" aria-orientation="horizontal" onKeyDown={onKey}>
            {d.months.map((x, n) => (
              <button
                key={x.label}
                ref={(el) => (tabRefs.current[n] = el)}
                role="tab"
                id={`ds-tab-${n}`}
                aria-selected={n === i}
                aria-controls="ds-panel"
                tabIndex={n === i ? 0 : -1}
                className={`ds-col${n === i ? " is-active" : ""}`}
                onClick={() => setI(n)}
                aria-label={`${noun} ${x.label}: revenue ${cur}${fmt(x.revenue)}, ad spend ${cur}${fmt(x.adSpend)}`}
              >
                <span className="ds-bars">
                  <span className="ds-bar ds-bar-rev" style={{ height: `${(x.revenue / maxVal) * 100}%` }} />
                  <span className="ds-bar ds-bar-ad" style={{ height: `${(x.adSpend / maxVal) * 100}%` }} />
                </span>
                {x.tag && <span className="ds-flag" aria-hidden="true" />}
                {n === bestIdx && <span className="ds-best" aria-hidden="true">Best</span>}
                <span className="ds-col-label">{x.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="ds-panel" id="ds-panel" role="tabpanel" aria-labelledby={`ds-tab-${i}`} key={i}>
          <header>
            <h3>{noun} {m.label.replace(/^\D+/, "") || m.label}</h3>
            {m.dates && <span className="ds-dates">{m.dates}</span>}
            {m.tag && <span className="ds-tag">{m.tag}</span>}
          </header>
          <dl className="ds-kpis">
            <div><dt>Revenue</dt><dd className="metric-value">{cur}{fmt(m.revenue)}</dd></div>
            {m.orders !== undefined && <div><dt>Orders</dt><dd className="metric-value">{fmt(m.orders)}</dd></div>}
            {m.cogs !== undefined && <div><dt>Cost of goods</dt><dd className="metric-value">{cur}{fmt(m.cogs)}</dd></div>}
            {mGm !== null && <div><dt>Gross margin</dt><dd className="metric-value">{mGm.toFixed(1)}%</dd></div>}
            <div><dt>Ad spend</dt><dd className="metric-value">{cur}{fmt(m.adSpend)}</dd></div>
            <div>
              <dt>{profitLabel}</dt>
              <dd className={`metric-value${m.profit < 0 ? " is-neg" : " is-pos"}`}>
                {m.profit < 0 ? "-" : ""}{cur}{fmt(Math.abs(m.profit))}
              </dd>
            </div>
            {mMargin !== null && <div><dt>Net margin</dt><dd className="metric-value">{mMargin.toFixed(1)}%</dd></div>}
            {mRoas !== null && <div><dt>ROAS</dt><dd className="metric-value">{mRoas.toFixed(1)}x</dd></div>}
            {mAov !== null && <div><dt>Avg order</dt><dd className="metric-value">{cur}{fmt(mAov)}</dd></div>}
          </dl>
          {m.note && <p className="ds-note">{m.note}</p>}
          {m.images && m.images.length > 0 && (
            <ul className="ds-shots">
              {m.images.map((src) => (
                <li key={src}>
                  <img src={src} alt={`${d.storeName}, ${m.label}`} loading="lazy" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {d.products && d.products.length > 0 && (
        <div className="ds-block" data-reveal>
          <h3 className="ds-h3">Hero products</h3>
          <ul className="ds-products">
            {d.products.map((p) => (
              <li key={p.name}>
                {p.image && <img src={p.image} alt={p.name} loading="lazy" />}
                <strong>{p.name}</strong>
                <span>{p.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {d.video && (
        <div className="ds-block" data-reveal>
          <h3 className="ds-h3">{d.video.title}</h3>
          <video className="ds-video" src={d.video.src} controls playsInline preload="metadata" aria-label={d.video.title} />
          {d.video.caption && <p className="ds-cap">{d.video.caption}</p>}
        </div>
      )}

      {d.books && (
        <div className="ds-block" data-reveal>
          <h3 className="ds-h3">From the books</h3>
          <a className="ds-books" href={d.books.image} target="_blank" rel="noopener noreferrer">
            <img src={d.books.image} alt="Weekly profit and loss sheet" loading="lazy" />
          </a>
          <p className="ds-cap">{d.books.caption}</p>
        </div>
      )}

      {d.storeUrl && (
        <p className="ds-visit" data-reveal>
          <a href={d.storeUrl} target="_blank" rel="noopener noreferrer">Visit {d.storeName} <span aria-hidden="true">↗</span></a>
        </p>
      )}

      {d.lessons.length > 0 && (
        <div className="ds-block" data-reveal>
          <h3 className="ds-h3">What it taught me</h3>
          <ol className="ds-lessons">
            {d.lessons.map((l, n) => (
              <li key={l}>
                <span aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                <p>{l}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

const Dropshipping = () => {
  if (!dropshipping || dropshipping.months.length === 0) return null;
  return (
    <section className="section ds-section" id="dropshipping" aria-labelledby="drop-title">
      <Journey d={dropshipping} />
    </section>
  );
};

export default Dropshipping;
