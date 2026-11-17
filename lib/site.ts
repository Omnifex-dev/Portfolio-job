// Personal details used across the site. Edit here, not in the pages.

export const site = {
  name: "Carlo",
  role: "Senior AI Software Engineer",
  tagline:
    "I design and ship AI-powered products, modern web applications, blockchain platforms and Android apps — from first prototype to production.",
  url: "https://example.com", // TODO: replace with your deployed domain
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About me" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact me" },
] as const;

export const contacts = {
  telegram: { url: "https://t.me/avagru0617" },
  github: { url: "https://github.com/bcExpt1123" },
  email: { url: "tshingen821@gmail.com" },
};

export const about = {
  intro: [
    "I'm a senior AI software engineer who enjoys turning complex ideas into reliable, polished products. My work spans AI systems, full-stack web development, blockchain and cross-platform mobile apps.",
    "On the AI side I build LLM-powered applications, retrieval-augmented generation (RAG) pipelines, conversational chatbots, machine-learning features and n8n automation workflows. On the web I work across React, Next.js, Vue, Angular, Node.js and Laravel.",
    "I care about clean architecture, performance and the small details that make software feel effortless to use.",
  ],
  // Each tech shows its logo from /public/assets/tech/<icon>.svg.
  // Techs without a logo file there are hidden (see AboutSection).
  // Run `node scripts/fetch-tech-icons.mjs` to (re)download logos.
  skills: [
    {
      group: "AI",
      items: [
        { name: "Python", icon: "python" },
        { name: "PyTorch", icon: "pytorch" },
        { name: "TensorFlow", icon: "tensorflow" },
        { name: "scikit-learn", icon: "scikit-learn" },
        { name: "Pandas", icon: "pandas" },
        { name: "NumPy", icon: "numpy" },
        { name: "Jupyter", icon: "jupyter" },
        { name: "LangChain", icon: "langchain" },
        { name: "Hugging Face", icon: "huggingface" },
        { name: "Claude", icon: "anthropic" },
        { name: "Ollama", icon: "ollama" },
        { name: "n8n", icon: "n8n" },
      ],
    },
    {
      group: "Web",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Vue", icon: "vue" },
        { name: "Angular", icon: "angular" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "NestJS", icon: "nestjs" },
        { name: "Laravel", icon: "laravel" },
        { name: "PHP", icon: "php" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "GraphQL", icon: "graphql" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
      ],
    },
    {
      group: "Blockchain",
      items: [
        { name: "Solidity", icon: "solidity" },
        { name: "Ethereum", icon: "ethereum" },
        { name: "Bitcoin", icon: "bitcoin" },
        { name: "Solana", icon: "solana" },
        { name: "Polygon", icon: "polygon" },
        { name: "Chainlink", icon: "chainlink" },
        { name: "Web3.js", icon: "web3js" },
        { name: "Hardhat", icon: "hardhat" },
        { name: "Rust", icon: "rust" },
      ],
    },
    {
      group: "Docker",
      items: [
        { name: "Docker", icon: "docker" },
        { name: "Kubernetes", icon: "kubernetes" },
        { name: "AWS", icon: "aws" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "Nginx", icon: "nginx" },
        { name: "Linux", icon: "linux" },
        { name: "Terraform", icon: "terraform" },
        { name: "Jenkins", icon: "jenkins" },
      ],
    },
    {
      group: "Android",
      items: [
        { name: "Android", icon: "android" },
        { name: "Kotlin", icon: "kotlin" },
        { name: "Java", icon: "java" },
        { name: "Flutter", icon: "flutter" },
        { name: "Dart", icon: "dart" },
        { name: "React Native", icon: "react-native" },
        { name: "Firebase", icon: "firebase" },
        { name: "Android Studio", icon: "androidstudio" },
      ],
    },
    {
      group: "Cybersecurity",
      items: [
        { name: "Kali Linux", icon: "kalilinux" },
        { name: "Wireshark", icon: "wireshark" },
        { name: "Burp Suite", icon: "burpsuite" },
        { name: "OWASP", icon: "owasp" },
        { name: "Metasploit", icon: "metasploit" },
        { name: "Vault", icon: "vault" },
        { name: "Let's Encrypt", icon: "letsencrypt" },
        { name: "Cloudflare", icon: "cloudflare" },
        { name: "Snyk", icon: "snyk" },
        { name: "Auth0", icon: "auth0" },
      ],
    },
  ],
  principles: [
    { title: "Product-minded", text: "I start from the user's problem and measure success by what ships and gets used." },
    { title: "Built to last", text: "Readable code, sensible architecture and tests where they matter most." },
    { title: "Fast & accessible", text: "Performance budgets and accessible interfaces are part of the definition of done." },
    { title: "Clear communication", text: "Honest estimates, regular updates and decisions documented for the team." },
  ],
};
