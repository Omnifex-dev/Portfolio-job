import { categoryIcons } from "@/components/categoryIcons";
import { ArrowRight } from "@/components/icons";
import { categories, projectsIn } from "@/data/projects";
import SpaceBackground from "@/components/SpaceBackground";
import { site } from "@/lib/site";

const [roleLead, ...roleRest] = site.role.split(" ");
const roleTail = roleRest.join(" ");

export default function HomeSection() {
  return (
    <section id="home" className="relative scroll-mt-32" aria-label="Home">
      <SpaceBackground />
      {/* Landing */}
      <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] w-[calc(100%-30px)] flex-col justify-center gap-14 md:w-[94%] lg:flex-row lg:items-center lg:justify-between">
        <div className="animate-rise-in">
          <h2 className="text-[22px] font-light tracking-[2px] text-accent md:text-[25px] 2xl:text-[35px]">Hello! I&apos;m</h2>
          <h1 className="mt-1 text-5xl font-medium uppercase leading-[0.95] tracking-[2px] sm:text-7xl 2xl:text-8xl">
            {site.name}
          </h1>
        </div>

        <div className="animate-rise-in lg:text-left" style={{ animationDelay: "150ms" }}>
          <h3 className="text-[22px] font-light tracking-[2px] text-accent md:text-[25px] 2xl:text-[35px]">A {roleLead}</h3>
          <h2 className="text-4xl font-semibold uppercase leading-[1.05] tracking-[2px] text-[#c481ff] sm:text-5xl 2xl:text-7xl">
            {roleTail}
          </h2>
        </div>
      </div>

      {/* What I do */}
      <div
        className="mx-auto flex w-[calc(100%-30px)] flex-col gap-12 py-24 md:w-[94%] lg:flex-row lg:items-center"
        aria-labelledby="what-i-do"
      >
        <div className="lg:w-2/5">
          <h2 id="what-i-do" className="text-[calc(4vw+25px)] font-semibold uppercase leading-[calc(4vw+20px)]">
            What I do
          </h2>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-2">
          {categories.map(({ id, title, blurb, tech }) => {
            const Icon = categoryIcons[id];
            const count = projectsIn(id).length;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="corner-box group flex flex-col border border-white/10 p-8 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <span className="corner" aria-hidden />
                <div className="flex items-start justify-between">
                  <h3 className="text-4xl tracking-[1px] text-ink">{title}</h3>
                  <Icon className="size-7 text-accent" />
                </div>
                <h4 className="mt-1 text-sm font-light tracking-[1px] text-ink/40">
                  {count > 0 ? `${count} projects` : "Explore"}
                </h4>
                <p className="mt-5 flex-1 text-sm font-extralight leading-relaxed tracking-[0.7px] text-ink">{blurb}</p>
                {tech.length > 0 && (
                  <>
                    <h5 className="mb-2 mt-6 text-xs font-light tracking-[1px] text-ink/50">Skillset &amp; tools</h5>
                    <ul className="flex flex-wrap gap-1.5">
                      {tech.map((t) => (
                        <li key={t} className="tag text-ink">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <span className="mt-6 grid size-7 place-items-center self-end border border-white text-ink transition-transform group-hover:rotate-[-45deg]">
                  <ArrowRight className="size-4" />
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap justify-center gap-6 px-5 py-16">
        <a href="#projects" className="btn-accent">
          See my work <ArrowRight className="size-4" />
        </a>
        <a href="#contact" className="btn-ghost">
          Contact me
        </a>
      </div>
    </section>
  );
}
