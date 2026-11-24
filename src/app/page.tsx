import { ContactCards, EducationList, ExperienceList, MoreLink, PostCard, ProjectCard, SectionHeading } from "@/components/ui";
import leetcode from "@/data/leetcode.json";
import { education, experience, site } from "@/data/site";
import { getPosts, getProjects } from "@/lib/content";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  const projects = getProjects().slice(0, 4);
  const posts = getPosts().slice(0, 3);

  return (
    <div className="space-y-20">
      <section className="reveal" aria-labelledby="about">
        <SectionHeading id="about">About</SectionHeading>
        <div className="space-y-4 leading-relaxed">
          {site.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="reveal" aria-labelledby="experience">
        <SectionHeading id="experience">Experience</SectionHeading>
        <ExperienceList items={experience} />
        <div className="mt-6">
          <EducationList items={education} />
        </div>
        <MoreLink href="/about/">Full experience and skills</MoreLink>
      </section>

      <section className="reveal" aria-labelledby="projects">
        <SectionHeading id="projects">Projects</SectionHeading>
        <div className="space-y-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <MoreLink href="/projects/">All projects</MoreLink>
      </section>

      <section className="reveal" aria-labelledby="dsa">
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
        <section className="reveal" aria-labelledby="writing">
          <SectionHeading id="writing">Writing</SectionHeading>
          <div className="space-y-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <MoreLink href="/blog/">All posts</MoreLink>
        </section>
      )}
      <section className="reveal" aria-labelledby="contact">
        <SectionHeading id="contact">Contact</SectionHeading>
        <p className="mb-6 max-w-2xl leading-relaxed">
          I&apos;m based in {site.location} and open to {site.openTo}. The quickest way to reach me is email or LinkedIn.
        </p>
        <ContactCards links={site.links} />
        {site.web3formsKey && (
          <div className="mt-10">
            <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Hiring? Leave your details</h3>
            <p className="mb-4 max-w-2xl leading-relaxed">
              Share how to reach you and what you&apos;re hiring for, and I&apos;ll get back to you.
            </p>
            <ContactForm accessKey={site.web3formsKey} />
          </div>
        )}
      </section>
    </div>
  );
}
