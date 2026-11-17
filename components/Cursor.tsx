"use client";

import { useEffect, useRef } from "react";

const CELL = 20; // grid pitch in px (~3/4 of the original 26px grid)
const GAP = 2; // space between squares
const RADIUS = 90; // cells within this distance of the cursor light up
const DECAY = 0.85; // per-frame fade of lit cells (lower = shorter trail)
const BASE_ALPHA = 0.035; // faint outline of every square
const COLOR = "194, 164, 255"; // --accent

/**
 * Page-wide grid of small squares. Squares near the pointer glow and then
 * fade out, leaving a trail behind the cursor. Desktop (fine) pointers only.
 */
export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !window.matchMedia("(pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, inside: false, boost: 1 };
    // Hovered element marked [data-cursor-above]; the effect is cut out around it
    // so it appears to sit above the grid.
    let above: Element | null = null;
    // True while the pointer is over an element marked [data-cursor-off]: no new glow there.
    let off = false;
    let cols = 0;
    let rows = 0;
    let glow = new Float32Array(0);
    let basePath = new Path2D();
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;

    const size = CELL - GAP;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      glow = new Float32Array(cols * rows);
      basePath = new Path2D();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) basePath.rect(c * CELL + 0.5, r * CELL + 0.5, size, size);
      }
      render();
    };

    /** Raise the glow of every cell around the pointer. */
    const light = () => {
      const radius = RADIUS * mouse.boost;
      const c0 = Math.max(0, Math.floor((mouse.x - radius) / CELL));
      const c1 = Math.min(cols - 1, Math.floor((mouse.x + radius) / CELL));
      const r0 = Math.max(0, Math.floor((mouse.y - radius) / CELL));
      const r1 = Math.min(rows - 1, Math.floor((mouse.y + radius) / CELL));
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const d = Math.hypot(c * CELL + size / 2 - mouse.x, r * CELL + size / 2 - mouse.y);
          if (d >= radius) continue;
          const i = r * cols + c;
          const v = (1 - d / radius) ** 1.6;
          if (v > glow[i]) glow[i] = v;
        }
      }
    };

    /** Draws one frame; returns whether anything is still glowing. */
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${COLOR}, ${BASE_ALPHA})`;
      ctx.stroke(basePath);

      let active = false;
      for (let i = 0; i < glow.length; i++) {
        const v = glow[i];
        if (v < 0.01) {
          glow[i] = 0;
          continue;
        }
        active = true;
        const x = (i % cols) * CELL;
        const y = Math.floor(i / cols) * CELL;
        ctx.fillStyle = `rgba(${COLOR}, ${v * 0.18})`;
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = `rgba(${COLOR}, ${v * 0.9})`;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
        glow[i] = reduceMotion ? 0 : v * DECAY;
      }

      if (above) {
        const r = above.getBoundingClientRect();
        const radius = parseFloat(getComputedStyle(above).borderTopLeftRadius) || 0;
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.roundRect(r.left, r.top, r.width, r.height, radius);
        ctx.fill();
        ctx.restore();
        active = true; // keep redrawing while it animates
      }
      return active;
    };

    const tick = () => {
      if (mouse.inside && !off) light();
      if (render() || mouse.inside) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false; // idle: nothing left to fade
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.inside = true;
      start();
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      mouse.boost = target.closest("a, button") ? 1.4 : 1;
      above = target.closest("[data-cursor-above]");
      off = !!target.closest("[data-cursor-off]");
    };
    const leave = () => {
      mouse.inside = false;
      above = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[100]" aria-hidden />;
}
