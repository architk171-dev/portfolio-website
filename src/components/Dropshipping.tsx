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

const Learnings = ({ items }: { items: DropJourney["learnings"] }) => {
  const [n, setN] = useState(0);
  const cur = items[n];
  return (
    <div className="ds-learn" data-reveal>
      <div className="ds-chips" role="tablist" aria-label="What I learned">
        {items.map((x, i) => (
          <button key={x.label} type="button" role="tab" id={`ds-l-${i}`} aria-selected={i === n} aria-controls="ds-l-panel" className={i === n ? "is-active" : undefined} onClick={() => setN(i)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="ds-l-panel" id="ds-l-panel" role="tabpanel" aria-labelledby={`ds-l-${n}`} key={n}>
        <h3>{cur.title}</h3>
        <ul>
          {cur.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Phases = ({ videos }: { videos: NonNullable<DropJourney["videos"]> }) => {
  const [v, setV] = useState(Math.min(1, videos.length - 1));
  const cur = videos[v];
  return (
    <div className="ds-col-media">
      <h3 className="ds-h3">The build, phase by phase</h3>
      <video
        key={cur.src}
        className="ds-video"
        src={`${cur.src}#t=0.5`}
        controls
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={cur.title}
        onMouseEnter={(e) => window.matchMedia("(hover: hover) and (pointer: fine)").matches && e.currentTarget.play().catch(() => undefined)}
        onMouseLeave={(e) => window.matchMedia("(hover: hover) and (pointer: fine)").matches && e.currentTarget.pause()}
      />
      <div className="ds-phases" role="tablist" aria-label="Phases">
        {videos.map((x, n) => (
          <button key={x.src} type="button" role="tab" aria-selected={n === v} className={n === v ? "is-active" : undefined} onClick={() => setV(n)}>
            {x.title}
          </button>
        ))}
      </div>
      {cur.caption && <p className="ds-cap">{cur.caption}</p>}
    </div>
  );
};

const MetaAds = ({ m, cur }: { m: NonNullable<DropJourney["meta"]>; cur: string }) => {
  type Key = "purchases" | "roas" | "cpp";
  const [sort, setSort] = useState<Key>("purchases");
  const rows = m.adsets.map((a) => ({ ...a, cpp: a.purchases > 0 ? a.spend / a.purchases : Infinity }));
  const sorted = [...rows].sort((a, b) => (sort === "cpp" ? a.cpp - b.cpp : b[sort] - a[sort]));
  const maxPur = Math.max(...rows.map((r) => r.purchases));
  const maxRoas = Math.max(...rows.map((r) => r.roas));
  const maxFun = m.funnel[0].value;
  const ctr = (m.linkClicks / m.impressions) * 100;
  const cppAll = m.spend / m.purchases;
  const sorts: { k: Key; label: string }[] = [
    { k: "purchases", label: "Most purchases" },
    { k: "roas", label: "Best return" },
    { k: "cpp", label: "Cheapest purchase" },
  ];
  return (
    <div className="ds-block ds-meta-block" data-reveal>
      <h3 className="ds-h3">Meta ads, from the ad manager</h3>
      <p className="ds-cap ds-cap-top">{m.period}</p>
      <ul className="ds-totals ds-traffic-totals">
        <li><span className="ds-t-label">Ad spend</span><span className="metric-value ds-t-value">{cur}{fmt(m.spend)}</span></li>
        <li><span className="ds-t-label">Purchases</span><span className="metric-value ds-t-value">{fmt(m.purchases)}</span><span className="ds-t-sub">{cur}{fmt(cppAll)} each</span></li>
        <li><span className="ds-t-label">Return on ad spend</span><span className="metric-value ds-t-value">{m.roas}x</span><span className="ds-t-sub">as reported by Meta</span></li>
        <li><span className="ds-t-label">Link click rate</span><span className="metric-value ds-t-value">{ctr.toFixed(2)}%</span><span className="ds-t-sub">{fmt(m.linkClicks)} clicks</span></li>
      </ul>

      <div className="ds-meta-grid">
        <div className="ds-meta-card">
          <h4>Where shoppers dropped</h4>
          <ol className="ds-funnel">
            {m.funnel.map((f, i) => {
              const prev = i > 0 ? m.funnel[i - 1].value : null;
              return (
                <li key={f.label}>
                  <div className="ds-fun-top"><span>{f.label}</span><b>{fmt(f.value)}</b></div>
                  <i style={{ width: `${Math.max(2, (f.value / maxFun) * 100)}%` }} />
                  {prev && <small>{((f.value / prev) * 100).toFixed(0)}% of the step before</small>}
                </li>
              );
            })}
          </ol>
          <p className="ds-note">Two of every three people who started checkout did not finish. That is where the next fix lives.</p>
        </div>

        <div className="ds-meta-card">
          <h4>Ad sets, ranked</h4>
          <div className="ds-sorts" role="tablist" aria-label="Sort ad sets">
            {sorts.map((o) => (
              <button key={o.k} type="button" role="tab" aria-selected={sort === o.k} className={sort === o.k ? "is-active" : undefined} onClick={() => setSort(o.k)}>
                {o.label}
              </button>
            ))}
          </div>
          <ul className="ds-adsets">
            {sorted.map((a) => (
              <li key={a.name}>
                <div className="ds-ad-top">
                  <span className="ds-ad-name">{a.name}</span>
                  <span className="ds-ad-stats">{a.purchases} purchases · {a.roas.toFixed(1)}x · {a.cpp === Infinity ? "n/a" : `${cur}${fmt(a.cpp)}`} each</span>
                </div>
                <div className="ds-ad-bars">
                  <i className="ds-ad-pur" style={{ width: `${(a.purchases / maxPur) * 100}%` }} />
                  <i className="ds-ad-roas" style={{ width: `${(a.roas / maxRoas) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="ds-legend2"><span><i className="ds-ad-pur" /> Purchases</span><span><i className="ds-ad-roas" /> Return on spend</span></p>
        </div>
      </div>

      <p className="ds-cap">An awareness ad set reached {fmt(m.awareness.reach)} people for {cur}{fmt(m.awareness.spend)}. The ad sets above are the ones built to sell.</p>
    </div>
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
        <p className="eyebrow">Started as a college project</p>
        <h2 className="section-title" id="drop-title">
          My dropshipping <em>journey.</em>
        </h2>
        <p className="section-intro">{d.summary}</p>
      </div>

      <Learnings items={d.learnings} />

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

      {((d.videos && d.videos.length > 0) || (d.products && d.products.length > 0)) && (
        <div className="ds-block ds-media" data-reveal>
          {d.videos && d.videos.length > 0 && <Phases videos={d.videos} />}
          {d.products && d.products.length > 0 && (
            <div className="ds-col-media">
              <h3 className="ds-h3">Hero products</h3>
              <ul className="ds-products">
                {d.products.map((p) => (
                  <li key={p.name}>
                    {p.image && <img src={p.image} alt={p.name} loading="lazy" />}
                    <div className="ds-prod-text">
                      <strong>{p.name}</strong>
                      <span>{p.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {d.meta && <MetaAds m={d.meta} cur={d.currency} />}

      {d.traffic && (
        <div className="ds-block" data-reveal>
          <h3 className="ds-h3">Where visitors came from</h3>
          <p className="ds-cap ds-cap-top">{d.traffic.period}</p>
          <ul className="ds-totals ds-traffic-totals">
            <li><span className="ds-t-label">Sessions</span><span className="metric-value ds-t-value">{fmt(d.traffic.sessions)}</span></li>
            <li><span className="ds-t-label">Engagement rate</span><span className="metric-value ds-t-value">{d.traffic.engagementRate}%</span></li>
            <li><span className="ds-t-label">Key events</span><span className="metric-value ds-t-value">{fmt(d.traffic.keyEvents)}</span></li>
            <li><span className="ds-t-label">Tracked revenue</span><span className="metric-value ds-t-value">{cur}{fmt(d.traffic.revenue)}</span></li>
          </ul>
        </div>
      )}

      {d.storeUrl && (
        <p className="ds-visit" data-reveal>
          <a href={d.storeUrl} target="_blank" rel="noopener noreferrer">Visit {d.storeName} <span aria-hidden="true">↗</span></a>
        </p>
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
