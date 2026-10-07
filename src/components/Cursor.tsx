import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

type TubesApp = { dispose?: () => void };
type TubesFactory = (
  canvas: HTMLCanvasElement,
  options: { tubes: { colors: string[]; lights: { intensity: number; colors: string[] } } }
) => TubesApp;

const TUBE_COLORS = ["#4c1d95", "#6d28d9", "#8b5cf6", "#a78bfa", "#c4b5fd"];
const LIGHT_COLORS = ["#5b21b6", "#7c3aed", "#8b5cf6", "#a78bfa", "#ddd6fe", "#c4b5fd"];
const QUIET_SELECTOR = ".card, .tl-card, .pc-card, .pc-table-wrap, .pc-steps li, .pc-scenario, .pc-callout, .lc-tile";

const Cursor = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!enabled || !host || !canvas || !glow || !dot) return;

    let app: TubesApp | null = null;
    let cancelled = false;

    const start = () => {
      import("threejs-components/build/cursors/tubes1.min.js")
        .then((mod) => {
          if (cancelled) return;
          const create = (mod.default || mod) as TubesFactory;
          app = create(canvas, {
            tubes: { colors: TUBE_COLORS, lights: { intensity: 200, colors: LIGHT_COLORS } },
          });
          // The library forces pixelRatio 2 (heavy). Cap it to 1 so the trail
          // renders at a quarter of the pixels; the blur/glow hides the drop.
          const three = (app as unknown as {
            three?: { minPixelRatio: number; maxPixelRatio: number; resize?: () => void };
          }).three;
          if (three) {
            three.minPixelRatio = 1;
            three.maxPixelRatio = 1;
            three.resize?.();
          }
          requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
        })
        .catch(() => {});
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const startTimer = window.setTimeout(() => (idle ? idle(start) : start()), 1200);

    const onMove = (e: MouseEvent) => {
      const t = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      glow.style.left = dot.style.left = t;
      glow.style.top = dot.style.top = y;
      glow.style.opacity = dot.style.opacity = "1";
      const quiet = !!(e.target as HTMLElement | null)?.closest?.(QUIET_SELECTOR);
      host.style.opacity = quiet ? "0.22" : "1";
    };
    const onLeave = () => {
      glow.style.opacity = dot.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      try {
        app?.dispose?.();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <>
      <div className="cursor-tubes" ref={hostRef} aria-hidden="true">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="cursor-glow" ref={glowRef} aria-hidden="true"></div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true"></div>
    </>
  );
};

export default Cursor;
