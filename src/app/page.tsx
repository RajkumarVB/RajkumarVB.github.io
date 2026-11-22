import { ExperienceList, MoreLink, PostCard, ProjectCard, SectionHeading } from "@/components/ui";
import leetcode from "@/data/leetcode.json";
import { experience, site } from "@/data/site";
import { getPosts, getProjects } from "@/lib/content";
import Link from "next/link";

export default function Home() {
  const projects = getProjects().slice(0, 4);
  const posts = getPosts().slice(0, 3);

  return (
    <div className="space-y-20">
      <section aria-labelledby="about">
        <SectionHeading id="about">About</SectionHeading>
        <div className="space-y-4 leading-relaxed">
          {site.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="experience">
        <SectionHeading id="experience">Experience</SectionHeading>
        <ExperienceList items={experience} />
        <MoreLink href="/about/">Full experience and skills</MoreLink>
      </section>

      <section aria-labelledby="projects">
        <SectionHeading id="projects">Projects</SectionHeading>
        <div className="space-y-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <MoreLink href="/projects/">All projects</MoreLink>
      </section>

      <section aria-labelledby="dsa">
        <SectionHeading id="dsa">Problem solving</SectionHeading>
        <Link
          href="/dsa/"
          className="-mx-4 grid grid-cols-2 gap-3 rounded-xl p-4 transition-colors hover:bg-white sm:grid-cols-4 dark:hover:bg-slate-900/60"
        >
          {[
            ["Solved", leetcode.total],
            ["Easy", leetcode.byDifficulty.Easy],
            ["Medium", leetcode.byDifficulty.Medium],
            ["Hard", leetcode.byDifficulty.Hard],
          ].map(([label, n]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{n}</div>
              <div className="text-sm text-slate-500">{label}</div>
            </div>
          ))}
        </Link>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="writing">
          <SectionHeading id="writing">Writing</SectionHeading>
          <div className="space-y-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <MoreLink href="/blog/">All posts</MoreLink>
        </section>
      )}
    </div>
  );
}
