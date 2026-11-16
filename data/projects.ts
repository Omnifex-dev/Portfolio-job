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
  viewState: boolean;
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
    tech: ["RAG", "AI Chatbot", "ML", "n8n"],
  },
  {
    id: "web",
    title: "Web",
    blurb: "Fast, accessible web applications, platforms and CMS-driven sites built with modern frameworks.",
    tech: ["React", "Vue", "Laravel", "CMS"],
  },
  // {
  //   id: "blockchain",
  //   title: "Blockchain",
  //   blurb: "Web3 platforms, dApps and smart-contract powered products on Ethereum and Polygon.",
  //   tech: ["Solidity", "Ethereum", "Polygon"],
  // },
  // {
  //   id: "android",
  //   title: "Android",
  //   blurb: "Cross-platform mobile apps built with React Native and Flutter, published for real users.",
  //   tech: ["React Native", "Flutter"],
  // },
];

/*
 * Live products that showcase each technology. Put the category's filter tag
 * (e.g. "RAG") first in `tech`; it must match the spelling in `categories`.
 *
 * Homepage screenshots are taken automatically. Run `npm run screenshots`
 * to save them locally (recommended before deploying).
 */
export const projects: Project[] = [
  // AI · RAG
  {
    title: "Glean",
    url: "https://livingbrain.com/",
    image: "/assets/images/AI/livingbrain.png",
    description: "Enterprise AI search that retrieves across company apps to ground answers in internal knowledge.",
    category: "ai",
    viewState: true,
    tech: [],
  },

  // AI · AI Chatbot
  {
    title: "Microsoft Copilot",
    url: "",
    image: "/assets/images/AI/Chatbot.png",
    description: "Microsoft's AI companion for chat, search and creative tasks.",
    category: "ai",
    viewState: false,
    tech: ["AI Chatbot", "LLM"],
  },

  // AI · ML
  {
    title: "DeepLearning",
    url: "",
    image: "/assets/images/AI/ML.png",
    description: "Neural machine translation known for natural, high-quality output.",
    category: "ai",
    viewState: false,
    tech: ["ML", "NLP"],
  },

  // AI · n8n
  {
    title: "n8n",
    url: "",
    image: "/assets/images/AI/n8n.png",
    description: "Fair-code workflow automation platform with native AI agent nodes.",
    category: "ai",
    viewState: false,
    tech: ["n8n", "Automation"],
  },

  // Web · CMS
  {
    title: "GolfCamels",
    image: "/assets/images/Web/golfcamels.jpg",
    url: "https://sixthdegree.co.uk/",
    description: "Sixth Degree is a premium golf travel platform that helps people plan and organize golf trips.",
    category: "web",
    viewState: true,
    tech: ["Laravel"],
  },
  {
    title: "BirdLife",
    url: "https://www.birdlife.org",
    description: "BirdLife International helps protect toucans, other birds, and their natural habitats.",
    category: "web",
    viewState: true,
    tech: ["Next.js", "TailwindCSS"],
  },
{
    title: "Game room",
    image: "/assets/images/Web/gamba.png",
    url: "https://gamba.com/",
    description: "Gamba is an online gaming and entertainment platform focused on casino-style games and gambling experiences.",
    category: "web",
    viewState: true,
    tech: ["Canvas"],
  },
];

const saved = screenshots as Record<string, string>;

export function projectImage(project: Project) {
  return (
    project.image ??
    saved[project.url] ??
    `https://image.thum.io/get/width/1280/crop/800/noanimate/${project.url}`
  );
}

export const projectsIn = (id: CategoryId) => projects.filter((p) => p.category === id);
