---
title: "Group Breach Register"
company: "Societe Generale"
role: "Software Engineer (Backend)"
period: "Jan 2026 – Present"
featured: true
order: 1
tech: [Java, Spring Boot, Spring Security, PostgreSQL, Flyway, React, Docker, AKS, Helm, GitHub Actions, Azure Key Vault]
links:
  github: ""
  demo: ""
summary: "The bank's company-wide compliance breach platform (formerly Breach Log). I worked on the original Flask version, then owned the entire backend of its rebuild on Spring Boot and React on Azure Kubernetes Service."
impact:
  - "40–50 REST APIs, all responding in under 1 second"
  - "Scoring rules configurable from the UI, with no code changes"
  - "85% test coverage"
  - "Sole backend engineer, from API design to production on AKS"
  - "Live in production since November 2026"
---

## Context

Compliance teams across the bank use this platform to log, store and visualize breaches of every type,
from missed mandatory training to KYC issues and personal account dealing. Its users are compliance
officers and the business process officers responsible for managing breaches in their area.

The original application was built on Python Flask-Admin. It struggled as the number of concurrent
users grew, and its admin-panel style made richer frontend features impractical. We rebuilt it on a
modern stack: a Spring Boot backend, a React frontend, and Azure Kubernetes Service.

The platform started as **Breach Log** and was renamed **Group Breach Register** after its company-wide rollout.

For the rebuild, the team was two engineers. I owned the backend end to end, and a teammate owned the frontend.

### Before the rebuild: the Flask version

I first worked on the original Python Flask-Admin application:

- Engineered the **cumulative breach-score engine** for employees, based on breach type, recurrence interval and severity.
- Led the **rollout to EMEA users**, including region-specific IAM profiles and constraints, compliance-driven refactoring, and a new data extract upload feature.
- Stack: Python, Flask, Flask-Admin, SQLAlchemy, PostgreSQL, Docker, AKS, Jenkins, Terraform.

## What I built in the rebuild

### APIs
- Designed and implemented **40–50 REST endpoints**, documented with **OpenAPI/Swagger** so the
  frontend could work against a clear contract.
- Server-side **pagination and query-parameter filtering** on breach listings, so large datasets
  stay fast.
- Made the write operations most at risk from retries **idempotent**, so a repeated request can't
  create duplicate records.

### Configurable scoring engine
- Each breach type carries a score, and authorized users can change the scoring rules **from the UI**
  without a code change or a redeploy.
- **Dual scoring logic**: the score is calculated differently depending on the type of user involved.

### Bilingual (English / French)
- The platform is fully available in **English and French**. Translated values are **stored in the
  database** next to the data, so switching language never calls an external translation API at runtime.
- English stays in the regular columns. Translations live in **one JSON column** per table, keyed by
  language code, instead of a `_fr` copy of every text column. Adding another language, such as Chinese,
  means adding a new key. It needs no schema change.

```json
{ "fr": { "name": "Formation obligatoire", "description": "..." } }
```

### Access control
- Integrated the company's internal IAM with **Spring Security**.
- Four roles, plus fine-grained constraints by **business unit**, so users only see and act on the
  breaches they are responsible for.

### Data
- **Azure PostgreSQL Flexible Server** as the main database.
- Migrated data from the legacy application into a redesigned schema using versioned **Flyway** migrations.
- HR reference data is stored in **Azure Storage (File Share)**, mounted directly into the application pods.

### Background jobs
- Email notifications run as a **scheduled job every 10 minutes**, kept out of the request path.
  **ShedLock** makes sure only one of the replicas runs each job, so no email is sent twice.

### Deployment and operations
- **CI/CD with GitHub Actions**: build the JAR, publish it to the internal artifact repository,
  build the Docker image, and deploy to **AKS with Helm**. There are separate dev and prod environments.
- Secrets live in **Azure Key Vault** and stay out of code and config files.
- Runs as **3 pods** today, with load-based autoscaling being evaluated.
- A **sidecar container** ships application logs from each pod to **Elasticsearch and Kibana**
  for search and troubleshooting.

## Results

- Every API responds in **under 1 second**. Slow work, like sending emails, runs in the background.
- **85% test coverage** on the backend.
- The new React frontend makes richer features possible that the old admin-panel UI couldn't support.
- Went live in production in **November 2026**.

## What I learned

The two hardest problems were design problems, not coding ones.

**Architecting EN/FR support.** The easy option was to call a translation API whenever a page loads. We
chose to store both languages in the database instead. Adding a French column next to every text column
would have doubled the width of many tables and made each new language a schema migration. So I added a
single JSON column holding translations keyed by language code. That keeps the schema small and makes
adding a language like Chinese a data change, not a code or schema change. The trade-off is that JSON
fields are harder to constrain and query than plain columns, so validation lives in the application
layer, and both languages have to be kept in sync whenever data changes. In exchange, responses
stay fast and predictable, there's no dependency on an outside service, and compliance users see wording
that a person has reviewed, not machine translation.

**Dual scoring logic.** Two groups of users needed two different scoring rules, and business users had to
be able to change those rules from the UI. The challenge was keeping the two paths separate and testable
without duplicating the whole scoring engine, and making sure a rule change applies correctly to the right
group of users.
