---
title: "LeetCode Solutions and Study Guide"
company: "Personal project"
role: "Author"
period: "2023 – Present"
featured: true
order: 10
tech: [Java, MySQL, Python]
links:
  github: "https://github.com/RajkumarVB/LeetCode-Solutions"
summary: "235 accepted LeetCode solutions, deduplicated and grouped into 19 patterns, with a generated README and PDF study guide."
impact:
  - "235 problems: 81 easy, 133 medium, 21 hard"
  - "Python tooling regenerates headers, README and PDF from one notes source"
---

## Problem

After a few years of practice I had hundreds of submissions scattered across attempts, retries and
duplicate approaches. That made it hard to revise before interviews: I couldn't quickly see which
patterns I knew well or find the clean version of a solution.

## What I built

- **A download script** that pulls every submission and its metadata (status, runtime, date) into the repo.
- **Deduplication**: one file per distinct approach (`Name_1.java`, `Name_2.java`), with failed attempts
  moved into `attempts/` so the history is kept but out of the way.
- **Structured headers** on every solution: problem summary, example, constraints, key idea, approach and
  complexity. These are generated from JSON notes, so they stay consistent.
- **A README and a PDF study guide** grouped by pattern (sliding window, two pointers, graphs, DP, and more),
  built by Python scripts from the same notes.

## Results

Revision now starts from the pattern, not the problem: open "Sliding Window", read seven key ideas, and
re-derive the solutions. The [DSA page](/dsa/) on this site is built from the same data.
