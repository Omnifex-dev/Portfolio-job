/*
 * Hand-drawn SVG reef fish. Every fish faces right; the swimming wrapper
 * mirrors it for right-to-left swimmers. `.fish-tail` and `.fish-fin`
 * are animated from globals.css.
 */

type FishProps = { className?: string };

const OUTLINE = "#1b1b24";

export function Clownfish({ className }: FishProps) {
  return (
    <svg viewBox="0 0 140 72" className={className} aria-hidden>
      <defs>
        <linearGradient id="clown-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb055" />
          <stop offset="0.5" stopColor="#ff7414" />
          <stop offset="1" stopColor="#e05200" />
        </linearGradient>
        <clipPath id="clown-clip">
          <ellipse cx="72" cy="36" rx="48" ry="22" />
        </clipPath>
      </defs>
      <path
        className="fish-tail"
        d="M30 36 C22 27 12 17 4 15 C9 28 9 44 4 57 C12 55 22 45 30 36Z"
        fill="#ff7414"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <path d="M50 19 C56 4 80 1 94 17Z" fill="#ff8a2a" stroke={OUTLINE} strokeWidth="2" />
      <path d="M58 54 C62 66 76 68 84 56Z" fill="#ff8a2a" stroke={OUTLINE} strokeWidth="2" />
      <ellipse cx="72" cy="36" rx="48" ry="22" fill="url(#clown-body)" />
      <g clipPath="url(#clown-clip)" stroke={OUTLINE} strokeWidth="2.5">
        <path d="M90 8 C99 24 99 48 90 64 L103 64 C112 48 112 24 103 8Z" fill="#fff" />
        <path d="M60 8 C68 24 68 48 60 64 L73 64 C80 48 80 24 73 8Z" fill="#fff" />
        <path d="M22 8 L36 8 C41 24 41 48 36 64 L22 64Z" fill="#fff" />
      </g>
      <ellipse cx="72" cy="36" rx="48" ry="22" fill="none" stroke={OUTLINE} strokeWidth="1.5" />
      <path
        className="fish-fin"
        d="M84 42 C88 53 82 60 74 58 C76 51 79 46 84 42Z"
        fill="#ff8a2a"
        stroke={OUTLINE}
        strokeWidth="1.6"
      />
      <circle cx="108" cy="30" r="5" fill="#fff" />
      <circle cx="109" cy="30" r="3.2" fill="#111" />
      <circle cx="110.2" cy="28.8" r="1.1" fill="#fff" />
      <path d="M117 41 q3 1 0 3.5" stroke={OUTLINE} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function BlueTang({ className }: FishProps) {
  return (
    <svg viewBox="0 0 140 80" className={className} aria-hidden>
      <defs>
        <linearGradient id="tang-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b93ff" />
          <stop offset="0.55" stopColor="#2a62e8" />
          <stop offset="1" stopColor="#1840b8" />
        </linearGradient>
      </defs>
      <path
        className="fish-tail"
        d="M32 40 L6 16 C11 31 11 49 6 64Z"
        fill="#ffd23f"
        stroke="#0b1a3a"
        strokeWidth="2"
      />
      <path d="M40 24 C58 4 98 4 114 21Z" fill="#2353d6" stroke="#0b1a3a" strokeWidth="2" />
      <path d="M44 58 C60 76 92 76 108 60Z" fill="#2353d6" stroke="#0b1a3a" strokeWidth="2" />
      <path
        d="M28 40 C40 14 86 6 112 22 C126 30 131 37 131 41 C131 45 126 52 112 58 C86 74 40 66 28 40Z"
        fill="url(#tang-blue)"
      />
      <path
        d="M40 30 C60 17 94 15 111 27 C96 26 78 30 71 40 C66 50 78 56 94 58 C72 63 51 55 40 50 C53 44 53 36 40 30Z"
        fill="#0b1a3a"
      />
      <path
        className="fish-fin"
        d="M96 42 C102 52 98 58 90 58 C91 51 93 46 96 42Z"
        fill="#ffd23f"
        stroke="#0b1a3a"
        strokeWidth="1.4"
      />
      <circle cx="118" cy="34" r="4.4" fill="#fff" />
      <circle cx="119" cy="34" r="2.9" fill="#0b1a3a" />
      <circle cx="120" cy="33" r="1" fill="#fff" />
    </svg>
  );
}

export function YellowTang({ className }: FishProps) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="tang-yellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff07a" />
          <stop offset="0.5" stopColor="#ffd60a" />
          <stop offset="1" stopColor="#f2b705" />
        </linearGradient>
      </defs>
      <path className="fish-tail" d="M28 50 L6 32 C11 44 11 56 6 68Z" fill="#ffcf00" />
      <path d="M34 28 C44 6 74 2 88 22Z" fill="#ffe14d" />
      <path d="M34 72 C44 94 74 98 88 78Z" fill="#ffe14d" />
      <path
        d="M24 50 C30 20 60 8 84 22 C96 30 104 40 113 46 C115 48 115 52 113 54 C104 60 96 70 84 78 C60 92 30 80 24 50Z"
        fill="url(#tang-yellow)"
      />
      <path d="M44 30 C56 42 56 58 44 70" stroke="#f0b400" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M30 49 l5 -2 l0 4Z" fill="#fff" />
      <path
        className="fish-fin"
        d="M80 52 C86 60 82 66 74 66 C75 60 77 56 80 52Z"
        fill="#fff3a8"
      />
      <circle cx="93" cy="42" r="4.5" fill="#fff" />
      <circle cx="94" cy="42" r="3" fill="#1b1b24" />
      <circle cx="95" cy="41" r="1" fill="#fff" />
    </svg>
  );
}

export function Angelfish({ className }: FishProps) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden>
      <defs>
        <linearGradient id="angel-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b4fc4" />
          <stop offset="1" stopColor="#14266e" />
        </linearGradient>
        <clipPath id="angel-clip">
          <path d="M26 70 C34 46 66 38 90 52 C102 58 110 66 112 70 C110 74 102 82 90 88 C66 102 34 94 26 70Z" />
        </clipPath>
      </defs>
      <path className="fish-tail" d="M30 70 L8 52 C13 64 13 76 8 88Z" fill="#ffd23f" />
      <path d="M40 54 C52 22 78 6 94 2 C86 20 82 40 84 56Z" fill="#1d3aa0" stroke="#7ad7ff" strokeWidth="1.5" />
      <path d="M40 86 C52 118 78 134 94 138 C86 120 82 100 84 84Z" fill="#1d3aa0" stroke="#7ad7ff" strokeWidth="1.5" />
      <path
        d="M26 70 C34 46 66 38 90 52 C102 58 110 66 112 70 C110 74 102 82 90 88 C66 102 34 94 26 70Z"
        fill="url(#angel-body)"
      />
      <g clipPath="url(#angel-clip)" stroke="#ffd23f" strokeWidth="2.6" fill="none" strokeLinecap="round">
        {[48, 56, 64, 72, 80, 88, 96].map((y) => (
          <path key={y} d={`M20 ${y + 6} C50 ${y - 6} 80 ${y - 6} 100 ${y}`} />
        ))}
      </g>
      <path d="M92 52 C88 62 88 78 92 88 L100 84 C97 76 97 64 100 56Z" fill="#0a1238" />
      <path
        className="fish-fin"
        d="M80 74 C86 84 82 90 74 90 C75 84 77 78 80 74Z"
        fill="#ffd23f"
      />
      <circle cx="104" cy="66" r="3.8" fill="#fff" />
      <circle cx="104.8" cy="66" r="2.5" fill="#0a1238" />
    </svg>
  );
}

export function SilverFish({ className }: FishProps) {
  return (
    <svg viewBox="0 0 40 16" className={className} aria-hidden>
      <defs>
        <linearGradient id="silver-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9f6ff" />
          <stop offset="1" stopColor="#6fb7d6" />
        </linearGradient>
      </defs>
      <path className="fish-tail" d="M9 8 L1 2 L2.5 8 L1 14Z" fill="#a9dcef" />
      <ellipse cx="22" cy="8" rx="15" ry="5.5" fill="url(#silver-body)" />
      <path d="M10 8 H34" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
      <circle cx="32" cy="7" r="1.3" fill="#0b2a3c" />
    </svg>
  );
}

export function MantaRay({ className }: FishProps) {
  return (
    <svg viewBox="0 0 200 124" className={className} aria-hidden>
      <path
        d="M100 30 C122 30 152 20 197 52 C160 54 132 63 119 78 L105 113 L100 124 L95 113 L81 78 C68 63 40 54 3 52 C48 20 78 30 100 30Z"
        fill="#03314f"
      />
      <path d="M92 31 C94 22 98 20 100 20 C102 20 106 22 108 31" fill="#03314f" />
    </svg>
  );
}
