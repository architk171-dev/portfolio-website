import { useCallback, useEffect, useState } from "react";
import { productCases } from "../data/productCases";
import ProductCaseCard from "./ProductCaseCard";
import ProductCaseDetail from "./ProductCaseDetail";
import "./styles/ProductCases.css";

const HASH_PREFIX = "#case/";
const idFromHash = () =>
  window.location.hash.startsWith(HASH_PREFIX) ? window.location.hash.slice(HASH_PREFIX.length) : null;

const ProductCases = () => {
  const [openId, setOpenId] = useState<string | null>(() => idFromHash());

  useEffect(() => {
    const sync = () => setOpenId(idFromHash());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const open = useCallback((id: string) => {
    const state = { caseOpen: true };
    if (window.location.hash.startsWith(HASH_PREFIX)) window.history.replaceState(state, "", `${HASH_PREFIX}${id}`);
    else window.history.pushState(state, "", `${HASH_PREFIX}${id}`);
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.caseOpen) window.history.back();
    else {
      window.history.replaceState(null, "", "#work");
      setOpenId(null);
    }
  }, []);

  const current = productCases.find((c) => c.id === openId) ?? null;
  const next = current ? productCases[(productCases.indexOf(current) + 1) % productCases.length] : null;

  return (
    <section className="section pc-section" id="work" aria-labelledby="work-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Selected case studies</p>
        <h2 className="section-title" id="work-title">
          Products I've designed, <em>end to end.</em>
        </h2>
        <p className="section-intro">
          Two product case studies, from the problem and the flows to the screens, the architecture and the numbers.
        </p>
      </div>

      <ol className="pc-list">
        {productCases.map((c) => (
          <li key={c.id} data-reveal>
            <ProductCaseCard c={c} onOpen={open} />
          </li>
        ))}
      </ol>

      {current && next && <ProductCaseDetail c={current} next={next} onClose={close} onOpen={open} />}
    </section>
  );
};

export default ProductCases;
