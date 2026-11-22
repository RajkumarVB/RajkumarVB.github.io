import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";
import { Tags } from "@/components/ui";
import { getProject, getProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { links } = project;

  return (
    <article>
      <Link href="/projects/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
        ← All projects
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{project.title}</h1>
      <p className="mt-2 text-slate-500">
        {[project.role, project.company, project.period].filter(Boolean).join(" · ")}
      </p>
      <p className="mt-4 text-lg leading-relaxed">{project.summary}</p>
      <div className="mt-4">
        <Tags items={project.tech} />
      </div>
      {(links.github || links.demo) && (
        <div className="mt-6 flex gap-4 text-sm font-medium">
          {links.github && <a className="text-blue-600 hover:underline dark:text-blue-400" href={links.github} target="_blank" rel="noreferrer">Source code ↗</a>}
          {links.demo && <a className="text-blue-600 hover:underline dark:text-blue-400" href={links.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}
        </div>
      )}
      {project.impact.length > 0 && (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {project.impact.map((i) => (
            <li key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              {i}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10">
        <Mdx source={project.content} format={project.format} />
      </div>
    </article>
  );
}
