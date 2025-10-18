import { useEffect, useRef } from "react";

type Blob = {
  el: HTMLDivElement;
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  hue: number;
  alpha: number;
};

// tiny helper
const rand = (a: number, b: number) => Math.random() * (b - a) + a;

export default function BlobBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const mqRef = useRef<MediaQueryList | null>(null);
  const reduceRef = useRef<MediaQueryList | null>(null);
  const resizeTimerRef = useRef<number | null>(null);

  /** ===== your palette / sizes kept as-is ===== */
  const BASE_HUES = [195, 285, 45];
  const SIZES = [260, 280, 240];
  const ALPHA = 0.45;

  const bounds = () => {
    const r = rootRef.current?.getBoundingClientRect();
    return { w: r?.width ?? 0, h: r?.height ?? 0 };
  };

  /** create 3 blob nodes once */
  const ensureNodes = () => {
    if (!rootRef.current) return;
    if (blobsRef.current.length) return;

    blobsRef.current = Array.from({ length: 3 }).map((_, i) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.borderRadius = "9999px";
      div.style.filter = "blur(28px)";
      div.style.pointerEvents = "none";
      div.style.willChange = "transform";
      // keep your bright HSLA scheme
      const hue = BASE_HUES[i] + rand(-10, 10);
      const size = SIZES[i];
      const alpha = ALPHA;

      div.style.backgroundColor = `hsla(${hue}, 90%, 60%, ${alpha})`;
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;

      rootRef.current!.appendChild(div);

      // temp seed; real seed happens in seedBlobs()
      return { el: div, x: 0, y: 0, vx: 0, vy: 0, size, hue, alpha };
    });
  };

  /** seed positions/velocities inside current bounds */
  const seedBlobs = () => {
    const { w, h } = bounds();
    const pad = 60;
    blobsRef.current.forEach((b, i) => {
      b.x = rand(pad, Math.max(pad, w - pad - b.size));
      b.y = rand(pad, Math.max(pad, h - pad - b.size));
      // keep your velocity feel
      b.vx = rand(-60, 60) + (i === 0 ? 40 : i === 1 ? -30 : 20);
      b.vy = rand(-60, 60) + (i === 0 ? -20 : i === 1 ? 25 : -15);
      b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
    });
  };

  const stop = () => {
    runningRef.current = false;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastRef.current = null;
  };

  const tick = (t: number) => {
    if (!runningRef.current) return;
    if (lastRef.current == null) lastRef.current = t;
    const dt = Math.min(0.05, (t - lastRef.current) / 1000); // clamp
    lastRef.current = t;

    const { w, h } = bounds();
    // if bounds collapsed (e.g., hidden on mobile), pause;
    if (w === 0 || h === 0) {
      stop();
      rafRef.current = null;
      return;
    }

    const pad = 60;
    blobsRef.current.forEach((b, i) => {
      // integrate
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // bounce
      if (b.x < pad) { b.x = pad; b.vx = Math.abs(b.vx) * 0.96; }
      if (b.x > w - pad - b.size) { b.x = w - pad - b.size; b.vx = -Math.abs(b.vx) * 0.96; }
      if (b.y < pad) { b.y = pad; b.vy = Math.abs(b.vy) * 0.96; }
      if (b.y > h - pad - b.size) { b.y = h - pad - b.size; b.vy = -Math.abs(b.vy) * 0.96; }

      // subtle hue wobble (your behavior)
      b.hue += (i % 2 ? 18 : 10) * dt;
      b.el.style.backgroundColor = `hsla(${b.hue % 360}, 90%, 60%, ${b.alpha})`;
      b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
    });

    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (runningRef.current) return;
    const { w, h } = bounds();
    if (w === 0 || h === 0) return; // wait until visible/has size
    seedBlobs();
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  };

  /** debounce resize, and reset motion cleanly */
  const handleResize = () => {
    if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = window.setTimeout(() => {
      const { w, h } = bounds();
      // if hidden (0x0), just stop — we’ll start again when visible
      if (w === 0 || h === 0) {
        stop();
        return;
      }
      // soft reset
      stop();
      seedBlobs();
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }, 120); // small debounce
  };

  /** start/stop gated by media query (md↑에서만) & prefers-reduced-motion */
  const refreshRunState = () => {
    const mdOk = !!mqRef.current?.matches;
    const reduced = !!reduceRef.current?.matches;
    if (!mdOk || reduced) {
      stop();
      return;
    }
    // if not running and we have size, start
    if (!runningRef.current) start();
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ensureNodes();

    // media queries
    mqRef.current = window.matchMedia("(min-width: 768px)");
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMQ = () => refreshRunState();
    const onReduce = () => refreshRunState();

    mqRef.current.addEventListener?.("change", onMQ);
    reduceRef.current.addEventListener?.("change", onReduce);
    window.addEventListener("resize", handleResize);

    // also react to element size changes (e.g., header height)
    const ro = new ResizeObserver(handleResize);
    ro.observe(root);

    // page visibility (tab switched)
    const onVis = () => {
      if (document.hidden) stop();
      else refreshRunState();
    };
    document.addEventListener("visibilitychange", onVis);

    // initial start
    refreshRunState();

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      mqRef.current?.removeEventListener?.("change", onMQ);
      reduceRef.current?.removeEventListener?.("change", onReduce);
      stop();
      // clean up nodes
      blobsRef.current.forEach(b => b.el.remove());
      blobsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
