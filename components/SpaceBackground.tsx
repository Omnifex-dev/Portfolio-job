"use client";

import { useEffect, useRef } from "react";

const PERIOD = 100; // seconds per full turn around the Y-axis
const STAR_DENSITY = 1 / 450; // stars per px² of viewport
const MAX_STARS = 4000;
// Fraction of the scroll distance the starfield travels: far stars drift
// slowly, near stars faster, while the page content moves at 1×.
const PARALLAX_FAR = 0.12;
const PARALLAX_NEAR = 0.45;

const STAR_COLORS = ["255, 255, 255", "214, 226, 255", "194, 164, 255", "255, 232, 214", "170, 200, 255"];

type Star = { x: number; y: number; z: number; r: number; color: string; phase: number; speed: number };

/**
 * Starfield confined to the Home section. The canvas is viewport-sized and
 * sticky inside a clipped wrapper, so it never shows past the section; stars
 * scroll with a depth-based parallax. It slowly rotates around a vertical (Y)
 * axis through the centre of the viewport. Points live in a 3D cylinder around that axis and
 * are perspective-projected each frame, so near stars sweep one way while far
 * stars drift the other.
 */
export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let radius = 1; // cylinder radius (world units)
    let camera = 1; // camera distance from the axis
    let focal = 1;
    let stars: Star[] = [];
    let frame = 0;
    let lastWidth = 0;
    let lastHalfHeight = 0;
    const startTime = performance.now();

    /** Uniform point inside a disc of the given radius (XZ plane). */
    const discPoint = (r: number) => {
      const a = Math.random() * Math.PI * 2;
      const d = Math.sqrt(Math.random()) * r;
      return { x: Math.cos(a) * d, z: Math.sin(a) * d };
    };
    const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The cylinder's centre slice spans the viewport width; its far edge
      // still spans the full height, so there are no empty bands.
      radius = 1000;
      camera = radius * 1.25;
      focal = ((width / 2) * camera) / radius;
      const halfHeight = ((height / 2) * (camera + radius)) / focal;

      // Mobile URL bars change only the height while scrolling; keep the
      // existing stars unless the field would leave a visible gap.
      if (stars.length && width === lastWidth && halfHeight <= lastHalfHeight) return;
      lastWidth = width;
      lastHalfHeight = halfHeight;

      const count = Math.min(MAX_STARS, Math.round(width * height * STAR_DENSITY) + 300);
      stars = Array.from({ length: count }, () => {
        const p = discPoint(radius);
        const big = Math.random() < 0.06;
        return {
          ...p,
          y: (Math.random() * 2 - 1) * halfHeight,
          r: big ? 1.1 + Math.random() * 0.9 : 0.35 + Math.random() * 0.75,
          color: Math.random() < 0.6 ? STAR_COLORS[0] : pick(STAR_COLORS),
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 2.2,
        };
      });
    };

    /** Rotates (x, z) by `angle` around Y and projects; null if behind the camera. */
    const project = (x: number, y: number, z: number, cos: number, sin: number) => {
      const rx = x * cos + z * sin;
      const rz = -x * sin + z * cos;
      const depth = camera + rz;
      if (depth < 40) return null;
      const s = focal / depth;
      return { sx: width / 2 + rx * s, sy: height / 2 + y * s, s, depth };
    };

    const render = (time: number) => {
      const scroll = window.scrollY;
      const wrapH = height + 40;
      const t = (time - startTime) / 1000;
      const angle = reduceMotion ? 0 : (t / PERIOD) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const near = camera - radius;
      const far = camera + radius;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const st of stars) {
        const p = project(st.x, st.y, st.z, cos, sin);
        if (!p) continue;
        const size = st.r * p.s * 1.25;
        const closeness = 1 - (p.depth - near) / (far - near); // 1 = nearest
        // Parallax: shift up with scroll (nearer = faster) and wrap vertically.
        const shift = scroll * (PARALLAX_FAR + (PARALLAX_NEAR - PARALLAX_FAR) * closeness);
        const sy = ((((p.sy - shift + 20) % wrapH) + wrapH) % wrapH) - 20;
        if (p.sx < -size || p.sx > width + size || sy < -size || sy > height + size) continue;
        const twinkle = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(t * st.speed + st.phase);
        const alpha = Math.min(1, (0.25 + closeness * 0.85) * twinkle);
        ctx.fillStyle = `rgba(${st.color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, sy, Math.max(size, 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (time: number) => {
      render(time);
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reduceMotion) render(performance.now());
    };

    const onResize = () => {
      build();
      if (reduceMotion) render(performance.now());
    };

    build();
    if (reduceMotion) render(performance.now());
    else frame = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    // Starts at the very top of the page (behind the navbar, compensating for
    // <main>'s top padding) and ends at the bottom of the Home section, where
    // it fades into the fixed site background.
    <div aria-hidden className="space-area pointer-events-none absolute inset-x-0 -top-32 bottom-0 -z-10 overflow-clip bg-bg sm:-top-40">
      <canvas ref={canvasRef} className="sticky top-0 block h-dvh w-full" />
    </div>
  );
}
