import screenshots from "./screenshots.json";

export type CategoryId = "ai" | "web" | "blockchain" | "android";

export type Project = {
  title: string;
  /** Live URL of the site (or Play Store page for Android apps). */
  url: string;
  description: string;
  category: CategoryId;
  /** Shown as tags; values from the category's `tech` list power its filter. */
  tech: string[];
  /** Optional custom image in /public, e.g. "/projects/my-app.jpg". */
  image?: string;
};

export const categories: {
  id: CategoryId;
  title: string;
  blurb: string;
  tech: string[];
}[] = [
  {
    id: "ai",
    title: "AI",
    blurb: "LLM products, retrieval-augmented generation, chatbots, machine learning and n8n automation.",
    tech: ["LLM", "RAG", "AI Chatbot", "ML", "n8n"],
  },
  {
    id: "web",
    title: "Web",
    blurb: "Fast, accessible web applications and platforms built with modern frameworks.",
    tech: ["React", "Vue", "Laravel", "Next.js"],
  },
  {
    id: "blockchain",
    title: "Blockchain",
    blurb: "Web3 platforms, dApps and smart-contract powered products.",
    tech: [],
  },
  {
    id: "android",
    title: "Android",
    blurb: "Native Android applications published for real users.",
    tech: [],
  },
];

/*
 * Add your live projects here, at least 15 per category.
 *
 * {
 *   title: "Project name",
 *   url: "https://project-site.com",
 *   description: "One or two sentences on what it does and your role.",
 *   category: "ai",
 *   tech: ["RAG", "LLM"],
 * },
 *
 * Homepage screenshots are taken automatically. Run `npm run screenshots`
 * to save them locally (recommended before deploying).
 */
export const projects: Project[] = [];

const saved = screenshots as Record<string, string>;

export function projectImage(project: Project) {
  return (
    project.image ??
    saved[project.url] ??
    `https://image.thum.io/get/width/1280/crop/800/noanimate/${project.url}`
  );
}

export const projectsIn = (id: CategoryId) => projects.filter((p) => p.category === id);
