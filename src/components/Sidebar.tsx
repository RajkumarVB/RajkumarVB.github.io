"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { Typewriter } from "./Typewriter";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/dsa/", label: "DSA" },
  { href: "/about/", label: "About" },
];

// Sections on the home page, highlighted as you scroll.
const HOME_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "dsa", label: "Problem solving" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/$/, "") || "/";
  const h = href.replace(/\/$/, "") || "/";
  return h === "/" ? p === "/" : p === h || p.startsWith(h + "/");
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("about");
  useEffect(() => {
    if (!enabled) return;
    const els = HOME_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    // The last section can't reach the observer band, so pick it once the page bottom is reached.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive(HOME_SECTIONS[HOME_SECTIONS.length - 1].id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);
  return active;
}

const initials = site.name
  .split(" ")
  .filter(Boolean)
  .slice(0, 2)
  .map((w) => w[0])
  .join("");

const iconLink = "text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-slate-100";

export function Sidebar({ hasResume, hasPhoto }: { hasResume: boolean; hasPhoto: boolean }) {
  const pathname = usePathname();
  const onHome = isActive(pathname, "/");
  const activeSection = useActiveSection(onHome);
  const { links } = site;

  return (
    <header className="pt-12 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto lg:py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-start justify-between gap-4">
        <Link href="/" aria-label="Home">
          {hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.photoPath} alt={site.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-600/20" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              {initials}
            </span>
          )}
        </Link>
        <ThemeToggle />
      </div>

      <Link href="/" className="mt-4 block">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{site.name}</h1>
      </Link>
      <p className="mt-2 h-6 font-medium text-blue-600 dark:text-blue-400">
        <Typewriter phrases={site.roles} />
      </p>
      <p className="mt-4 max-w-xs leading-relaxed">{site.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {links.email && (
          <Link
            href="/#contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get in touch
          </Link>
        )}
        {hasResume && (
          <a
            href={site.resumePath}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Resume
          </a>
        )}
      </div>

      <nav aria-label="Main" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 lg:block">
        {NAV.map(({ href, label }) => {
          const active = isActive(pathname, href);
          return (
            <div key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center py-1 text-xs font-semibold uppercase tracking-widest transition-colors lg:py-1.5 ${
                  active ? "text-slate-900 dark:text-slate-100" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <span
                  className={`mr-3 hidden h-px bg-current transition-all lg:inline-block ${
                    active ? "w-14 bg-blue-600 dark:bg-blue-400" : "w-6 group-hover:w-12"
                  }`}
                />
                {label}
              </Link>
              {href === "/" && onHome && (
                <ul className="mb-2 ml-[4.25rem] hidden border-l border-slate-200 lg:block dark:border-slate-800">
                  {HOME_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`-ml-px block border-l py-0.5 pl-3 text-sm transition-colors ${
                          activeSection === s.id
                            ? "border-blue-600 text-slate-900 dark:border-blue-400 dark:text-slate-100"
                            : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <ul className="mt-8 flex items-center gap-4 lg:mt-auto lg:pt-6" aria-label="Social links">
        <li>
          <a className={iconLink} href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>
          </a>
        </li>
        {links.linkedin && (
          <li>
            <a className={iconLink} href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
          </li>
        )}
        {links.leetcode && (
          <li>
            <a className={`${iconLink} text-sm font-semibold`} href={links.leetcode} target="_blank" rel="noreferrer">
              LeetCode
            </a>
          </li>
        )}
        {links.email && (
          <li>
            <a className={iconLink} href={`mailto:${links.email}`} aria-label="Email">
              <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            </a>
          </li>
        )}
        <li>
          <a className={`${iconLink} text-sm font-semibold`} href="/rss.xml">RSS</a>
        </li>
      </ul>
    </header>
  );
}
