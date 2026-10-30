// Saves a homepage screenshot for every project URL in data/projects.ts into
// public/projects/ and records it in data/screenshots.json.
//
//   npm run screenshots            only projects without a saved screenshot
//   npm run screenshots -- --force refresh every screenshot

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "data/screenshots.json");
const outDir = path.join(root, "public/projects");
const force = process.argv.includes("--force");

const source = await readFile(path.join(root, "data/projects.ts"), "utf8");
// Ignore the commented example block.
const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
const urls = [...new Set([...code.matchAll(/\burl:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]))];

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
await mkdir(outDir, { recursive: true });

const slug = (url) =>
  url
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

let saved = 0;
for (const url of urls) {
  if (manifest[url] && !force) continue;
  const shot = `https://image.thum.io/get/width/1280/crop/800/noanimate/${url}`;
  try {
    const res = await fetch(shot);
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) throw new Error(`HTTP ${res.status} ${type}`);
    const ext = type.includes("jpeg") ? "jpg" : "png";
    const file = `${slug(url)}.${ext}`;
    await writeFile(path.join(outDir, file), Buffer.from(await res.arrayBuffer()));
    manifest[url] = `/projects/${file}`;
    saved++;
    console.log(`✓ ${url}`);
  } catch (err) {
    console.warn(`✗ ${url} (${err.message})`);
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${saved} screenshot(s) saved, ${urls.length} project URL(s) found.`);
