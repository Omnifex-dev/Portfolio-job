import type { CSSProperties } from "react";

/*
 * The reef scene along the bottom of the viewport: hazy far reef, rocks,
 * sand, corals, kelp, an anemone and shells. Drawn on a 1440x360 canvas and
 * cropped from the sides on narrow screens.
 */

const swayStyle = (dur: number, delay = 0) =>
  ({ "--sway": `${dur}s`, "--sway-delay": `${delay}s` }) as CSSProperties;

// Deterministic pseudo-random numbers, so server and client render the same SVG.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function Kelp({ x, h, color, dur, delay, width = 7 }: { x: number; h: number; color: string; dur: number; delay: number; width?: number }) {
  const base = 304;
  const top = base - h;
  const d = `M${x} ${base} C${x - 14} ${base - h * 0.3} ${x + 16} ${base - h * 0.55} ${x} ${base - h * 0.72} S${x - 6} ${top + 12} ${x + 4} ${top}`;
  return (
    <g className="sway" style={swayStyle(dur, delay)}>
      <path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" />
      {[0.25, 0.45, 0.62, 0.8].map((t, i) => {
        const y = base - h * t;
        const dir = i % 2 === 0 ? -1 : 1;
        return (
          <path
            key={t}
            d={`M${x} ${y} q${dir * 16} -6 ${dir * 22} -20 q${-dir * 12} 4 ${-dir * 22} 20Z`}
            fill={color}
            opacity="0.9"
          />
        );
      })}
    </g>
  );
}

function SeaFan({ x, y, size, color, seed }: { x: number; y: number; size: number; color: string; seed: number }) {
  const branches = Array.from({ length: 13 }, (_, i) => {
    const angle = (-150 + (i * 120) / 12) * (Math.PI / 180);
    const len = size * (0.75 + rand(seed + i) * 0.3);
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    const mx = x + Math.cos(angle) * len * 0.5 + (rand(seed + i * 3) - 0.5) * 10;
    const my = y + Math.sin(angle) * len * 0.5;
    return { d: `M${x} ${y} Q${mx} ${my} ${ex} ${ey}`, ex, ey };
  });
  return (
    <g className="sway" style={swayStyle(9, -seed % 5)}>
      <path
        d={`M${branches[0].ex} ${branches[0].ey} ${branches.map((b) => `L${b.ex} ${b.ey}`).join(" ")} L${x} ${y}Z`}
        fill={color}
        opacity="0.28"
      />
      <g stroke={color} strokeLinecap="round" fill="none">
        {branches.map((b, i) => (
          <path key={i} d={b.d} strokeWidth={i % 3 === 0 ? 3 : 1.8} />
        ))}
        {[0.4, 0.62, 0.82].map((t) => (
          <path
            key={t}
            d={branches
              .map((b, i) => `${i === 0 ? "M" : "L"}${x + (b.ex - x) * t} ${y + (b.ey - y) * t}`)
              .join(" ")}
            strokeWidth="1"
            opacity="0.7"
          />
        ))}
      </g>
      <path d={`M${x} ${y} L${x} ${y + 18}`} stroke={color} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Staghorn({ x, y, color, tip, scale = 1 }: { x: number; y: number; color: string; tip: string; scale?: number }) {
  const segments: [number, number, number, number, number][] = [
    // x1, y1, x2, y2, width (relative to base point)
    [0, 0, -2, -46, 12],
    [-2, -46, -18, -78, 9],
    [-2, -46, 16, -82, 9],
    [16, -82, 12, -106, 7],
    [16, -82, 32, -96, 7],
    [-1, -24, -30, -48, 9],
    [-30, -48, -40, -76, 7],
    [1, -32, 34, -56, 9],
    [34, -56, 48, -84, 7],
    [-18, -78, -24, -100, 7],
  ];
  const tips = [
    [12, -106],
    [32, -96],
    [-40, -76],
    [48, -84],
    [-24, -100],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="sway" style={swayStyle(11, -3)}>
        {segments.map(([x1, y1, x2, y2, w], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
        ))}
        {tips.map(([tx, ty], i) => (
          <circle key={i} cx={tx} cy={ty} r="4" fill={tip} />
        ))}
      </g>
    </g>
  );
}

function Anemone({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {Array.from({ length: 15 }, (_, i) => {
        const spread = (i - 7) * 7;
        const h = 44 + rand(i + 40) * 22;
        return (
          <path
            key={i}
            className="sway"
            style={swayStyle(4 + rand(i) * 3, -rand(i + 9) * 4)}
            d={`M${x + spread * 0.5} ${y} C${x + spread * 0.7} ${y - h * 0.4} ${x + spread * 1.3} ${y - h * 0.7} ${x + spread * 1.2} ${y - h}`}
            stroke={i % 2 ? "#ff9fbd" : "#ffc4d6"}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
      <ellipse cx={x} cy={y + 2} rx="30" ry="10" fill="#c2577a" />
    </g>
  );
}

function Starfish({ x, y, r, rotate }: { x: number; y: number; r: number; rotate: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = ((i * 36 - 90) * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.42;
    return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr}`;
  }).join(" ");
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`}>
      <polygon points={pts} fill="#ff7b54" stroke="#d9512c" strokeWidth="1.5" strokeLinejoin="round" />
      {Array.from({ length: 5 }, (_, i) => {
        const a = ((i * 72 - 90) * Math.PI) / 180;
        return <circle key={i} cx={x + Math.cos(a) * r * 0.5} cy={y + Math.sin(a) * r * 0.5} r="1.6" fill="#ffd0b8" />;
      })}
    </g>
  );
}

function Scallop({ x, y, w, color }: { x: number; y: number; w: number; color: string }) {
  const h = w * 0.8;
  return (
    <g>
      <path d={`M${x - w / 2} ${y} C${x - w / 2} ${y - h} ${x + w / 2} ${y - h} ${x + w / 2} ${y}Z`} fill={color} />
      {Array.from({ length: 7 }, (_, i) => {
        const t = (i + 1) / 8;
        const ex = x - w / 2 + w * t;
        const ey = y - h * 0.75 * Math.sin(Math.PI * t);
        return <line key={i} x1={x} y1={y + 2} x2={ex} y2={ey} stroke="#d88a6c" strokeWidth="1.2" />;
      })}
      <rect x={x - 5} y={y - 1} width="10" height="5" rx="1.5" fill="#e9a184" />
    </g>
  );
}

function Urchin({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      {Array.from({ length: 22 }, (_, i) => {
        const a = (-180 + (i * 180) / 21) * (Math.PI / 180);
        const len = r * (1.9 + rand(i + 70) * 0.5);
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + Math.cos(a) * len}
            y2={y + Math.sin(a) * len}
            stroke="#2d1747"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={x} cy={y} r={r} fill="#4a2672" />
      <circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.25} fill="#7d4fb0" opacity="0.6" />
    </g>
  );
}

export default function Seafloor() {
  return (
    <svg
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-[clamp(230px,36vh,400px)] w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9d6a4" />
          <stop offset="0.5" stopColor="#c8ad74" />
          <stop offset="1" stopColor="#8e7a52" />
        </linearGradient>
        <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d7f91" />
          <stop offset="1" stopColor="#2a4352" />
        </linearGradient>
        <linearGradient id="floor-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a5d8f" stopOpacity="0" />
          <stop offset="1" stopColor="#03243b" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="brain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6c07a" />
          <stop offset="1" stopColor="#c97e3c" />
        </linearGradient>
        <filter id="far-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Far reef, softened by distance */}
      <g filter="url(#far-blur)" opacity="0.6">
        <path
          d="M0 236 C80 206 140 220 210 196 C260 178 300 202 350 192 C430 174 470 206 540 198 C620 188 660 166 740 176 C820 186 860 210 940 200 C1020 190 1060 166 1140 174 C1220 182 1280 204 1350 194 C1400 188 1420 196 1440 192 L1440 360 L0 360Z"
          fill="#0d6a96"
        />
        <g stroke="#127aa6" strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M470 200 L468 160 L452 140 M468 168 L488 146" />
          <path d="M820 186 L822 150 L806 128 M822 158 L842 136 L846 118" />
          <path d="M1290 196 L1292 166 L1276 150 M1292 172 L1310 152" />
        </g>
      </g>

      {/* Back kelp */}
      <g opacity="0.75">
        <Kelp x={60} h={190} color="#1d8a64" dur={8} delay={-1} />
        <Kelp x={395} h={150} color="#1d8a64" dur={9} delay={-4} />
        <Kelp x={1010} h={210} color="#1d8a64" dur={10} delay={-2} />
        <Kelp x={1400} h={170} color="#1d8a64" dur={8.5} delay={-6} />
      </g>

      {/* Rocks */}
      <path d="M100 304 C90 262 132 228 186 232 C240 236 282 264 278 304Z" fill="url(#rock)" />
      <path d="M128 250 C150 236 186 234 214 244" stroke="#86a7b7" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M1050 308 C1040 248 1104 210 1178 216 C1252 222 1304 262 1296 308Z" fill="url(#rock)" />
      <path d="M1090 236 C1120 218 1170 214 1214 226" stroke="#86a7b7" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M596 312 C592 286 622 268 654 272 C690 276 706 296 702 314Z" fill="url(#rock)" />

      {/* Sand */}
      <path
        d="M0 292 C120 278 240 302 380 294 C520 286 640 272 780 284 C920 296 1040 302 1180 290 C1300 280 1380 288 1440 284 L1440 360 L0 360Z"
        fill="url(#sand)"
      />
      <g stroke="#f6e7c1" strokeWidth="1.4" fill="none" opacity="0.55">
        <path d="M60 320 q40 -6 80 0 t80 0" />
        <path d="M440 330 q40 -6 80 0 t80 0" />
        <path d="M820 318 q40 -6 80 0 t80 0" />
        <path d="M1180 334 q40 -6 80 0 t80 0" />
        <path d="M700 344 q30 -5 60 0 t60 0" />
      </g>

      {/* Corals */}
      <SeaFan x={36} y={292} size={92} color="#e0457b" seed={3} />
      <Staghorn x={300} y={298} color="#ff7a8a" tip="#ffc9cf" />
      <path d="M370 304 C372 262 470 258 476 304Z" fill="url(#brain)" />
      <g stroke="#a8622a" strokeWidth="2" fill="none" opacity="0.75" strokeLinecap="round">
        <path d="M384 296 q8 -10 16 0 t16 0 t16 0 t16 0 t16 0" />
        <path d="M392 284 q8 -10 16 0 t16 0 t16 0 t16 0" />
        <path d="M404 272 q8 -8 16 0 t16 0 t16 0" />
      </g>
      <SeaFan x={540} y={296} size={110} color="#9b5de5" seed={11} />
      <g>
        {[
          [748, 70],
          [770, 48],
          [792, 92],
          [812, 58],
        ].map(([cx, h]) => (
          <g key={cx}>
            <rect x={cx - 9} y={300 - h} width="18" height={h} rx="8" fill="#ff9f43" />
            <ellipse cx={cx} cy={302 - h} rx="8" ry="3.5" fill="#a8521a" />
          </g>
        ))}
      </g>
      <Anemone x={930} y={302} />
      <g>
        <ellipse cx="1180" cy="214" rx="74" ry="11" fill="#5fbf74" />
        <ellipse cx="1180" cy="208" rx="62" ry="8" fill="#7bd389" />
        <ellipse cx="1176" cy="194" rx="44" ry="7" fill="#7bd389" />
        <ellipse cx="1176" cy="190" rx="34" ry="5" fill="#a6e8b0" />
        <rect x="1172" y="194" width="8" height="18" fill="#5fbf74" />
      </g>
      <Staghorn x={1350} y={300} color="#ffc94a" tip="#fff0b5" scale={0.85} />
      <SeaFan x={1415} y={296} size={84} color="#ff6b6b" seed={23} />
      <g fill="#ff8fab">
        {[
          [214, 298, 6],
          [226, 292, 5],
          [238, 299, 7],
          [860, 300, 6],
          [874, 294, 5],
          [1010, 302, 6],
          [1024, 296, 7],
          [664, 274, 5],
          [676, 270, 6],
        ].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      {/* Front kelp */}
      <Kelp x={170} h={140} color="#2bb673" dur={7} delay={-3} />
      <Kelp x={640} h={120} color="#2bb673" dur={6.5} delay={-1} width={6} />
      <Kelp x={1110} h={150} color="#2bb673" dur={7.5} delay={-5} />
      <Kelp x={1260} h={110} color="#3ccf86" dur={6} delay={-2} width={6} />

      {/* Shells and critters on the sand */}
      <Scallop x={340} y={326} w={34} color="#ffd6c0" />
      <Scallop x={1300} y={338} w={26} color="#ffe2d1" />
      <g>
        <path d="M676 334 C672 314 694 302 712 314 C722 322 716 336 702 338Z" fill="#f6c28b" />
        <path d="M684 330 C684 318 700 314 706 322 C710 328 702 334 694 332" stroke="#c98a4b" strokeWidth="1.6" fill="none" />
        <path d="M712 314 L726 306" stroke="#f6c28b" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g>
        <path d="M520 336 C520 322 552 322 552 336Z" fill="#e7d9f2" />
        <path d="M522 336 C524 346 548 346 550 336Z" fill="#c9b6dd" />
      </g>
      <Starfish x={1000} y={328} r={16} rotate={14} />
      <Starfish x={90} y={336} r={11} rotate={-20} />
      <Urchin x={1236} y={318} r={10} />
      <g fill="#9fb4bf">
        <ellipse cx="460" cy="340" rx="7" ry="4" />
        <ellipse cx="476" cy="344" rx="5" ry="3" />
        <ellipse cx="880" cy="342" rx="6" ry="3.5" />
        <ellipse cx="1120" cy="346" rx="8" ry="4" />
      </g>

      <rect x="0" y="180" width="1440" height="180" fill="url(#floor-haze)" />
    </svg>
  );
}
