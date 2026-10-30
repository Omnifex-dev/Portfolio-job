// Personal details used across the site. Edit here, not in the pages.

export const site = {
  name: "Adrian",
  role: "Senior Software Engineer",
  tagline:
    "I design and ship AI-powered products, modern web applications, blockchain platforms and Android apps — from first prototype to production.",
  url: "https://example.com", // TODO: replace with your deployed domain
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About me" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact me" },
] as const;

export const contacts = {
  telegram: { handle: "@avagru0617", url: "https://t.me/avagru0617" },
  github: { handle: "bobis-oss", url: "https://github.com/bobis-oss/bobis-oss" },
  email: { address: "pad2068@outlook.com", url: "mailto:pad2068@outlook.com" },
};

export const about = {
  intro: [
    "I'm a senior software engineer who enjoys turning complex ideas into reliable, polished products. My work spans AI systems, full-stack web development, blockchain and native Android.",
    "On the AI side I build LLM-powered applications, retrieval-augmented generation (RAG) pipelines, conversational chatbots, machine-learning features and n8n automation workflows. On the web I work across React, Next.js, Vue, Angular, Node.js and Laravel.",
    "I care about clean architecture, performance and the small details that make software feel effortless to use.",
  ],
  skills: [
    { group: "AI & Automation", items: ["LLM applications", "RAG", "AI chatbots", "Machine Learning", "n8n", "Python"] },
    { group: "Web", items: ["React", "Next.js", "Vue", "Angular", "Node.js", "Laravel"] },
    { group: "Blockchain", items: ["Web3 applications", "Smart contract integration", "Wallet connectivity"] },
    { group: "Mobile", items: ["Android"] },
  ],
  principles: [
    { title: "Product-minded", text: "I start from the user's problem and measure success by what ships and gets used." },
    { title: "Built to last", text: "Readable code, sensible architecture and tests where they matter most." },
    { title: "Fast & accessible", text: "Performance budgets and accessible interfaces are part of the definition of done." },
    { title: "Clear communication", text: "Honest estimates, regular updates and decisions documented for the team." },
  ],
};
