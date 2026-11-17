import PageHeader from "@/components/PageHeader";
import { ArrowRight } from "@/components/icons";
import { about, site } from "@/lib/site";
import { existsSync } from "node:fs";
import path from "node:path";

type Tech = { name: string; icon: string; group: string };

// One combined pool: only techs whose logo exists in /public/assets/tech.
const hasIcon = (icon: string) => existsSync(path.join(process.cwd(), "public", "assets", "tech", `${icon}.svg`));
const techs: Tech[] = about.skills.flatMap(({ group, items }) =>
  items.filter((t) => hasIcon(t.icon)).map((t) => ({ ...t, group })),
);

/**
 * Splits items into rows that shrink by one per row (an inverted pyramid),
 * using as few rows as possible without the top row exceeding `maxCols`.
 * Any shortfall is taken one tile at a time from the bottom rows, so row
 * widths never increase going down.
 */
function pyramidRows<T>(items: T[], maxCols: number): T[][] {
  const n = items.length;
  let rows = 1;
  let top = n;
  while (top > maxCols && rows < maxCols) {
    rows++;
    top = Math.ceil((n + (rows * (rows - 1)) / 2) / rows);
  }
  const extra = rows * top - (rows * (rows - 1)) / 2 - n;
  const sizes = Array.from({ length: rows }, (_, i) => top - i - (i >= rows - extra ? 1 : 0));
  let start = 0;
  return sizes.map((size) => items.slice(start, (start += size)));
}

function TechTile({ name, icon, group }: Tech) {
  return (
    <li
      title={`${name} · ${group}`}
      data-cursor-above
      className="group relative flex size-18 flex-col items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.03] px-1 text-center transition duration-300 hover:z-10 hover:scale-125 hover:border-accent/60 hover:bg-[#15121a] hover:shadow-[0_0_24px_rgba(194,164,255,0.25)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local SVG logos */}
      <img
        src={`/assets/tech/${icon}.svg`}
        alt=""
        width={34}
        height={34}
        loading="lazy"
        className="size-[34px] object-contain transition duration-300 group-hover:scale-110"
      />
      <span className="line-clamp-2 text-[11px] font-light leading-tight text-ink">{name}</span>
    </li>
  );
}

function Pyramid({ rows, className }: { rows: Tech[][]; className: string }) {
  // 16px gaps along x, 12px between rows.
  return (
    <div className={`${className} flex-col gap-3`}>
      {rows.map((row, i) => (
        <ul key={i} className="flex w-full justify-center gap-x-4">
          {row.map((t) => (
            <TechTile key={t.name} {...t} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto w-[calc(100%-30px)] max-w-6xl scroll-mt-32 pt-24" aria-label="About me">
      <PageHeader eyebrow="About me" title={site.role}>
        Building intelligent, beautiful and dependable software.
      </PageHeader>

      <div className="mt-20 grid gap-12 border-y border-line py-16 md:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <div className="relative grid size-44 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#fb8dff,#5400ff_75%)] text-6xl font-semibold text-white shadow-[0_0_60px_rgba(194,164,255,0.35)]">
            {site.name.charAt(0)}
          </div>
          <div>
            <p className="text-2xl font-semibold uppercase tracking-[2px]">{site.name}</p>
            <p className="mt-1 text-sm font-light tracking-[1px] text-accent">{site.role}</p>
          </div>
        </div>
        <div className="space-y-5 text-lg font-light leading-relaxed sm:text-xl">
          {about.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="py-24" aria-labelledby="skills" data-cursor-off>
        <h2 id="skills" className="heading-gradient mb-12 text-center text-4xl font-normal uppercase sm:text-6xl">
          Skills &amp; stack
        </h2>
        {/* Below xl: an even, centred grid (too narrow for a pyramid of this many tiles). */}
        <ul className="grid grid-cols-[repeat(auto-fill,72px)] justify-center gap-x-4 gap-y-3 xl:hidden">
          {techs.map((t) => (
            <TechTile key={t.name} {...t} />
          ))}
        </ul>
        {/* xl+: inverted pyramid (top row widest). 13 × 72px tiles + 16px gaps = 1128px, fits the 1152px container. */}
        <Pyramid rows={pyramidRows(techs, 13)} className="hidden xl:flex" />
      </div>

      {/* Timeline, styled after a career section. */}
      <div className="py-16" aria-labelledby="how-i-work">
        <h2
          id="how-i-work"
          className="heading-gradient-up mb-20 text-center text-5xl font-normal leading-none sm:text-7xl"
        >
          How I
          <span className="font-light"> work</span>
        </h2>
        <div className="relative mx-auto flex flex-col">
          <div className="timeline-line absolute -top-12 bottom-0 left-0 w-[3px] md:left-1/2 md:-translate-x-1/2">
            <span className="timeline-dot absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 translate-y-1/2 rounded-full" />
          </div>
          {about.principles.map(({ title, text }, i) => (
            <div
              key={title}
              className="mb-16 flex flex-col gap-3 pl-[8%] md:flex-row md:justify-between md:pl-0"
            >
              <div className="flex justify-between gap-8 md:w-[42%]">
                <div>
                  <h4 className="text-2xl font-medium tracking-[0.8px] lg:text-[33px] lg:leading-[1]">{title}</h4>
                  <h5 className="mt-2.5 text-lg tracking-[0.7px] text-accent">Principle</h5>
                </div>
                <h3 className="text-4xl font-medium lg:text-5xl">0{i + 1}</h3>
              </div>
              <p className="text-sm font-light leading-5 md:w-[42%]">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <a href="#contact" className="btn-accent">
          Let&apos;s work together <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
