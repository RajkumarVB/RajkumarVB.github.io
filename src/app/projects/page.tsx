import type { Metadata } from "next";
import { PageTitle, ProjectCard } from "@/components/ui";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageTitle title="Projects" intro="Work projects and personal builds. Each one has a write-up of the problem, what I built, and the results." />
      <div className="space-y-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
