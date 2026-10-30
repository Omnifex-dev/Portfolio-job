"use client";

import { useState } from "react";
import type { CategoryId, Project } from "@/data/projects";
import { categoryIcons } from "./categoryIcons";
import ProjectCard from "./ProjectCard";

type Props = {
  id: CategoryId;
  title: string;
  blurb: string;
  tech: string[];
  items: { project: Project; image: string }[];
};

export default function ProjectSection({ id, title, blurb, tech, items }: Props) {
  const [filter, setFilter] = useState<string | null>(null);
  const Icon = categoryIcons[id];
  const shown = filter ? items.filter(({ project }) => project.tech.includes(filter)) : items;

  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-title`}>
      <div className="glass flex flex-col gap-5 rounded-3xl p-6 sm:p-8 md:flex-row md:items-center">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-shallow/80 to-lagoon text-white shadow-lg shadow-cyan-900/40">
          <Icon className="size-7" />
        </span>
        <div className="flex-1">
          <h2 id={`${id}-title`} className="font-display text-2xl font-bold text-white sm:text-3xl">
            {title}
            <span className="ml-3 align-middle text-base font-medium text-foam/70">{items.length} projects</span>
          </h2>
          <p className="mt-1 text-cyan-50/80">{blurb}</p>
        </div>
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label={`Filter ${title} projects`}>
            {[null, ...tech].map((t) => (
              <button
                key={t ?? "all"}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  filter === t ? "bg-coral text-white shadow shadow-coral/40" : "bg-white/10 text-foam hover:bg-white/20"
                }`}
              >
                {t ?? "All"}
              </button>
            ))}
          </div>
        )}
      </div>

      {shown.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map(({ project, image }) => (
            <ProjectCard key={project.url} project={project} image={image} />
          ))}
        </div>
      ) : (
        <p className="glass mt-6 rounded-3xl p-8 text-center text-cyan-50/75">
          {items.length === 0 ? "Projects are being added — check back soon." : `No ${filter} projects yet.`}
        </p>
      )}
    </section>
  );
}
