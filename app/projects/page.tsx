import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectSection from "@/components/ProjectSection";
import { categories, projectImage, projects, projectsIn } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Live AI, web, blockchain and Android products that showcase the technologies I work with.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Projects" title="The stack I work with, live in production">
        {projects.length > 0 ? `${projects.length} live products` : "Live products"} across AI, web, blockchain and
        Android that showcase each technology I use. Every card links to the real site.
      </PageHeader>

      <nav aria-label="Project categories" className="mt-10 flex flex-wrap justify-center gap-3">
        {categories.map(({ id, title }) => (
          <a
            key={id}
            href={`#${id}`}
            className="glass rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            {title}
            <span className="ml-2 text-foam/70">{projectsIn(id).length}</span>
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {categories.map((c) => (
          <ProjectSection
            key={c.id}
            {...c}
            items={projectsIn(c.id).map((project) => ({ project, image: projectImage(project) }))}
          />
        ))}
      </div>
    </div>
  );
}
