// Personal details shown across the site. Edit this file to update them.

export const site = {
  name: "Rajkumar V B",
  role: "Backend Engineer",
  // Rotating lines typed under the name in the sidebar (first one is shown without JS).
  roles: ["Backend Engineer", "Spring Boot and Azure", "Distributed systems", "Crawlers at scale"],
  // Optional photo: put a square image at public/images/profile.jpg. Initials are shown until then.
  photoPath: "/images/profile.jpg",
  tagline:
    "I design APIs and backend systems that stay up, and write about what I learn along the way.",
  url: "https://rajkumarvb.github.io",
  location: "Bengaluru, India",
  // Shown in the sidebar and the Contact section.
  openTo: "Backend, Full Stack, Data and AI Engineer roles",
  // Put your PDF at public/resume/Rajkumar-Resume.pdf. The download button
  // only appears once that file exists.
  resumePath: "/resume/Rajkumar-Resume.pdf",
  links: {
    github: "https://github.com/RajkumarVB",
    linkedin: "https://www.linkedin.com/in/rajkumarvb/",
    email: "rajkumarvb.career@gmail.com", // leave empty to hide
    leetcode: "https://leetcode.com/Rajkumar003/",
  },
  // Paragraphs for the About section.
  about: [
    "I'm a backend-focused software engineer with 4+ years at Societe Generale, building internal platforms used by compliance teams across the bank.",
    "I like owning a service end to end: designing the APIs and data model, securing it, and running it in production on Kubernetes. My main stack is Java, Spring Boot, PostgreSQL and Azure, and I'm keen to take on full stack, data and AI engineering work too.",
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
    period: "Jul 2022 – Present",
    title: "Software Engineer",
    company: "Societe Generale",
    description:
      "Build internal platforms for compliance teams at Societe Generale Global Solution Centre, Bangalore. Sole backend engineer on the rebuild of Group Breach Register, the company-wide breach platform, from Flask-Admin to Spring Boot on AKS. Backend engineer on Cross-Border (30,000+ users a month), where I made exports asynchronous with Azure Service Bus and led the SQL Server to PostgreSQL migration. Built the configurable Selenium crawling engine behind Regulatory Watch, which monitors 1,500+ regulator websites. Cut PostgreSQL costs by €3,000 a month by right-sizing databases, and automated their provisioning and teardown with Terraform and Infracost.",
    tech: ["Java", "Spring Boot", "Python", "PostgreSQL", "Azure Service Bus", "Selenium", "AKS", "Helm", "GitHub Actions", "Terraform"],
  },
  {
    period: "Feb 2022 – Jun 2022",
    title: "Software Engineer Intern",
    company: "Societe Generale",
    description:
      "Designed, built and deployed Genie, an internal chatbot, from scratch. It handled about 180 queries a month and saved around 30 hours of manual work.",
    tech: ["Python", "Flask", "Flask-Admin", "Docker", "AKS"],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
};

export const education: Education[] = [
  {
    school: "PSG College of Technology",
    degree: "Bachelor of Engineering, Electronics and Communication Engineering",
    period: "Aug 2018 – Jun 2022",
    location: "Coimbatore, India",
    details: ["GPA 9.31 / 10"],
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Java", "SQL", "Python", "TypeScript"],
  Backend: ["Spring Boot", "Spring Security", "Spring Data JPA", "Flask", "REST / OpenAPI", "Flyway", "ShedLock"],
  Data: ["PostgreSQL", "SQL Server", "MySQL", "Azure Blob Storage", "Azure Service Bus"],
  "Cloud & DevOps": ["Azure", "AKS / Kubernetes", "Helm", "Docker", "GitHub Actions", "Key Vault", "Terraform", "Infracost"],
  Crawling: ["Selenium", "Chromium", "XPath", "APScheduler", "Microsoft Graph API"],
  Observability: ["Elasticsearch", "Kibana"],
  Frontend: ["React"],
};
