// Personal details shown across the site. Edit this file to update them.

export const site = {
  name: "Rajkumar V B",
  role: "Backend Engineer",
  tagline:
    "I design APIs and backend systems that stay up, and write about what I learn along the way.",
  url: "https://rajkumarvb.github.io",
  // Put your PDF at public/resume/Rajkumar-Resume.pdf. The download button
  // only appears once that file exists.
  resumePath: "/resume/Rajkumar-Resume.pdf",
  links: {
    github: "https://github.com/RajkumarVB",
    linkedin: "", // e.g. https://www.linkedin.com/in/your-handle
    email: "", // e.g. you@example.com (leave empty to hide)
  },
  // Paragraphs for the About section.
  about: [
    "I'm a backend-focused software engineer with 4+ years at Societe Generale, building internal platforms for the bank's compliance teams.",
    "Most recently I owned the backend of a full platform migration, moving a legacy Python Flask-Admin application to Java and Spring Boot with a React frontend. I designed the REST APIs and the configurable scoring engine, implemented role-based access control with Spring Security, and took the service to production on Azure Kubernetes Service with Helm and GitHub Actions.",
    "I solve DSA problems regularly and keep every accepted solution, grouped by pattern, in a public repo with a study guide.",
  ],
};

export type Experience = {
  period: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
};

// Most recent first.
export const experience: Experience[] = [
  {
    period: "Jun 2022 – Present",
    title: "Software Engineer",
    company: "Societe Generale",
    description:
      "Build internal platforms for compliance teams. Sole backend engineer on the migration of the company-wide breach management platform from Python Flask-Admin to Spring Boot on AKS: 40–50 REST APIs, configurable scoring, role-based access, Flyway data migration and CI/CD.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "AKS", "Helm", "GitHub Actions"],
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Java", "SQL", "Python", "TypeScript"],
  Backend: ["Spring Boot", "Spring Security", "REST / OpenAPI", "Flyway", "ShedLock"],
  Data: ["PostgreSQL", "MySQL", "Azure Storage"],
  "Cloud & DevOps": ["Azure", "AKS / Kubernetes", "Helm", "Docker", "GitHub Actions", "Key Vault"],
  Observability: ["Elasticsearch", "Kibana"],
  Frontend: ["React"],
};
