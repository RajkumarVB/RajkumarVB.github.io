import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";
import { Tags } from "@/components/ui";
import { formatDate, getPost, getPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { type: "article", title: p.title, description: p.summary, publishedTime: p.date, tags: p.tags },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[i - 1];
  const older = posts[i + 1];

  return (
    <article>
      <Link href="/blog/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
        ← All posts
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">{post.title}</h1>
      <p className="mt-3 text-sm text-slate-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
      </p>
      <div className="mt-4">
        <Tags items={post.tags} linkToBlog />
      </div>
      <div className="mt-10">
        <Mdx source={post.content} format={post.format} />
      </div>
      <nav className="mt-16 grid gap-4 border-t border-slate-200 pt-8 text-sm sm:grid-cols-2 dark:border-slate-800" aria-label="More posts">
        {older ? (
          <Link href={`/blog/${older.slug}/`} className="hover:text-blue-600 dark:hover:text-blue-400">
            <span className="block text-slate-500">← Older</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{older.title}</span>
          </Link>
        ) : <span />}
        {newer && (
          <Link href={`/blog/${newer.slug}/`} className="text-right hover:text-blue-600 dark:hover:text-blue-400">
            <span className="block text-slate-500">Newer →</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{newer.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
