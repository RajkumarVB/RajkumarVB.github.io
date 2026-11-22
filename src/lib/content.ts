import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT = path.join(process.cwd(), "content");
const showDrafts = process.env.NODE_ENV !== "production";

type Format = "md" | "mdx";

function listFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  // Files starting with "_" (like _TEMPLATE.md) are ignored.
  return fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"));
}

function read(dir: string, file: string) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.mdx?$/, ""),
    data,
    content,
    format: (file.endsWith(".mdx") ? "mdx" : "md") as Format,
  };
}

const toDate = (d: unknown) => (d ? new Date(d as string).toISOString().slice(0, 10) : "");

export const tagSlug = (tag: string) =>
  tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* ---------- projects ---------- */

export type Project = {
  slug: string;
  title: string;
  company: string;
  role: string;
  period: string;
  featured: boolean;
  order: number;
  draft: boolean;
  tech: string[];
  links: { github?: string; demo?: string };
  summary: string;
  impact: string[];
  content: string;
  format: Format;
};

export function getProjects(): Project[] {
  const dir = path.join(CONTENT, "projects");
  return listFiles(dir)
    .map((f) => {
      const { slug, data, content, format } = read(dir, f);
      return {
        slug,
        title: data.title ?? slug,
        company: data.company ?? "",
        role: data.role ?? "",
        period: data.period ?? "",
        featured: Boolean(data.featured),
        order: Number(data.order ?? 100),
        draft: Boolean(data.draft),
        tech: data.tech ?? [],
        links: data.links ?? {},
        summary: data.summary ?? "",
        impact: data.impact ?? [],
        content,
        format,
      };
    })
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
}

export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);

/* ---------- posts ---------- */

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
  content: string;
  format: Format;
};

export function getPosts(): Post[] {
  const dir = path.join(CONTENT, "posts");
  return listFiles(dir)
    .map((f) => {
      const { slug, data, content, format } = read(dir, f);
      return {
        slug,
        title: data.title ?? slug,
        date: toDate(data.date),
        summary: data.summary ?? "",
        tags: data.tags ?? [],
        draft: Boolean(data.draft),
        readingTime: readingTime(content).text,
        content,
        format,
      };
    })
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function getTags() {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of getPosts())
    for (const tag of post.tags) {
      const key = tagSlug(tag);
      counts.set(key, { tag, count: (counts.get(key)?.count ?? 0) + 1 });
    }
  return [...counts.entries()]
    .map(([slug, v]) => ({ slug, ...v }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
