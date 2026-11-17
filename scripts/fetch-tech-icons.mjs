// Downloads tech logos into public/assets/tech/<id>.svg.
// Source: devicon (colour) when it looks good on black, otherwise simple-icons
// recoloured to its brand colour (or white when the brand colour is too dark).
// Usage: node scripts/fetch-tech-icons.mjs
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

// curl rather than fetch: it honours system proxy/network settings more reliably.
const run = promisify(execFile);
async function get(url) {
  try {
    const { stdout } = await run("curl", ["-sfL", "--max-time", "30", url], { maxBuffer: 64 << 20 });
    return stdout;
  } catch {
    return null;
  }
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const SIMPLE = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0";
const OUT = path.resolve("public/assets/tech");

// id: ["d", deviconName, variant] | ["s", simpleIconsSlug]
const sources = {
  // AI
  python: ["d", "python", "original"],
  pytorch: ["d", "pytorch", "original"],
  tensorflow: ["d", "tensorflow", "original"],
  "scikit-learn": ["d", "scikitlearn", "original"],
  pandas: ["s", "pandas"],
  numpy: ["d", "numpy", "original"],
  jupyter: ["d", "jupyter", "original"],
  langchain: ["s", "langchain"],
  huggingface: ["s", "huggingface"],
  anthropic: ["s", "anthropic"],
  ollama: ["s", "ollama"],
  n8n: ["s", "n8n"],
  // Web
  react: ["d", "react", "original"],
  nextjs: ["s", "nextdotjs"],
  typescript: ["d", "typescript", "original"],
  javascript: ["d", "javascript", "original"],
  vue: ["d", "vuejs", "original"],
  angular: ["d", "angular", "original"],
  nodejs: ["d", "nodejs", "original"],
  express: ["s", "express"],
  nestjs: ["d", "nestjs", "original"],
  laravel: ["d", "laravel", "original"],
  php: ["d", "php", "original"],
  tailwind: ["d", "tailwindcss", "original"],
  graphql: ["d", "graphql", "plain"],
  postgresql: ["d", "postgresql", "original"],
  mongodb: ["d", "mongodb", "original"],
  redis: ["d", "redis", "original"],
  // Blockchain
  solidity: ["s", "solidity"],
  ethereum: ["s", "ethereum"],
  bitcoin: ["s", "bitcoin"],
  solana: ["s", "solana"],
  polygon: ["s", "polygon"],
  chainlink: ["s", "chainlink"],
  web3js: ["s", "web3dotjs"],
  hardhat: ["s", "hardhat"],
  rust: ["s", "rust"],
  // Docker & DevOps
  docker: ["d", "docker", "original"],
  kubernetes: ["d", "kubernetes", "original"],
  aws: ["s", "amazonwebservices"],
  githubactions: ["d", "githubactions", "original"],
  nginx: ["d", "nginx", "original"],
  linux: ["d", "linux", "original"],
  terraform: ["d", "terraform", "original"],
  jenkins: ["d", "jenkins", "original"],
  // Android
  android: ["d", "android", "original"],
  kotlin: ["d", "kotlin", "original"],
  java: ["d", "java", "original"],
  flutter: ["d", "flutter", "original"],
  dart: ["d", "dart", "original"],
  "react-native": ["d", "react", "original"],
  firebase: ["d", "firebase", "original"],
  androidstudio: ["d", "androidstudio", "original"],
  // Cybersecurity
  kalilinux: ["s", "kalilinux"],
  wireshark: ["s", "wireshark"],
  burpsuite: ["s", "burpsuite"],
  owasp: ["s", "owasp"],
  metasploit: ["s", "metasploit"],
  vault: ["s", "vault"],
  letsencrypt: ["s", "letsencrypt"],
  cloudflare: ["s", "cloudflare"],
  snyk: ["s", "snyk"],
  auth0: ["s", "auth0"],
};

function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const data = JSON.parse(await get(`${SIMPLE}/_data/simple-icons.json`));
  const icons = Array.isArray(data) ? data : data.icons;
  const slugOf = (t) =>
    t.toLowerCase().replace(/\+/g, "plus").replace(/\./g, "dot").replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
  const hexBySlug = new Map(icons.map((i) => [i.slug ?? slugOf(i.title), i.hex]));

  const missing = [];
  for (const [id, [kind, name, variant]] of Object.entries(sources)) {
    let svg;
    if (kind === "d") {
      svg = await get(`${DEVICON}/${name}/${name}-${variant}.svg`);
    } else {
      const raw = await get(`${SIMPLE}/icons/${name}.svg`);
      if (raw) {
        const hex = hexBySlug.get(name) ?? "FFFFFF";
        const fill = luminance(hex) < 0.08 ? "#FFFFFF" : `#${hex}`;
        svg = raw.replace("<svg ", `<svg fill="${fill}" `);
      }
    }
    if (svg?.includes("<svg")) await writeFile(path.join(OUT, `${id}.svg`), svg);
    else missing.push(id);
  }
  console.log(`Saved ${Object.keys(sources).length - missing.length} icons.`);
  if (missing.length) console.log(`No image found for: ${missing.join(", ")}`);
}

main();
