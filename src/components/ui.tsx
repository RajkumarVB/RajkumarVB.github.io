import Link from "next/link";
import { formatDate, tagSlug, type Post, type Project } from "@/lib/content";
import type { Education, Experience } from "@/data/site";

export function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mb-6 scroll-mt-16 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100"
    >
      {children}
    </h2>
  );
}

export function PageTitle({ title, intro }: { title: string; intro?: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
      {intro && <p className="mt-3 max-w-2xl leading-relaxed">{intro}</p>}
    </div>
  );
}

export function Tags({ items, linkToBlog = false }: { items: string[]; linkToBlog?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {items.map((t) => (
        <li key={t}>
          {linkToBlog ? (
            <Link
              href={`/blog/tags/${tagSlug(t)}/`}
              className="relative z-10 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
            >
              {t}
            </Link>
          ) : (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-500/10 dark:text-blue-300">
              {t}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// Card with a hover background; the whole card is a link via an overlay.
function Card({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <article className="group relative -mx-4 rounded-xl border border-transparent p-4 transition-all hover:border-slate-200 hover:bg-white hover:shadow-[0_4px_18px_rgba(15,23,42,0.06)] dark:hover:border-slate-800 dark:hover:bg-slate-900/60">
      <Link href={href} className="absolute inset-0 z-0 rounded-xl" aria-hidden tabIndex={-1} />
      {children}
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card href={`/projects/${project.slug}/`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          <Link href={`/projects/${project.slug}/`} className="relative z-10">
            {project.title}
          </Link>
          {project.draft && <span className="ml-2 text-xs font-normal text-amber-600">(draft)</span>}
        </h3>
        <span className="shrink-0 text-xs text-slate-500">{project.period}</span>
      </div>
      {(project.company || project.role) && (
        <p className="mt-1 text-sm text-slate-500">
          {[project.role, project.company].filter(Boolean).join(" · ")}
        </p>
      )}
      <p className="mt-2 leading-relaxed">{project.summary}</p>
      <div className="mt-3">
        <Tags items={project.tech} />
      </div>
    </Card>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card href={`/blog/${post.slug}/`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          <Link href={`/blog/${post.slug}/`} className="relative z-10">
            {post.title}
          </Link>
          {post.draft && <span className="ml-2 text-xs font-normal text-amber-600">(draft)</span>}
        </h3>
        <time dateTime={post.date} className="shrink-0 text-xs text-slate-500">
          {formatDate(post.date)}
        </time>
      </div>
      <p className="mt-2 leading-relaxed">{post.summary}</p>
      <div className="mt-3 flex items-center gap-3">
        <Tags items={post.tags} linkToBlog />
        <span className="text-xs text-slate-500">{post.readingTime}</span>
      </div>
    </Card>
  );
}

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="space-y-2">
      {items.map((e) => (
        <li
          key={e.title + e.company}
          className="-mx-4 grid gap-2 rounded-xl p-4 sm:grid-cols-[140px_1fr] sm:gap-6"
        >
          <p className="pt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">{e.period}</p>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {e.title} · {e.company}
            </h3>
            <p className="mt-2 leading-relaxed">{e.description}</p>
            <div className="mt-3">
              <Tags items={e.tech} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-4 inline-block font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
    >
      {children} →
    </Link>
  );
}

export function EducationList({ items }: { items: Education[] }) {
  return (
    <ol className="space-y-2">
      {items.map((e) => (
        <li key={e.school} className="-mx-4 grid gap-2 rounded-xl p-4 sm:grid-cols-[140px_1fr] sm:gap-6">
          <p className="pt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">{e.period}</p>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{e.school}</h3>
            <p className="mt-1">{e.degree}</p>
            <p className="mt-1 text-sm text-slate-500">{[e.location, ...e.details].join(" · ")}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const contactIcon = "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";

export function ContactCards({ links }: { links: { email?: string; linkedin?: string; github?: string; leetcode?: string } }) {
  const items = [
    links.email && { label: "Email", value: links.email, href: `mailto:${links.email}`, icon: "@" },
    links.linkedin && { label: "LinkedIn", value: links.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: links.linkedin, icon: "in" },
    links.github && { label: "GitHub", value: links.github.replace(/^https?:\/\//, ""), href: links.github, icon: "gh" },
    links.leetcode && { label: "LeetCode", value: links.leetcode.replace(/^https?:\/\//, "").replace(/\/$/, ""), href: links.leetcode, icon: "lc" },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: string }[];

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.label}>
          <a
            href={i.href}
            target={i.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-600 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-400"
          >
            <span className={`${contactIcon} text-sm font-bold`} aria-hidden>{i.icon}</span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{i.label}</span>
              <span className="block truncate font-medium text-slate-900 dark:text-slate-100">{i.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
