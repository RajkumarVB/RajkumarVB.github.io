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
    linkedin: "https://www.linkedin.com/in/rajkumarvb/",
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
      "Build internal platforms for compliance teams at Societe Generale Global Solution Centre, Bangalore. Sole backend engineer on the rebuild of Group Breach Register, the company-wide breach platform, from Flask-Admin to Spring Boot on AKS. Backend engineer on Cross-Border (30,000+ users a month), where I made exports asynchronous with Azure Service Bus and led the SQL Server to PostgreSQL migration. Built the configurable Selenium crawling engine behind Regulatory Watch, which monitors 1,500+ regulator websites.",
    tech: ["Java", "Spring Boot", "Python", "PostgreSQL", "Azure Service Bus", "Selenium", "AKS", "Helm", "GitHub Actions"],
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Java", "SQL", "Python", "TypeScript"],
  Backend: ["Spring Boot", "Spring Security", "Spring Data JPA", "Flask", "REST / OpenAPI", "Flyway", "ShedLock"],
  Data: ["PostgreSQL", "SQL Server", "MySQL", "Azure Blob Storage", "Azure Service Bus"],
  "Cloud & DevOps": ["Azure", "AKS / Kubernetes", "Helm", "Docker", "GitHub Actions", "Key Vault", "Terraform"],
  Crawling: ["Selenium", "Chromium", "XPath", "APScheduler", "Microsoft Graph API"],
  Observability: ["Elasticsearch", "Kibana"],
  Frontend: ["React"],
};
