import { useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { Tile, spotifyNote, spotifyUrl, tiles } from "../data/laptopClosed";
import "./styles/LaptopClosed.css";

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const VideoMedia = ({ src, title }: { src: string; title: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => ref.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  const pause = () => {
    ref.current?.pause();
    setPlaying(false);
  };
  const toggle = () => (playing ? pause() : play());

  return (
    <>
      <video
        ref={ref}
        className="lc-media"
        src={`${src}#t=0.5`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="lc-play"
        aria-label={`${playing ? "Pause" : "Play"} video: ${title}`}
        aria-pressed={playing}
        onClick={toggle}
        onMouseEnter={() => finePointer() && !reducedMotion() && play()}
        onMouseLeave={() => finePointer() && pause()}
      >
        <span aria-hidden="true">{playing ? <MdPause /> : <MdPlayArrow />}</span>
      </button>
    </>
  );
};

const PairMedia = ({ srcs }: { srcs: string[] }) => (
  <div className="lc-pair">
    {srcs.map((s) => (
      <img key={s} src={s} alt="" loading="lazy" />
    ))}
  </div>
);

const TileView = ({ t }: { t: Tile }) => (
  <article className={`lc-tile lc-${t.id}`} data-reveal>
    {t.media.kind === "video" && <VideoMedia src={t.media.src} title={t.title} />}
    {t.media.kind === "image" && <img className="lc-media" src={t.media.src} alt={t.title} loading="lazy" />}
    {t.media.kind === "flip" && <PairMedia srcs={t.media.srcs} />}
    <div className="lc-copy">
      <span className="lc-tag">{t.tag}</span>
      <h3>{t.title}</h3>
      <p>{t.text}</p>
      {t.chips && (
        <ul className="lc-chips">
          {t.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  </article>
);

const embedUrl = (u: string) => {
  try {
    const x = new URL(u);
    if (x.hostname !== "open.spotify.com") return null;
    const path = x.pathname.replace(/^\/intl-[a-z-]+/, "").replace(/^\/embed/, "");
    return `https://open.spotify.com/embed${path}`;
  } catch {
    return null;
  }
};

const LaptopClosed = () => {
  const song = spotifyUrl ? embedUrl(spotifyUrl) : null;
  return (
    <section className="section lc-section" id="off-the-clock" aria-labelledby="lc-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Off the clock</p>
        <h2 className="section-title" id="lc-title">
          When the laptop's <em>closed.</em>
        </h2>
        <p className="section-intro">Football, sneakers, mountains, Coco and a good drink.</p>
      </div>
      <div className={`lc-grid${song ? " has-song" : ""}`}>
        {tiles.map((t) => (
          <TileView key={t.id} t={t} />
        ))}
        {song && (
          <article className="lc-tile lc-song" data-reveal>
            <div className="lc-copy lc-copy-song">
              <span className="lc-tag">On repeat</span>
              {spotifyNote && <p>{spotifyNote}</p>}
            </div>
            <iframe
              title="Song on Spotify"
              src={song}
              width="100%"
              height="152"
              frameBorder="0"
              allow="encrypted-media"
              loading="lazy"
            />
          </article>
        )}
      </div>
    </section>
  );
};

export default LaptopClosed;
