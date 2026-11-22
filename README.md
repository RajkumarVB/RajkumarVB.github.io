# rajkumarvb.github.io

Portfolio and blog of Rajkumar V B. Next.js (App Router) + Tailwind CSS, exported as a static
site and deployed to GitHub Pages by GitHub Actions.

## Editing content

| What | Where |
|---|---|
| Name, tagline, links, experience, skills | `src/data/site.ts` |
| Projects (one Markdown file each) | `content/projects/*.md`. Copy `_TEMPLATE.md` |
| Blog posts (MDX) | `content/posts/*.mdx`. Copy `_TEMPLATE.mdx`. The file name is the URL slug |
| Resume PDF | `public/resume/Rajkumar-Resume.pdf` (the download button appears once it exists) |
| LeetCode stats | `npm run stats` regenerates `src/data/leetcode.json` from `~/LeetCode Solutions` |

Posts or projects with `draft: true` show up in `npm run dev` but not on the live site.

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm run lint
npm run stats   # refresh DSA numbers (set LEETCODE_REPO to override the path)
```

## Deployment

`.github/workflows/deploy.yml` runs on every push and pull request to `main`:
lint and build, then (on `main` only) deploy `out/` to GitHub Pages.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

`design-previews/` holds the clickable template mockups used to pick the design. It isn't part of the site.
