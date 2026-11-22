import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const prettyCode: PrettyCodeOptions = {
  // Light and dark themes; globals.css switches between them.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
};

export function Mdx({ source, format = "mdx" }: { source: string; format?: "md" | "mdx" }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-800">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            format,
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCode]],
          },
        }}
      />
    </div>
  );
}
