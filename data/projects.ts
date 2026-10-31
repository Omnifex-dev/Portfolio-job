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
    tech: ["RAG", "AI Chatbot", "ML", "n8n"],
  },
  {
    id: "web",
    title: "Web",
    blurb: "Fast, accessible web applications, platforms and CMS-driven sites built with modern frameworks.",
    tech: ["React", "Vue", "Laravel", "CMS"],
  },
  {
    id: "blockchain",
    title: "Blockchain",
    blurb: "Web3 platforms, dApps and smart-contract powered products on Ethereum and Polygon.",
    tech: ["Solidity", "Ethereum", "Polygon"],
  },
  {
    id: "android",
    title: "Android",
    blurb: "Cross-platform mobile apps built with React Native and Flutter, published for real users.",
    tech: ["React Native", "Flutter"],
  },
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
    url: "",
    image: "/assets/images/AI/RAG.png",
    description: "Enterprise AI search that retrieves across company apps to ground answers in internal knowledge.",
    category: "ai",
    tech: ["RAG", "LLM"],
  },

  // AI · AI Chatbot
  {
    title: "Microsoft Copilot",
    url: "",
    image: "/assets/images/AI/Chatbot.png",
    description: "Microsoft's AI companion for chat, search and creative tasks.",
    category: "ai",
    tech: ["AI Chatbot", "LLM"],
  },

  // AI · ML
  {
    title: "DeepL",
    url: "",
    image: "/assets/images/AI/ML.png",
    description: "Neural machine translation known for natural, high-quality output.",
    category: "ai",
    tech: ["ML", "NLP"],
  },

  // AI · n8n
  {
    title: "n8n",
    url: "",
    image: "/assets/images/AI/n8n.png",
    description: "Fair-code workflow automation platform with native AI agent nodes.",
    category: "ai",
    tech: ["n8n", "Automation"],
  },

  // Web · React
  {
    title: "Netflix",
    url: "https://www.netflix.com",
    description: "Streaming service whose web experience is built with React.",
    category: "web",
    tech: ["React", "JavaScript"],
  },

  // Web · Vue
  {
    title: "GitLab",
    url: "https://gitlab.com",
    description: "DevSecOps platform whose front end is built with Vue.",
    category: "web",
    tech: ["Vue", "JavaScript"],
  },

  // Web · Laravel
  {
    title: "Laravel",
    url: "https://laravel.com",
    description: "Official site of the PHP framework, built with Laravel.",
    category: "web",
    tech: ["Laravel", "PHP"],
  },

  // Web · CMS
  {
    title: "WordPress.org",
    url: "https://wordpress.org",
    description: "Home of WordPress, the CMS behind over 40% of the web.",
    category: "web",
    tech: ["CMS", "WordPress"],
  },

  // Blockchain · Solidity
  {
    title: "Hardhat",
    url: "https://hardhat.org",
    description: "Development environment for compiling, testing and deploying Solidity contracts.",
    category: "blockchain",
    tech: ["Solidity", "Ethereum"],
  },

  // Blockchain · Ethereum
  {
    title: "Uniswap",
    url: "https://app.uniswap.org",
    description: "Decentralised exchange for swapping tokens on Ethereum.",
    category: "blockchain",
    tech: ["Ethereum", "DeFi", "Solidity"],
  },
  
  // Blockchain · Polygon
  {
    title: "Polygon",
    url: "https://polygon.technology",
    description: "Ethereum scaling network for fast, low-cost payments.",
    category: "blockchain",
    tech: ["Polygon", "Ethereum"],
  },

  // Android · React Native
  {
    title: "Shopify",
    url: "https://play.google.com/store/apps/details?id=com.shopify.mobile",
    description: "Merchant app for running a Shopify store on the go.",
    category: "android",
    tech: ["React Native", "TypeScript"],
  },

  // Android · Flutter
  {
    title: "Google Pay",
    url: "https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user",
    description: "Google's payments app, rebuilt in Flutter.",
    category: "android",
    tech: ["Flutter", "Dart"],
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
