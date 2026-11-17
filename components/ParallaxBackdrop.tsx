"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed site background (grid, nebula haze and glow orbs) shown everywhere
 * outside the Home section's starfield. Its layers drift at different speeds
 * as the page scrolls, giving a subtle parallax against the content.
 */
export default function ParallaxBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.setProperty("--scroll", String(window.scrollY));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="backdrop-haze" />
      <div className="backdrop-grid" />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2 hidden sm:block" />
    </div>
  );
}
