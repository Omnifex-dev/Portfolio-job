import type { ComponentType, CSSProperties } from "react";
import { Angelfish, BlueTang, Clownfish, MantaRay, SilverFish, YellowTang } from "./fish";
import Seafloor from "./Seafloor";

/*
 * Fixed, full-viewport underwater scene rendered behind every page.
 * Pure SVG + CSS animation: no client JavaScript, and everything pauses
 * under prefers-reduced-motion (see globals.css).
 */

type Swimmer = {
  Fish: ComponentType<{ className?: string }>;
  top: string;
  width: number;
  dir: "ltr" | "rtl";
  dur: number;
  delay: number;
  opacity?: number;
  bob?: number;
  tail?: number;
  /** Resting position when motion is reduced. */
  x: string;
};

const SWIMMERS: Swimmer[] = [
  { Fish: Angelfish, top: "20%", width: 92, dir: "rtl", dur: 62, delay: -12, x: "78vw", bob: 7, tail: 0.9 },
  { Fish: BlueTang, top: "36%", width: 132, dir: "rtl", dur: 46, delay: -22, x: "12vw", bob: 5 },
  { Fish: YellowTang, top: "47%", width: 86, dir: "ltr", dur: 54, delay: -36, x: "64vw", bob: 6.5 },
  { Fish: Clownfish, top: "61%", width: 96, dir: "ltr", dur: 40, delay: -8, x: "30vw", tail: 0.5 },
  { Fish: Clownfish, top: "65%", width: 72, dir: "ltr", dur: 40, delay: -10.5, x: "24vw", tail: 0.45 },
  { Fish: YellowTang, top: "71%", width: 62, dir: "rtl", dur: 44, delay: -4, x: "86vw", opacity: 0.85 },
  { Fish: BlueTang, top: "56%", width: 84, dir: "ltr", dur: 58, delay: -46, x: "48vw", opacity: 0.8 },
];

// A loose school of small fish, positioned inside a shared swimming box.
const SCHOOL = [
  [0, 18], [26, 4], [30, 34], [56, 16], [60, 46], [84, 2], [88, 30],
  [112, 18], [116, 48], [140, 8], [146, 34], [170, 22], [196, 40], [204, 10],
];

const RAYS = [
  { left: 4, width: 70, r: 12, dur: 11, delay: -2 },
  { left: 14, width: 130, r: 8, dur: 14, delay: -7 },
  { left: 27, width: 60, r: 3, dur: 10, delay: -4 },
  { left: 36, width: 160, r: -2, dur: 16, delay: -11 },
  { left: 50, width: 80, r: -7, dur: 12, delay: -1 },
  { left: 61, width: 140, r: -11, dur: 15, delay: -9 },
  { left: 75, width: 70, r: -15, dur: 11, delay: -5 },
  { left: 87, width: 120, r: -19, dur: 13, delay: -3 },
];

const CURRENTS = [
  { d: "M-200 230 C150 170 420 300 760 240 S1250 150 1640 220", w: 2, dash: "160 520", dur: 26, o: 0.55 },
  { d: "M-200 300 C200 250 460 360 820 300 S1300 230 1640 290", w: 1.2, dash: "90 380", dur: 19, o: 0.45 },
  { d: "M-200 470 C180 400 520 540 860 460 S1320 390 1640 450", w: 2.4, dash: "220 640", dur: 30, o: 0.5 },
  { d: "M-200 540 C240 500 560 600 900 530 S1360 470 1640 520", w: 1.4, dash: "120 460", dur: 22, o: 0.4 },
  { d: "M-200 140 C220 110 520 190 860 140 S1300 90 1640 130", w: 1, dash: "80 300", dur: 17, o: 0.5 },
];

const BUBBLES = [
  { left: 6, size: 10, dur: 13, delay: -2, drift: 24 },
  { left: 9, size: 6, dur: 11, delay: -7, drift: -12 },
  { left: 21, size: 14, dur: 16, delay: -11, drift: 30 },
  { left: 33, size: 7, dur: 12, delay: -4, drift: 16 },
  { left: 44, size: 11, dur: 15, delay: -9, drift: -20 },
  { left: 52, size: 5, dur: 10, delay: -1, drift: 10 },
  { left: 64, size: 9, dur: 14, delay: -6, drift: 22 },
  { left: 65.5, size: 6, dur: 12, delay: -8.5, drift: 12 },
  { left: 73, size: 13, dur: 17, delay: -13, drift: -26 },
  { left: 82, size: 7, dur: 11, delay: -3, drift: 14 },
  { left: 90, size: 10, dur: 15, delay: -10, drift: 20 },
  { left: 96, size: 6, dur: 12, delay: -5, drift: -10 },
];

const SNOW = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 37.3) % 100,
  size: 1.2 + ((i * 7) % 5) * 0.45,
  dur: 26 + ((i * 13) % 20),
  delay: -((i * 11) % 40),
  drift: ((i * 29) % 60) - 30,
}));

const vars = (v: Record<string, string | number>) => v as CSSProperties;

export default function OceanBackground() {
  return (
    <div className="ocean pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Water column, bright where the sun hits the surface */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 30% -12%, rgba(255,252,230,0.95) 0%, rgba(190,245,255,0.55) 22%, rgba(80,200,235,0) 55%)," +
            "linear-gradient(180deg, #8fe6f6 0%, #47c6e6 16%, #1b9ccc 38%, #0d72a6 62%, #08548a 82%, #063e66 100%)",
        }}
      />

      {/* Rippling surface */}
      <svg
        className="absolute left-0 top-0 h-16 w-[200%] opacity-60"
        viewBox="0 0 2880 64"
        preserveAspectRatio="none"
        style={{ animation: "surface 24s linear infinite" }}
      >
        <path
          d="M0 20 Q90 0 180 20 T360 20 T540 20 T720 20 T900 20 T1080 20 T1260 20 T1440 20 T1620 20 T1800 20 T1980 20 T2160 20 T2340 20 T2520 20 T2700 20 T2880 20 V0 H0Z"
          fill="rgba(255,255,255,0.45)"
        />
        <path
          d="M0 34 Q120 18 240 34 T480 34 T720 34 T960 34 T1200 34 T1440 34 T1680 34 T1920 34 T2160 34 T2400 34 T2640 34 T2880 34"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Sunbeams */}
      <div className="absolute inset-0 mix-blend-screen">
        {RAYS.map((r, i) => (
          <div
            key={i}
            className="ray absolute -top-[6%] h-[115%] blur-[6px]"
            style={vars({
              left: `${r.left}%`,
              width: `${r.width}px`,
              "--r": `${r.r}deg`,
              "--dur": `${r.dur}s`,
              "--delay": `${r.delay}s`,
              background: "linear-gradient(180deg, rgba(255,253,235,0.5) 0%, rgba(215,250,255,0.22) 40%, rgba(215,250,255,0) 82%)",
            })}
          />
        ))}
      </div>

      {/* Caustic light network */}
      <div className="absolute -inset-[15%] opacity-45 mix-blend-overlay [mask-image:linear-gradient(180deg,#000_0%,rgba(0,0,0,0.35)_50%,#000_100%)]">
        <svg className="h-full w-full" style={{ animation: "caustic 28s ease-in-out infinite alternate" }}>
          <filter id="caustic-f" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.009 0.016" numOctaves="2" seed="7" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.9  0 0 0 0 1  0 0 0 0 1  0 0 0 -3 1.35" />
          </filter>
          <rect width="100%" height="100%" filter="url(#caustic-f)" />
        </svg>
      </div>

      {/* Distant manta ray */}
      <div
        className="fish"
        style={vars({ top: "9%", "--swim": "swim-ltr", "--dur": "95s", "--delay": "-30s", "--x": "58vw", opacity: 0.32 })}
      >
        <div style={{ animation: "glide 7s ease-in-out infinite" }}>
          <MantaRay className="w-[230px]" />
        </div>
      </div>

      {/* Bright blue currents */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <filter id="current-glow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="current-stroke" x1="0" x2="1">
            <stop offset="0" stopColor="#9ff3ff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#bdf8ff" />
            <stop offset="0.7" stopColor="#6fe3ff" />
            <stop offset="1" stopColor="#9ff3ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#5fd8ff" strokeLinecap="round" opacity="0.12">
          <path d={CURRENTS[0].d} strokeWidth="70" vectorEffect="non-scaling-stroke" />
          <path d={CURRENTS[2].d} strokeWidth="90" vectorEffect="non-scaling-stroke" />
        </g>
        <g filter="url(#current-glow)" fill="none" strokeLinecap="round">
          {CURRENTS.map((c, i) => (
            <path
              key={i}
              className="current"
              d={c.d}
              stroke="url(#current-stroke)"
              strokeWidth={c.w}
              strokeDasharray={c.dash}
              opacity={c.o}
              vectorEffect="non-scaling-stroke"
              style={vars({ "--dur": `${c.dur}s` })}
            />
          ))}
        </g>
      </svg>

      {/* School of small fish */}
      <div
        className="fish"
        style={vars({ top: "14%", "--swim": "swim-rtl", "--dur": "70s", "--delay": "-25s", "--x": "30vw", opacity: 0.7 })}
      >
        <div className="bob relative h-[70px] w-[230px] -scale-x-100" style={vars({ "--bob": "9s" })}>
          {SCHOOL.map(([x, y], i) => (
            <div
              key={i}
              className="absolute"
              style={vars({ left: x, top: y, "--tail": `${0.35 + (i % 4) * 0.06}s` })}
            >
              <SilverFish className="w-[26px]" />
            </div>
          ))}
        </div>
      </div>

      {/* Reef fish */}
      {SWIMMERS.map(({ Fish, top, width, dir, dur, delay, opacity = 1, bob = 5.5, tail = 0.7, x }, i) => (
        <div
          key={i}
          className="fish"
          style={vars({
            top,
            opacity,
            "--swim": dir === "ltr" ? "swim-ltr" : "swim-rtl",
            "--dur": `${dur}s`,
            "--delay": `${delay}s`,
            "--x": x,
            "--bob": `${bob}s`,
            "--tail": `${tail}s`,
          })}
        >
          <div className="bob drop-shadow-[0_10px_12px_rgba(0,30,60,0.35)]">
            <div className={dir === "rtl" ? "-scale-x-100" : undefined} style={{ width }}>
              <Fish className="block h-auto w-full" />
            </div>
          </div>
        </div>
      ))}

      <Seafloor />

      {/* Bubbles rising from the reef */}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="bubble absolute bottom-[6vh]"
          style={vars({
            left: `${b.left}%`,
            "--dur": `${b.dur}s`,
            "--delay": `${b.delay}s`,
            "--drift": `${b.drift}px`,
          })}
        >
          <span
            className="block rounded-full border border-white/70"
            style={{
              width: b.size,
              height: b.size,
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(200,245,255,0.25) 45%, rgba(255,255,255,0.05) 70%)",
            }}
          />
        </div>
      ))}

      {/* Drifting particles */}
      {SNOW.map((s, i) => (
        <span
          key={i}
          className="snow absolute top-0 rounded-full bg-white/70"
          style={vars({
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            "--dur": `${s.dur}s`,
            "--delay": `${s.delay}s`,
            "--drift": `${s.drift}px`,
          })}
        />
      ))}

      {/* Depth vignette keeps text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,28,48,0.45)_100%)]" />
    </div>
  );
}
