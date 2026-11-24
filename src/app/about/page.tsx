import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { ContactCards, EducationList, ExperienceList, PageTitle, SectionHeading, Tags } from "@/components/ui";
import { education, experience, site, skills } from "@/data/site";

export const metadata: Metadata = { title: "About" };

const hasResume = fs.existsSync(path.join(process.cwd(), "public", site.resumePath));

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About" />
      <div className="space-y-4 leading-relaxed">
        {site.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {hasResume && (
        <a href={site.resumePath} download className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Download resume (PDF)
        </a>
      )}

      <section className="mt-16">
        <SectionHeading>Experience</SectionHeading>
        <ExperienceList items={experience} />
      </section>

      <section className="mt-16">
        <SectionHeading>Education</SectionHeading>
        <EducationList items={education} />
      </section>

      <section className="mt-16">
        <SectionHeading>Skills</SectionHeading>
        <dl className="space-y-4">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate-900 dark:text-slate-100">{group}</dt>
              <dd><Tags items={items} /></dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <SectionHeading>Contact</SectionHeading>
        <ContactCards links={site.links} />
      </section>
    </>
  );
}
