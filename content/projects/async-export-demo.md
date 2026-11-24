---
title: "Async Export Demo"
company: "Personal project"
role: "Author"
period: "2026"
featured: true
order: 4
tech: [Java 21, Spring Boot, Spring Data JPA, PostgreSQL, H2, Flyway, Docker, GitHub Actions, JUnit, Awaitility]
links:
  github: "https://github.com/RajkumarVB/async-export-demo"
summary: "Public, runnable Spring Boot version of the async export pattern I built at work: 202 Accepted, a job table, a queue, a worker, and a signed, expiring download link."
impact:
  - "Idempotent submits, safe job claiming and capped retries"
  - "Integration tests for the full flow, run in CI with a smoke test against PostgreSQL"
---

## Problem

My [Cross-Border write-up](/projects/cross-border-platform/) describes how I moved large CSV and Excel
exports out of the HTTP request and into background jobs. That code is private bank code, so this project
rebuilds the same pattern in the open, small enough to read in one sitting and run with one command.

## What I built

A Spring Boot service with three endpoints:

| Method | Path | Result |
| --- | --- | --- |
| `POST` | `/api/exports` | `202 Accepted` with a `Location` header (`200` for a repeated `Idempotency-Key`) |
| `GET` | `/api/exports/{id}` | Job status, plus a signed `downloadUrl` once it has `SUCCEEDED` |
| `GET` | `/api/exports/{id}/download?expires=&sig=` | The file, or `403` if the link was tampered with or has expired |

Key design decisions:

- **The database is the source of truth, and the queue carries only ids.** The job row is committed before
  its id is enqueued, so a worker never picks up a job it can't load.
- **Idempotent submits** through an `Idempotency-Key` header, backed by a unique constraint.
- **Safe claiming**: moving a job from `QUEUED` to `RUNNING` uses optimistic locking, so a duplicate
  delivery or a second worker can't process the same job twice.
- **Retries with a cap**: transient failures go back on the queue, and after the maximum number of attempts
  the job ends as `FAILED` with the error recorded. Unfinished jobs are re-queued on restart.
- **Streaming writes, atomic publish**: rows stream to a temp file that is renamed when complete, so nobody
  downloads a half-written export.
- **Signed, expiring links** (HMAC-SHA256 over job id and expiry), the same idea as an Azure SAS token or an
  S3 pre-signed URL.

`JobQueue` and `BlobStore` are interfaces. The demo uses in-memory and local-disk implementations so it runs
anywhere. In production they would be backed by a broker such as Azure Service Bus and by Azure Blob Storage
or S3.

## Testing and CI

Integration tests drive the real flow with MockMvc and Awaitility: the 202-and-poll flow, idempotency, a
transient failure that succeeds on retry, a permanent failure that ends as `FAILED`, tampered links, and
validation. GitHub Actions runs the tests, builds the Docker image, and runs a smoke test against PostgreSQL.

## Trade-offs

Authentication, multiple worker instances (the in-memory queue is per process), clean-up of old files and
retry back-off are out of scope. The README lists them as next steps so the trade-offs are explicit.
