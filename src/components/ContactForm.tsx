"use client";

import { useState } from "react";
import { trackEvent } from "./Analytics";

type Status = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400";
const label = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";

/** Optional "leave your details" form. Submissions are emailed by Web3Forms; no backend needed. */
export function ContactForm({ accessKey }: { accessKey: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: accessKey,
          subject: `Portfolio: ${data.name}${data.company ? ` (${data.company})` : ""} left their details`,
          from_name: "rajkumarvb.github.io",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || `Request failed (${res.status})`);
      setStatus("sent");
      form.reset();
      trackEvent("contact-form-submit", "Contact form submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
        Thanks, I&apos;ve got your details and will get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900/60">
      <div>
        <label htmlFor="cf-name" className={label}>Name</label>
        <input id="cf-name" name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="cf-company" className={label}>Company</label>
        <input id="cf-company" name="company" autoComplete="organization" className={input} />
      </div>
      <div>
        <label htmlFor="cf-role" className={label}>Role you&apos;re hiring for</label>
        <input id="cf-role" name="role" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>Message (optional)</label>
        <textarea id="cf-message" name="message" rows={4} className={input} />
      </div>
      {/* Honeypot: bots fill this, people never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        <p className="text-xs text-slate-500">Your details are only emailed to me, never shared.</p>
        {status === "error" && (
          <p role="alert" className="w-full text-sm text-red-600 dark:text-red-400">
            Couldn&apos;t send that ({error}). Please email me instead.
          </p>
        )}
      </div>
    </form>
  );
}
