"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type CountArgs = { path: string; title?: string; event?: boolean };
type GoatCounter = { count?: (args: CountArgs) => void };

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

// Counts sent before count.js has loaded wait here.
const queue: CountArgs[] = [];

export function track(args: CountArgs) {
  if (typeof window === "undefined") return;
  if (window.goatcounter?.count) window.goatcounter.count(args);
  else queue.push(args);
}

export function trackEvent(name: string, title?: string) {
  track({ path: name, title: title ?? name, event: true });
}

// Works out an event name for a clicked link, or null if it isn't worth tracking.
function eventFor(a: HTMLAnchorElement): string | null {
  if (a.dataset.track) return a.dataset.track;
  const href = a.getAttribute("href") ?? "";
  if (href.startsWith("mailto:")) return "email-click";
  if (href.toLowerCase().endsWith(".pdf")) return "resume-download";
  try {
    const url = new URL(href, window.location.href);
    if (url.host !== window.location.host) return `outbound-${url.host.replace(/^www\./, "")}`;
  } catch {
    // Not a URL; ignore.
  }
  return null;
}

/**
 * GoatCounter with client-side navigation: counts a page view on every route
 * change (not just the first load), plus click events for resume downloads,
 * email links, outbound links and anything marked with data-track="name".
 */
export function Analytics({ code }: { code: string }) {
  const pathname = usePathname();

  useEffect(() => {
    track({ path: pathname, title: document.title });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const name = eventFor(a as HTMLAnchorElement);
      if (name) trackEvent(name, a.textContent?.trim() || name);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      data-goatcounter-settings='{"no_onload": true}'
      strategy="afterInteractive"
      onLoad={() => {
        while (queue.length) window.goatcounter?.count?.(queue.shift()!);
      }}
    />
  );
}

/** Total visits, read from GoatCounter's public counter. Renders nothing until it loads. */
export function ViewCount({ code }: { code: string }) {
  const [count, setCount] = useState<string | null>(null);
  useEffect(() => {
    fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { count?: string }) => d.count && d.count !== "0" && setCount(d.count))
      .catch(() => {});
  }, [code]);
  return count ? <span>{count} visits</span> : null;
}
