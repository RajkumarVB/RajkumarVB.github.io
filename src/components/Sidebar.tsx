"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/dsa/", label: "DSA" },
  { href: "/about/", label: "About" },
];

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/$/, "") || "/";
  const h = href.replace(/\/$/, "") || "/";
  return h === "/" ? p === "/" : p === h || p.startsWith(h + "/");
}

export function Sidebar({ hasResume }: { hasResume: boolean }) {
  const pathname = usePathname();
  const { links } = site;

  return (
    <header className="pt-12 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:py-20">
      <Link href="/" className="block">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {site.name}
        </h1>
      </Link>
      <p className="mt-2 font-medium text-blue-600 dark:text-blue-400">{site.role}</p>
      <p className="mt-4 max-w-xs leading-relaxed">{site.tagline}</p>

      <nav aria-label="Main" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 lg:mt-12 lg:block">
        {NAV.map(({ href, label }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center py-1 text-xs font-semibold uppercase tracking-widest transition-colors lg:py-2 ${
                active
                  ? "text-slate-900 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <span
                className={`mr-3 hidden h-px bg-current transition-all lg:inline-block ${
                  active ? "w-14 bg-blue-600 dark:bg-blue-400" : "w-6 group-hover:w-12"
                }`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {hasResume && (
        <a
          href={site.resumePath}
          download
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download resume
        </a>
      )}

      <ul className="mt-8 flex gap-5 text-sm lg:mt-auto" aria-label="Social links">
        <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
        {links.linkedin && <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}
        {links.email && <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href={`mailto:${links.email}`}>Email</a></li>}
        <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="/rss.xml">RSS</a></li>
      </ul>
    </header>
  );
}
