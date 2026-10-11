
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const PATTERNS = ["Your Name", "your@email.com", "yourusername", "your-site.vercel.app", "20XX", "Placeholder:", "Company Name", "Your University", "Your Board", "Describe one real", "Add one short line"];
const files = [
  ...readdirSync("src/data").map((f) => join("src/data", f)),
  "index.html", "public/robots.txt", "public/sitemap.xml",
].filter(existsSync);

let found = 0;
for (const file of files) {
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    
    if (/^\s*(\/\/|<!--)/.test(line)) return;
    const code = line.replace(/\s\/\/.*$/, ""); 
    const hit = PATTERNS.find((p) => code.includes(p));
    if (hit) { found++; console.log(`  ${file}:${i + 1}  "${hit}"`); }
  });
}
console.log(found ? `\n⚠ ${found} placeholder(s) still need your real content.` : "\n✓ No placeholders found. Safe to deploy.");

const empties = readFileSync("src/data/profile.js", "utf8").split("\n")
  .filter((l) => /^\s*(phone|github|linkedin|resume|photo):\s*""/.test(l))
  .map((l) => l.trim().split(":")[0]);
if (empties.length) console.log(`ℹ Empty in profile.js (hidden on the site until you fill them): ${empties.join(", ")}`);
