import Link from "next/link";
import { categoryIcons } from "@/components/categoryIcons";
import { ArrowRight, Award } from "@/components/icons";
import { certifications } from "@/data/certifications";
import { categories, projectsIn } from "@/data/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero */}
      <section className="flex min-h-[62vh] flex-col items-center justify-center text-center">
        <p className="animate-rise-in glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-foam">
          <span className="size-2 rounded-full bg-coral shadow-[0_0_10px_2px] shadow-coral/70" />
          {site.role}
        </p>
        <h1
          className="animate-rise-in font-display text-5xl font-bold tracking-tight text-white text-glow sm:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          Hi, I&apos;m <span className="text-shimmer">{site.name}</span>
        </h1>
        <p
          className="animate-rise-in mt-6 max-w-2xl text-lg leading-relaxed text-cyan-50/95 text-glow sm:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          {site.tagline}
        </p>
        <div className="animate-rise-in mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: "360ms" }}>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-[#ff9a7a] px-7 py-3.5 font-semibold text-white shadow-lg shadow-coral/30 transition hover:shadow-xl hover:shadow-coral/40"
          >
            View my projects
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition hover:bg-white/15"
          >
            Contact me
          </Link>
        </div>
      </section>

      {/* Expertise */}
      <section className="mt-10" aria-labelledby="expertise">
        <h2 id="expertise" className="mb-6 text-center font-display text-3xl font-bold text-white text-glow">
          What I build
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ id, title, blurb, tech }) => {
            const Icon = categoryIcons[id];
            const count = projectsIn(id).length;
            return (
              <Link
                key={id}
                href={`/projects#${id}`}
                className="glass group flex flex-col rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-foam/40"
              >
                <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-shallow/80 to-lagoon text-white shadow-lg shadow-cyan-900/40">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cyan-50/75">{blurb}</p>
                {tech.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {tech.map((t) => (
                      <li key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-foam">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-coral">
                  {count > 0 ? `${count} projects` : "Explore"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Certifications teaser */}
      <section className="glass mt-16 flex flex-col items-center gap-6 rounded-3xl p-8 text-center md:flex-row md:text-left">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd166] to-coral text-white shadow-lg">
          <Award className="size-8" />
        </span>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold text-white">HackerRank certified</h2>
          <p className="mt-1 text-cyan-50/80">{certifications.map((c) => c.title).join(" · ")}</p>
        </div>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
        >
          View certificates <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
