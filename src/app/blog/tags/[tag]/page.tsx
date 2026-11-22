import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle, PostCard } from "@/components/ui";
import { getPosts, getTags, tagSlug } from "@/lib/content";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getTags().map((t) => ({ tag: t.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getTags().find((t) => t.slug === slug);
  return { title: `Posts tagged ${tag?.tag ?? ""}` };
}

export default async function TagPage({ params }: Props) {
  const slug = (await params).tag;
  const tag = getTags().find((t) => t.slug === slug);
  const posts = getPosts().filter((p) => p.tags.some((t) => tagSlug(t) === slug));
  return (
    <>
      <Link href="/blog/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
        ← All posts
      </Link>
      <div className="mt-6">
        <PageTitle title={`#${tag?.tag ?? slug}`} intro={`${posts.length} post${posts.length === 1 ? "" : "s"}`} />
      </div>
      <div className="space-y-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}
