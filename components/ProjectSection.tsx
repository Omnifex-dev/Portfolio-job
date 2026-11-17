"use client";

import { useState } from "react";
import type { CategoryId, Project } from "@/data/projects";
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
  const shown = filter ? items.filter(({ project }) => project.tech.includes(filter)) : items;

  return (
    <section id={id} className="scroll-mt-32" aria-labelledby={`${id}-title`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id={`${id}-title`} className="text-4xl font-medium sm:text-6xl">
            {title} <span className="text-accent">Work</span>
          </h2>
          <p className="mt-3 max-w-xl font-extralight text-muted">{blurb}</p>
        </div>
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label={`Filter ${title} projects`}>
            {[null, ...tech].map((t) => (
              <button
                key={t ?? "all"}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  filter === t
                    ? "border-accent bg-accent text-black"
                    : "border-white/30 bg-white/10 text-ink hover:border-accent"
                }`}
              >
                {t ?? "All"}
              </button>
            ))}
          </div>
        )}
      </div>

      {shown.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {shown.map(({ project, image }, i) => (
            <ProjectCard key={project.url || project.title} project={project} image={image} index={i} />
          ))}
        </div>
      ) : (
        <p className="mt-10 border-y border-line py-16 text-center font-light text-muted">
          {items.length === 0 ? "Projects are being added — check back soon." : `No ${filter} projects yet.`}
        </p>
      )}
    </section>
  );
}
