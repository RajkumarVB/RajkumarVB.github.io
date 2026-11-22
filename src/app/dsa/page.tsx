import type { Metadata } from "next";
import { PageTitle } from "@/components/ui";
import leetcode from "@/data/leetcode.json";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "DSA",
  description: `${leetcode.total} LeetCode problems solved, grouped by pattern.`,
};

const REPO = `${site.links.github}/LeetCode-Solutions`;
const DIFF = {
  Easy: { bar: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
  Medium: { bar: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
  Hard: { bar: "bg-rose-500", text: "text-rose-700 dark:text-rose-400" },
} as const;
type Difficulty = keyof typeof DIFF;

export default function DsaPage() {
  const { total, byDifficulty, categories } = leetcode;
  const max = Math.max(...categories.map((c) => c.count));

  return (
    <>
      <PageTitle
        title="Data structures and algorithms"
        intro={<>Every accepted LeetCode solution I&apos;ve written, deduplicated and grouped by pattern, each with the key idea and complexity. Source and study guide are on <a className="text-blue-600 hover:underline dark:text-blue-400" href={REPO}>GitHub</a>.</>}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Solved" value={total} />
        {(Object.keys(DIFF) as Difficulty[]).map((d) => (
          <Stat key={d} label={d} value={byDifficulty[d]} className={DIFF[d].text} />
        ))}
      </div>

      <div className="mt-4 flex h-2 overflow-hidden rounded-full" role="img" aria-label="Share of problems by difficulty">
        {(Object.keys(DIFF) as Difficulty[]).map((d) => (
          <div key={d} className={DIFF[d].bar} style={{ width: `${(byDifficulty[d] / total) * 100}%` }} />
        ))}
      </div>

      <h2 className="mb-4 mt-14 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">By pattern</h2>
      <div className="space-y-2">
        {categories.map((c) => (
          <details key={c.name} className="group rounded-xl border border-slate-200 bg-white open:shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <summary className="flex cursor-pointer list-none items-center gap-4 p-4">
              <span className="w-44 shrink-0 font-medium text-slate-900 dark:text-slate-100">{c.name}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <span className="block h-full rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: `${(c.count / max) * 100}%` }} />
              </span>
              <span className="w-8 text-right text-sm tabular-nums">{c.count}</span>
              <span className="text-slate-400 transition-transform group-open:rotate-90" aria-hidden>›</span>
            </summary>
            <ul className="divide-y divide-slate-100 border-t border-slate-100 dark:divide-slate-800 dark:border-slate-800">
              {c.problems.map((p) => (
                <li key={p.slug} className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-[1fr_auto] sm:gap-4">
                  <div>
                    <a href={`${REPO}/tree/main/leetcode-solutions/${p.slug}`} className="font-medium text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400" target="_blank" rel="noreferrer">
                      {p.id}. {p.title}
                    </a>
                    <p className="mt-1 text-slate-500">{p.idea}</p>
                  </div>
                  <span className={`text-xs font-semibold ${DIFF[p.difficulty as Difficulty].text}`}>{p.difficulty}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <p className="mt-6 text-xs text-slate-500">Updated {leetcode.generatedAt}.</p>
    </>
  );
}

function Stat({ label, value, className = "text-slate-900 dark:text-slate-100" }: { label: string; value: number; className?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className={`text-3xl font-bold tabular-nums ${className}`}>{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}
