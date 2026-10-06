import { MouseEvent } from "react";
import { MdArrowForward } from "react-icons/md";
import { ProductCase } from "../data/productCases";
import PhoneCollage from "./PhoneCollage";

type Props = { c: ProductCase; onOpen: (id: string) => void };

const ProductCaseCard = ({ c, onOpen }: Props) => {
  const tilt = (e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${(-y * 3).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--ry", `${(x * 3).toFixed(2)}deg`);
  };
  const untilt = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <article className="pc-card" onMouseMove={tilt} onMouseLeave={untilt}>
      <span className="pc-num" aria-hidden="true">{c.number}</span>
      <span className="pc-year">{c.year}</span>
      <div className="pc-visual">
        <PhoneCollage {...c.collage} label={`${c.focus}: app screens`} />
      </div>
      <div className="pc-body">
        <h3 className="pc-headline">
          {c.headline} <em>{c.accent}</em>
        </h3>
        <ul className="pc-tags" aria-label="Topics">
          {c.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="pc-summary">{c.summary}</p>
        <button
          type="button"
          className="pc-more"
          onClick={() => onOpen(c.id)}
          aria-label={`View more: ${c.headline} ${c.accent}`}
        >
          View more <MdArrowForward aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default ProductCaseCard;
