---
title: "Cross-Border Travel Approval Platform"
company: "Societe Generale"
role: "Software Engineer (Backend)"
period: "2022 – Present"
featured: true
order: 2
tech: [Java, Spring Boot, Spring Data JPA, Spring Security, PostgreSQL, SQL Server, Azure Service Bus, Azure Blob Storage, Flyway, Docker, AKS, Helm, GitHub Actions, Elasticsearch, Kibana]
links:
  github: ""
  demo: ""
summary: "Internal platform that every employee travelling abroad goes through: read and acknowledge country guidelines, then raise a travel request that runs through a configurable approval workflow. I built backend features, redesigned exports as async jobs, and moved the service from on-prem to Azure."
impact:
  - "30,000+ users a month, 2,000+ daily"
  - "Export support tickets: ~50 a week to near zero"
  - "Async exports handle 60k–100k-row CSV files"
  - "Led SQL Server to PostgreSQL migration, no data loss"
---

## Context

Before an employee of the bank travels to another country, they have to read that country's guidelines,
acknowledge them, and get the trip approved. Cross-Border is the internal platform for this. It gives the
bank **one central view of all staff travel**, with approvals done before the trip rather than after.

It serves **more than 30,000 users a month**, with over **2,000 using it every day**. The team was 3–4 backend
engineers and 2–3 frontend engineers. I worked on the backend, built with Spring Boot and PostgreSQL, behind a
React frontend.

## What I built

### Guidelines
- Guidelines are **uploaded, edited and formatted in the UI** by administrators, and stored as HTML.
- A user has to **read and acknowledge** the relevant guideline before they can create a travel request.
  The acknowledgement is recorded against the user.

### Configurable approval workflows
- Each travel request is saved and routed through an approval workflow. The default approver is the
  employee's **manager**.
- Workflows are **configurable from the UI**: you can add **country-specific approvers** or
  **country-specific compliance officers**. Each participant can be set as an **approver** or as an
  **FYI recipient**, who is notified but doesn't need to act.

### Asynchronous exports
Users export travel data as CSV or Excel. The first version generated the file **synchronously** inside the
HTTP request. Large exports hit **request timeouts**, and the support team was getting about
**50 tickets a week** about failed exports.

I redesigned it as an **asynchronous job**:

![Export flow: the API records the job and returns 202, a worker builds the file, uploads it to Blob Storage, and emails a time-limited SAS link](/images/cross-border-export-flow.svg)

1. The user requests an export. The API saves an **export job in PostgreSQL** with status `PENDING`,
   publishes a message to **Azure Service Bus**, and immediately returns **202 Accepted**.
   The UI tells the user the request was accepted.
2. A worker consumes the message, queries the data, and builds the **CSV or Excel** file. The job status in
   PostgreSQL is updated as it moves from processing to done or failed.
3. The file is uploaded to **Azure Blob Storage**.
4. The worker generates a **SAS link valid for 2 days** and emails it to the user through **Azure SMTP**.
   The file never goes through the web tier, and the link expires automatically.

After the redesign, exports of **60,000–100,000 records** complete reliably, and export-related support
tickets dropped from **about 50 a week to almost none**.

A public, runnable version of this pattern is on GitHub: [async-export-demo](/projects/async-export-demo/).

### Dashboards
- Backend APIs for dashboards that give compliance and management teams a view of travel across the bank.

### Database migration: SQL Server to PostgreSQL
- Led the end-to-end migration from **SQL Server to PostgreSQL**, refactoring code that relied on
  SQL Server-specific behaviour so it works on both. The switch went through with **minimal downtime and no
  data loss**.
- Schema changes are managed through versioned **Flyway** migrations.

### Deployment and operations
- Led the **move from on-prem to Azure**, deploying the service to **Azure Kubernetes Service**.
- **CI/CD with GitHub Actions** and **Helm** charts for deployments to AKS.
- Monitoring through the bank's **monitoring sidecar**, which ships logs and metrics from each pod to
  **Elasticsearch**, with **Kibana** dashboards for troubleshooting.

## Results

- One central, auditable view of staff travel, with approvals happening **before** the trip.
- Exports that used to time out now run in the background, with support tickets down from about 50 a week
  to almost none.
- Moved from SQL Server to PostgreSQL, and from on-prem servers to Azure Kubernetes Service with automated deployments.
