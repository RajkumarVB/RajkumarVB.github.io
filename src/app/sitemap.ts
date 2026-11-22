import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getPosts, getProjects, getTags } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects/", "/blog/", "/dsa/", "/about/"].map((p) => ({ url: `${site.url}${p || "/"}` }));
  const projects = getProjects().map((p) => ({ url: `${site.url}/projects/${p.slug}/` }));
  const posts = getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date }));
  const tags = getTags().map((t) => ({ url: `${site.url}/blog/tags/${t.slug}/` }));
  return [...pages, ...projects, ...posts, ...tags];
}
