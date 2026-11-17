"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ExternalLink } from "./icons";

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function ProjectCard({ project, image, index }: { project: Project; image: string; index: number }) {
  const [failed, setFailed] = useState(false);
  const host = displayUrl(project.url) || project.title;
  const tags = project.tech.length > 0 ? project.tech.join(", ") : null;

  return (
    <article className="flex flex-col gap-8 rounded-2xl border border-line bg-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 sm:p-8">
      <div className="flex justify-between gap-4">
        <h3 className="text-4xl font-semibold leading-none lg:text-5xl">{String(index + 1).padStart(2, "0")}</h3>
        <div className="text-right">
          <h4 className="text-lg font-medium sm:text-2xl">{project.title}</h4>
          {tags && <p className="mt-1 text-sm font-extralight text-muted">{tags}</p>}
        </div>
      </div>

      <p className="font-extralight leading-relaxed text-muted">{project.description}</p>

      <div className="group relative mt-auto aspect-[16/10] overflow-hidden rounded-xl bg-black">
        {failed ? (
          <div className="absolute inset-0 grid place-items-center text-center">
            <span className="text-lg font-semibold text-ink/80">{host}</span>
          </div>
        ) : (
          <Image
            src={image}
            alt={`${project.title} homepage`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized={image.startsWith("http")}
            onError={() => setFailed(true)}
            className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
        )}
        {project.viewState && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className="absolute bottom-3 right-3 grid size-12 place-items-center rounded-full bg-bg text-ink opacity-0 shadow-[0_0_10px_rgba(255,255,255,0.5),inset_0_0_10px_#393939] transition duration-300 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ExternalLink className="size-5" />
          </a>
        )}
      </div>
    </article>
  );
}
