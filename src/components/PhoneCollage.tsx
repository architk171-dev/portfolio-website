import { CSSProperties } from "react";

type PhoneProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export const PhoneShot = ({ src, alt = "", className = "", style }: PhoneProps) => (
  <div className={`pc-phone ${className}`} style={style}>
    <img src={src} alt={alt} width={390} height={844} loading="lazy" draggable={false} />
  </div>
);

type CollageProps = {
  main: string;
  left: string;
  right: string;
  label: string;
};

const PhoneCollage = ({ main, left, right, label }: CollageProps) => (
  <div className="pc-collage" role="img" aria-label={label}>
    <PhoneShot src={left} className="pc-phone-left" />
    <PhoneShot src={right} className="pc-phone-right" />
    <PhoneShot src={main} className="pc-phone-main" />
  </div>
);

export default PhoneCollage;
