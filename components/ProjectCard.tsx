"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ExternalLink } from "./icons";

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function ProjectCard({ project, image }: { project: Project; image: string }) {
  const [failed, setFailed] = useState(false);
  const host = displayUrl(project.url);

  return (
    <article className="glass group flex flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-foam/40 hover:shadow-2xl hover:shadow-cyan-950/50">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden bg-deep"
        aria-label={`Open ${project.title} homepage`}
      >
        {/* Browser chrome */}
        <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 bg-abyss/85 px-3 backdrop-blur">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate rounded bg-white/10 px-2 text-[11px] text-cyan-50/70">{host}</span>
        </div>
        {failed ? (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-lagoon to-deep pt-7 text-center">
            <span className="font-display text-lg font-semibold text-white/90">{host}</span>
          </div>
        ) : (
          <Image
            src={image}
            alt={`${project.title} homepage`}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            unoptimized={image.startsWith("http")}
            onError={() => setFailed(true)}
            className="object-cover object-top pt-7 transition duration-700 group-hover:scale-[1.04]"
          />
        )}
      </a>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-cyan-50/75">{project.description}</p>
        {project.tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-foam">
                {t}
              </li>
            ))}
          </ul>
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-coral/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral"
        >
          Visit site <ExternalLink className="size-4" />
        </a>
        <p className="mt-2 truncate text-xs text-cyan-50/55">{project.url}</p>
      </div>
    </article>
  );
}
