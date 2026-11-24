---
title: "Regulatory Watch"
company: "Societe Generale"
role: "Software Engineer"
period: ""
featured: true
order: 3
tech: [Python, Flask, Selenium, Chromium, APScheduler, PostgreSQL, Microsoft Graph API, MJML, Docker, AKS, GitHub Actions]
links:
  github: ""
  demo: ""
summary: "Full-stack platform that crawls 1,500+ public regulator websites every day, stores notices, sanctions and complaints as news, and sends them to compliance teams as newsletters. I built the configurable crawling engine and the feed configuration flows."
impact:
  - "1,500+ websites of 500+ regulators crawled daily"
  - "500k+ news records, 500+ GB of data"
  - "50+ newsletters sent every day"
  - "Replaced daily manual checks across APAC, Europe and the Americas"
---

## Context

Compliance teams have to keep up with notices, sanctions and complaints published by regulators. These
appear on hundreds of public websites, each with its own structure, and teams used to check them by hand
every day.

Regulatory Watch automates this. It crawls **1,500+ websites belonging to 500+ regulators** across APAC,
Europe and the Americas once a day. It stores everything it finds as **news**, and it sends the relevant
news to compliance users as **newsletters**. The team was more than 5 engineers when I joined and is 4 today.

## What I built

### Configurable crawling engine (`generic_engine`)
- A crawler built on **Selenium and headless Chromium**, so it also works on sites that render content with
  JavaScript.
- Each website is a **feed**: a job that knows where the relevant items are on that site. Feeds are defined
  with **XPath rules configured in the UI**, so anyone with basic HTML knowledge can onboard a new website.
  It needs no code change or deployment.
- One generic engine handles websites of any structure, instead of a custom scraper per site.

### Feed configuration flows
- Built many of the UI flows used to create and edit feeds, and to configure the **institutions**
  (regulators) they belong to.

### Email-only sources
- Some regulators publish updates only by email. I integrated the **Microsoft Graph API** to read those
  emails and turn them into news, the same as crawled items.

### News storage
- Every item is stored as a **news** event: title, text, and attached **PDF and Excel files**.
- PostgreSQL holds **500,000+ news records and more than 500 GB of data**. Files are currently stored in
  the database, and the team is planning to move them to dedicated **Azure Blob Storage**.

### Scheduling and monitoring
- **APScheduler** runs each feed once a day.
- When a website changes its structure, its feed fails and the team gets an **email alert**, so the XPath
  rules can be fixed quickly.

### Newsletters
- **50+ newsletters a day**, built from **MJML** templates and sent over **SMTP**.
- Newsletter send details are tracked, so the team can see whether each one was delivered.

### Deployment
- Moved from **Windows Server to Azure Kubernetes Service**, with **GitHub Actions** for CI/CD.
- Currently working on the next architecture: splitting the platform into **microservices orchestrated
  with Apache Airflow**.

## Results

- Compliance teams no longer check 500+ regulators' websites by hand. The news comes to them.
- Onboarding a new website is a configuration task in the UI, not a development task.
- Sources that publish only by email are covered too, through the Graph API integration.
