# Portfolio site

- Owner: Rajkumar (GitHub `RajkumarVB`), targeting backend / software engineering roles.
- Stack: Next.js 15 App Router, TypeScript, Tailwind v4, MDX via next-mdx-remote, rehype-pretty-code.
- Hosting: GitHub Pages at https://rajkumarvb.github.io via `.github/workflows/deploy.yml`.
- Must stay static-export compatible (`output: "export"`): no API routes, no SSR, no server actions,
  no `next/image` optimization. Route handlers need `export const dynamic = "force-static"`.
- Design: "split sidebar" (sticky profile on the left, content on the right), slate + blue, light/dark via
  `prefers-color-scheme`.
- Content lives in `content/` and `src/data/`; see README for where each thing goes.
- Verify with `npm run lint && npm run build` before committing.
