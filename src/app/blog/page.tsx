import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle, PostCard } from "@/components/ui";
import { getPosts, getTags } from "@/lib/content";

export const metadata: Metadata = { title: "Blog", description: "Notes on backend engineering, system design and DSA." };

export default function BlogPage() {
  const posts = getPosts();
  const tags = getTags();
  return (
    <>
      <PageTitle
        title="Blog"
        intro={<>Notes on backend engineering, system design and DSA. Subscribe via <a className="text-blue-600 hover:underline dark:text-blue-400" href="/rss.xml">RSS</a>.</>}
      />
      {tags.length > 0 && (
        <ul className="mb-10 flex flex-wrap gap-2" aria-label="Browse by tag">
          {tags.map((t) => (
            <li key={t.slug}>
              <Link href={`/blog/tags/${t.slug}/`} className="rounded-full border border-slate-300 px-3 py-1 text-sm hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:hover:border-blue-400 dark:hover:text-blue-400">
                {t.tag} <span className="text-slate-400">{t.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="space-y-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}
