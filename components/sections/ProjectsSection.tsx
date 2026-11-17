import PageHeader from "@/components/PageHeader";
import ProjectSection from "@/components/ProjectSection";
import { categories, projectImage, projects, projectsIn } from "@/data/projects";

const shownCategories = categories.filter((c) => c.id !== "android");

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto w-[calc(100%-30px)] scroll-mt-32 pt-32 md:w-[94%]" aria-label="Projects">
      <PageHeader eyebrow="Projects" title="My work">
        {projects.length > 0 ? `${projects.length} live products` : "Live products"} across AI, web, blockchain and
        cybersecurity that showcase each technology I use.
      </PageHeader>

      <nav aria-label="Project categories" className="mt-10 flex flex-wrap justify-center gap-3">
        {shownCategories.map(({ id, title }) => (
          <a key={id} href={`#${id}`} className="btn-ghost px-6! py-2! text-sm">
            {title}
            <span className="text-accent">{projectsIn(id).length}</span>
          </a>
        ))}
      </nav>

      <div className="mt-20 space-y-24">
        {shownCategories.map((c) => (
          <ProjectSection
            key={c.id}
            {...c}
            items={projectsIn(c.id).map((project) => ({ project, image: projectImage(project) }))}
          />
        ))}
      </div>
    </section>
  );
}
