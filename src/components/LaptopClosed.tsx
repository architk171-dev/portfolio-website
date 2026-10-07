import { useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { Tile, spotifyNote, spotifyUrl, tiles } from "../data/laptopClosed";
import "./styles/LaptopClosed.css";

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const VideoMedia = ({ src, poster, title }: { src: string; poster: string; title: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => ref.current?.play().catch(() => setPlaying(false));
  const pause = () => ref.current?.pause();

  return (
    <div
      className="lc-hover"
      onMouseEnter={() => finePointer() && play()}
      onMouseLeave={() => finePointer() && pause()}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="lc-play"
        aria-label={`${playing ? "Pause" : "Play"} video: ${title}`}
        aria-pressed={playing}
        onClick={() => (playing ? pause() : play())}
      >
        <span aria-hidden="true">{playing ? <MdPause /> : <MdPlayArrow />}</span>
      </button>
    </div>
  );
};

const Carousel = ({ srcs, title }: { srcs: string[]; title: string }) => {
  const [i, setI] = useState(0);
  return (
    <>
      {srcs.map((s, n) => (
        <img key={s} src={s} alt={n === i ? title : ""} className={n === i ? "is-on" : undefined} loading="lazy" />
      ))}
      <div className="lc-dots" role="tablist" aria-label={`${title} photos`}>
        {srcs.map((s, n) => (
          <button key={s} type="button" role="tab" aria-selected={n === i} aria-label={`Photo ${n + 1}`} className={n === i ? "is-on" : undefined} onClick={() => setI(n)} />
        ))}
      </div>
    </>
  );
};

const TileView = ({ t }: { t: Tile }) => (
  <article className="lc-card" data-reveal>
    <div className="lc-m" style={{ aspectRatio: t.ratio }}>
      {t.media.kind === "video" && <VideoMedia src={t.media.src} poster={t.media.poster} title={t.title} />}
      {t.media.kind === "image" && <img className="is-on" src={t.media.src} alt={t.title} loading="lazy" />}
      {t.media.kind === "carousel" && <Carousel srcs={t.media.srcs} title={t.title} />}
    </div>
    <div className="lc-body">
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
    return `https://open.spotify.com/embed${path}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
};

const LaptopClosed = () => {
  const song = spotifyUrl ? embedUrl(spotifyUrl) : null;
  const by = (...ids: string[]) => ids.map((id) => tiles.find((t) => t.id === id)!).filter(Boolean);
  return (
    <section className="section lc-section" id="off-the-clock" aria-labelledby="lc-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Off the clock</p>
        <h2 className="section-title" id="lc-title">
          When the laptop's <em>closed.</em>
        </h2>
        <p className="section-intro">Football, sneakers, mountains, Coco and a good drink.</p>
      </div>
      <div className="lc-cols">
        <div className="lc-col">{by("united", "cocktails").map((t) => <TileView key={t.id} t={t} />)}</div>
        <div className="lc-col">
          {by("trek").map((t) => <TileView key={t.id} t={t} />)}
          {song && (
            <article className="lc-card lc-song" data-reveal>
              <div className="lc-body">
                <span className="lc-tag">On repeat</span>
                {spotifyNote && <p>{spotifyNote}</p>}
              </div>
              <iframe
                title="Song on Spotify"
                src={song}
                width="100%"
                height="152"
                style={{ border: 0 }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
              <a className="lc-open" href={spotifyUrl} target="_blank" rel="noopener noreferrer">
                Open in Spotify <span aria-hidden="true">↗</span>
              </a>
            </article>
          )}
        </div>
        <div className="lc-col">{by("sneakers", "coco").map((t) => <TileView key={t.id} t={t} />)}</div>
      </div>
    </section>
  );
};

export default LaptopClosed;
