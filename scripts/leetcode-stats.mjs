// Generates src/data/leetcode.json from the LeetCode-Solutions repo README.
// Run locally after adding solutions:  npm run stats
// Repo path defaults to ../LeetCode Solutions; override with LEETCODE_REPO=/path.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const repo = process.env.LEETCODE_REPO ?? path.join(os.homedir(), "LeetCode Solutions");
const readme = fs.readFileSync(path.join(repo, "README.md"), "utf8");

const categories = [];
let current = null;
for (const line of readme.split("\n")) {
  const heading = line.match(/^## (.+?) \((\d+)\)\s*$/);
  if (heading) {
    current = { name: heading[1], problems: [] };
    categories.push(current);
    continue;
  }
  // | 3 | [Title](leetcode-solutions/slug/) | Medium | Key idea |
  const row = line.match(/^\|\s*(\d+)\s*\|\s*\[(.+?)\]\(leetcode-solutions\/([^/)]+)\/?\)\s*\|\s*(Easy|Medium|Hard)\s*\|\s*(.*?)\s*\|\s*$/);
  if (row && current) {
    const [, id, title, slug, difficulty, idea] = row;
    current.problems.push({ id: Number(id), title, slug, difficulty, idea });
  }
}

const unique = new Map();
for (const c of categories) for (const p of c.problems) unique.set(p.slug, p);
const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
for (const p of unique.values()) byDifficulty[p.difficulty]++;

const out = {
  generatedAt: new Date().toISOString().slice(0, 10),
  total: unique.size,
  byDifficulty,
  categories: categories
    .filter((c) => c.problems.length)
    .map((c) => ({ name: c.name, count: c.problems.length, problems: c.problems })),
};

const dest = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "src", "data", "leetcode.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${dest}: ${out.total} problems in ${out.categories.length} categories`, byDifficulty);
