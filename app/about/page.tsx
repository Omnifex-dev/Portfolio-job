import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { ArrowRight } from "@/components/icons";
import { about, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About me",
  description: `About ${site.name}, ${site.role}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="About me" title={`${site.role}`}>
        Building intelligent, beautiful and dependable software.
      </PageHeader>

      <section className="glass animate-rise-in mt-12 grid gap-10 rounded-3xl p-8 sm:p-10 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative grid size-44 place-items-center rounded-full bg-gradient-to-br from-shallow via-lagoon to-deep p-1 shadow-2xl shadow-cyan-950/50">
            <div className="grid size-full place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#5fd4f0,#0a5d8f_70%)] font-display text-6xl font-bold text-white">
              {site.name.charAt(0)}
            </div>
            <span className="absolute -right-1 top-4 size-5 rounded-full border border-white/70 bg-white/20" />
            <span className="absolute right-3 -top-2 size-3 rounded-full border border-white/70 bg-white/20" />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-white">{site.name}</p>
            <p className="text-sm font-medium text-coral">{site.role}</p>
          </div>
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-cyan-50/90">
          {about.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="skills">
        <h2 id="skills" className="mb-6 font-display text-3xl font-bold text-white text-glow">
          Skills &amp; stack
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {about.skills.map(({ group, items }) => (
            <div key={group} className="glass rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold text-white">{group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className="rounded-full border border-foam/20 bg-white/8 px-3.5 py-1.5 text-sm text-foam">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="how-i-work">
        <h2 id="how-i-work" className="mb-6 font-display text-3xl font-bold text-white text-glow">
          How I work
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.principles.map(({ title, text }, i) => (
            <div key={title} className="glass rounded-3xl p-6">
              <span className="font-display text-sm font-bold text-coral">0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cyan-50/75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 flex justify-center">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-[#ff9a7a] px-7 py-3.5 font-semibold text-white shadow-lg shadow-coral/30"
        >
          Let&apos;s work together
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
