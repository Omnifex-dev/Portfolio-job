import PageHeader from "@/components/PageHeader";
import { ArrowRight } from "@/components/icons";
import { about, site } from "@/lib/site";

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

      <div className="py-24" aria-labelledby="skills">
        <h2 id="skills" className="heading-gradient mb-12 text-center text-4xl font-normal uppercase sm:text-6xl">
          Skills &amp; stack
        </h2>
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {about.skills.map(({ group, items }) => (
            <div key={group} className="bg-bg p-8">
              <h3 className="text-sm font-normal uppercase tracking-[4px] text-accent">{group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
