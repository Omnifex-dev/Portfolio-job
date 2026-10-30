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
    url: "https://www.glean.com",
    description: "Enterprise AI search that retrieves across company apps to ground answers in internal knowledge.",
    category: "ai",
    tech: ["RAG", "LLM"],
  },
  {
    title: "Consensus",
    url: "https://consensus.app",
    description: "AI search over 200M+ peer-reviewed papers, summarising what the research actually says.",
    category: "ai",
    tech: ["RAG", "LLM"],
  },
  {
    title: "Elicit",
    url: "https://elicit.com",
    description: "Research assistant that finds, extracts and synthesises data from scientific literature.",
    category: "ai",
    tech: ["RAG", "LLM"],
  },
  {
    title: "kapa.ai",
    url: "https://www.kapa.ai",
    description: "RAG platform that turns technical docs into an accurate AI assistant for developer products.",
    category: "ai",
    tech: ["RAG", "LLM"],
  },

  // AI · AI Chatbot
  {
    title: "ChatGPT",
    url: "https://chatgpt.com",
    description: "OpenAI's general-purpose conversational assistant.",
    category: "ai",
    tech: ["AI Chatbot", "LLM"],
  },
  {
    title: "Claude",
    url: "https://claude.com",
    description: "Anthropic's AI assistant for writing, analysis and coding.",
    category: "ai",
    tech: ["AI Chatbot", "LLM"],
  },
  {
    title: "Gemini",
    url: "https://gemini.google",
    description: "Google's multimodal AI assistant integrated across its products.",
    category: "ai",
    tech: ["AI Chatbot", "LLM"],
  },
  {
    title: "Microsoft Copilot",
    url: "https://copilot.microsoft.com",
    description: "Microsoft's AI companion for chat, search and creative tasks.",
    category: "ai",
    tech: ["AI Chatbot", "LLM"],
  },

  // AI · ML
  {
    title: "DeepL",
    url: "https://www.deepl.com",
    description: "Neural machine translation known for natural, high-quality output.",
    category: "ai",
    tech: ["ML", "NLP"],
  },
  {
    title: "Hugging Face",
    url: "https://huggingface.co",
    description: "Hub for open machine-learning models, datasets and demo apps.",
    category: "ai",
    tech: ["ML", "Transformers"],
  },
  {
    title: "Grammarly",
    url: "https://www.grammarly.com",
    description: "Writing assistant using ML models for grammar, clarity and tone.",
    category: "ai",
    tech: ["ML", "NLP"],
  },

  // AI · n8n
  {
    title: "n8n",
    url: "https://n8n.io",
    description: "Fair-code workflow automation platform with native AI agent nodes.",
    category: "ai",
    tech: ["n8n", "Automation"],
  },
  {
    title: "n8n Workflow Templates",
    url: "https://n8n.io/workflows",
    description: "Library of ready-made automation and AI agent workflows.",
    category: "ai",
    tech: ["n8n", "Automation"],
  },
  {
    title: "n8n Integrations",
    url: "https://n8n.io/integrations",
    description: "Catalogue of 400+ app integrations available as workflow nodes.",
    category: "ai",
    tech: ["n8n", "Automation"],
  },
  {
    title: "n8n Docs",
    url: "https://docs.n8n.io",
    description: "Official documentation for building, hosting and scaling n8n workflows.",
    category: "ai",
    tech: ["n8n", "Automation"],
  },
  {
    title: "n8n on GitHub",
    url: "https://github.com/n8n-io/n8n",
    description: "Source code of n8n, one of the most-starred automation projects on GitHub.",
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
  {
    title: "Atlassian",
    url: "https://www.atlassian.com",
    description: "Team collaboration suite behind Jira and Confluence, with React front ends.",
    category: "web",
    tech: ["React", "TypeScript"],
  },
  {
    title: "Discord",
    url: "https://discord.com",
    description: "Voice and chat platform whose web and desktop clients use React.",
    category: "web",
    tech: ["React", "JavaScript"],
  },
  {
    title: "Notion",
    url: "https://www.notion.com",
    description: "Connected workspace for docs, wikis and projects built with React.",
    category: "web",
    tech: ["React", "TypeScript"],
  },
  {
    title: "Coursera",
    url: "https://www.coursera.org",
    description: "Online learning platform whose web app is built with React.",
    category: "web",
    tech: ["React", "TypeScript"],
  },
  {
    title: "Shopify",
    url: "https://www.shopify.com",
    description: "Commerce platform whose admin is built with React and Polaris.",
    category: "web",
    tech: ["React", "TypeScript"],
  },
  {
    title: "Dropbox",
    url: "https://www.dropbox.com",
    description: "Cloud storage and collaboration with a React web app.",
    category: "web",
    tech: ["React", "TypeScript"],
  },

  // Web · Vue
  {
    title: "GitLab",
    url: "https://gitlab.com",
    description: "DevSecOps platform whose front end is built with Vue.",
    category: "web",
    tech: ["Vue", "JavaScript"],
  },
  {
    title: "Vite",
    url: "https://vite.dev",
    description: "Docs site for the Vite build tool, built with VitePress on Vue.",
    category: "web",
    tech: ["Vue", "VitePress"],
  },
  {
    title: "Chess.com",
    url: "https://www.chess.com",
    description: "Online chess platform with a Vue-powered interface.",
    category: "web",
    tech: ["Vue", "JavaScript"],
  },
  {
    title: "Laracasts",
    url: "https://laracasts.com",
    description: "Video tutorials for Laravel and Vue, built with Vue.",
    category: "web",
    tech: ["Vue", "Laravel"],
  },
  {
    title: "Wizz Air",
    url: "https://wizzair.com",
    description: "Airline booking site built as a Vue single-page app.",
    category: "web",
    tech: ["Vue", "JavaScript"],
  },
  {
    title: "Nuxt",
    url: "https://nuxt.com",
    description: "Official site of the Vue meta-framework, built with Nuxt itself.",
    category: "web",
    tech: ["Vue", "Nuxt"],
  },

  // Web · Laravel
  {
    title: "Laravel",
    url: "https://laravel.com",
    description: "Official site of the PHP framework, built with Laravel.",
    category: "web",
    tech: ["Laravel", "PHP"],
  },
  {
    title: "Laravel Forge",
    url: "https://forge.laravel.com",
    description: "Server provisioning and deployment service for PHP apps.",
    category: "web",
    tech: ["Laravel", "PHP"],
  },
  {
    title: "Laravel Cloud",
    url: "https://cloud.laravel.com",
    description: "Fully managed hosting platform for Laravel applications.",
    category: "web",
    tech: ["Laravel", "PHP"],
  },
  {
    title: "Invoice Ninja",
    url: "https://invoiceninja.com",
    description: "Open-source invoicing, quotes and payments platform.",
    category: "web",
    tech: ["Laravel", "PHP"],
  },
  {
    title: "Pixelfed",
    url: "https://pixelfed.org",
    description: "Federated, ad-free photo sharing platform.",
    category: "web",
    tech: ["Laravel", "PHP"],
  },
  {
    title: "Koel",
    url: "https://koel.dev",
    description: "Self-hosted personal music streaming server.",
    category: "web",
    tech: ["Laravel", "PHP", "Vue"],
  },
  {
    title: "Statamic",
    url: "https://statamic.com",
    description: "Flat-file-first CMS built as a Laravel package.",
    category: "web",
    tech: ["Laravel", "PHP"],
  },
  {
    title: "BookStack",
    url: "https://www.bookstackapp.com",
    description: "Open-source platform for organising documentation and wikis.",
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
  {
    title: "TechCrunch",
    url: "https://techcrunch.com",
    description: "Technology news publication running on WordPress VIP.",
    category: "web",
    tech: ["CMS", "WordPress"],
  },
  {
    title: "Payload",
    url: "https://payloadcms.com",
    description: "Open-source, code-first headless CMS built on Next.js.",
    category: "web",
    tech: ["CMS", "Headless"],
  },
  {
    title: "Joomla",
    url: "https://www.joomla.org",
    description: "Home of the open-source Joomla CMS.",
    category: "web",
    tech: ["CMS", "Joomla"],
  },
  {
    title: "Ghost",
    url: "https://ghost.org",
    description: "Open-source publishing platform for newsletters and memberships.",
    category: "web",
    tech: ["CMS", "Ghost"],
  },
  {
    title: "Strapi",
    url: "https://strapi.io",
    description: "Open-source headless CMS for API-first content.",
    category: "web",
    tech: ["CMS", "Headless"],
  },
  {
    title: "Sanity",
    url: "https://www.sanity.io",
    description: "Composable content platform with a real-time headless CMS.",
    category: "web",
    tech: ["CMS", "Headless"],
  },
  {
    title: "Webflow",
    url: "https://webflow.com",
    description: "Visual website builder with a built-in CMS.",
    category: "web",
    tech: ["CMS", "No-code"],
  },
  {
    title: "Craft CMS",
    url: "https://craftcms.com",
    description: "Flexible content management system for custom digital experiences.",
    category: "web",
    tech: ["CMS", "PHP"],
  },

  // Blockchain · Solidity
  {
    title: "Hardhat",
    url: "https://hardhat.org",
    description: "Development environment for compiling, testing and deploying Solidity contracts.",
    category: "blockchain",
    tech: ["Solidity", "Ethereum"],
  },
  {
    title: "OpenZeppelin",
    url: "https://www.openzeppelin.com",
    description: "Audited Solidity contract library and smart-contract security.",
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
  {
    title: "Aave",
    url: "https://aave.com",
    description: "Decentralised lending and borrowing protocol.",
    category: "blockchain",
    tech: ["Ethereum", "DeFi", "Solidity"],
  },
  {
    title: "Lido",
    url: "https://lido.fi",
    description: "Liquid staking protocol for ETH, the largest on Ethereum.",
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
  {
    title: "Polymarket",
    url: "https://polymarket.com",
    description: "Prediction market that settles trades on Polygon.",
    category: "blockchain",
    tech: ["Polygon", "DeFi"],
  },
  {
    title: "QuickSwap",
    url: "https://quickswap.exchange",
    description: "Decentralised exchange native to Polygon.",
    category: "blockchain",
    tech: ["Polygon", "DeFi"],
  },

  // Android · React Native
  {
    title: "Shopify",
    url: "https://play.google.com/store/apps/details?id=com.shopify.mobile",
    description: "Merchant app for running a Shopify store on the go.",
    category: "android",
    tech: ["React Native", "TypeScript"],
  },
  {
    title: "Shop",
    url: "https://play.google.com/store/apps/details?id=com.shopify.arrive",
    description: "Shopping and package-tracking app by Shopify.",
    category: "android",
    tech: ["React Native", "TypeScript"],
  },
  {
    title: "Discord",
    url: "https://play.google.com/store/apps/details?id=com.discord",
    description: "Voice, video and text chat for communities.",
    category: "android",
    tech: ["React Native", "TypeScript"],
  },
  {
    title: "Coinbase",
    url: "https://play.google.com/store/apps/details?id=com.coinbase.android",
    description: "Crypto exchange app rebuilt in React Native.",
    category: "android",
    tech: ["React Native", "TypeScript"],
  },
  {
    title: "Tesla",
    url: "https://play.google.com/store/apps/details?id=com.teslamotors.tesla",
    description: "Companion app for controlling Tesla vehicles and energy products.",
    category: "android",
    tech: ["React Native", "JavaScript"],
  },
  {
    title: "Meta Ads Manager",
    url: "https://play.google.com/store/apps/details?id=com.facebook.adsmanager",
    description: "Create and manage Facebook and Instagram ad campaigns.",
    category: "android",
    tech: ["React Native", "JavaScript"],
  },

  // Android · Flutter
  {
    title: "Google Pay",
    url: "https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user",
    description: "Google's payments app, rebuilt in Flutter.",
    category: "android",
    tech: ["Flutter", "Dart"],
  },
  {
    title: "Google Ads",
    url: "https://play.google.com/store/apps/details?id=com.google.android.apps.adwords",
    description: "Manage Google Ads campaigns from your phone.",
    category: "android",
    tech: ["Flutter", "Dart"],
  },
  {
    title: "My BMW",
    url: "https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row",
    description: "BMW's connected-car app for remote services.",
    category: "android",
    tech: ["Flutter", "Dart"],
  },
  {
    title: "Nubank",
    url: "https://play.google.com/store/apps/details?id=com.nu.production",
    description: "Digital banking app from one of the world's largest neobanks.",
    category: "android",
    tech: ["Flutter", "Dart"],
  },
  {
    title: "Wonderous",
    url: "https://play.google.com/store/apps/details?id=com.gskinner.flutter.wonders",
    description: "Flutter showcase app exploring the wonders of the world.",
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
