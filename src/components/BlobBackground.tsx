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
  const boundsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = boundsRef.current;
    if (!root) return;

    // Ensure we have area to move in (header height)
    const bounds = () => root.getBoundingClientRect();

    // Create 3 obvious blobs
    const blobs: Blob[] = Array.from({ length: 3 }).map((_, i) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.borderRadius = "9999px";
      div.style.filter = "blur(28px)";
      div.style.pointerEvents = "none";
      div.style.willChange = "transform";
      // BRIGHT colors so you SEE them
      const baseHue = [195, 285, 45][i];
      const hue = baseHue + rand(-10, 10);
      const size = [260, 280, 240][i];
      const alpha = 0.45;

      div.style.backgroundColor = `hsla(${hue}, 90%, 60%, ${alpha})`;
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;

      root.appendChild(div);

      const r = bounds();
      const x = rand(40, Math.max(40, r.width - 40));
      const y = rand(40, Math.max(40, r.height - 40));
      const vx = rand(-60, 60) + (i === 0 ? 40 : i === 1 ? -30 : 20);
      const vy = rand(-60, 60) + (i === 0 ? -20 : i === 1 ? 25 : -15);

      return { el: div, x, y, vx, vy, size, hue, alpha };
    });

    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); // clamp
      last = t;

      const r = bounds();
      const pad = 60;

      blobs.forEach((b, i) => {
        // integrate
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // bounce edges
        if (b.x < pad) { b.x = pad; b.vx = Math.abs(b.vx) * 0.96; }
        if (b.x > r.width - pad) { b.x = r.width - pad; b.vx = -Math.abs(b.vx) * 0.96; }
        if (b.y < pad) { b.y = pad; b.vy = Math.abs(b.vy) * 0.96; }
        if (b.y > r.height - pad) { b.y = r.height - pad; b.vy = -Math.abs(b.vy) * 0.96; }

        // tiny color wobble so changes are visible
        b.hue += (i % 2 ? 18 : 10) * dt;
        b.el.style.backgroundColor = `hsla(${b.hue % 360}, 90%, 60%, ${b.alpha})`;

        // apply
        b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const onResize = () => { /* next frame re-measures */ };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      blobs.forEach(b => b.el.remove());
    };
  }, []);

  return (
    <div
      ref={boundsRef}
      // z-0 to ensure it's above the page background; if your header uses z-index, push this one higher
      className="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
