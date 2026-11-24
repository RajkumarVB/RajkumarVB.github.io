import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BackToTop } from "@/components/BackToTop";
import { Sidebar } from "@/components/Sidebar";
import { themeScript } from "@/components/ThemeToggle";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.tagline },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
};

// Resolved at build time, so the button only shows once the PDF is committed.
const hasResume = fs.existsSync(path.join(process.cwd(), "public", site.resumePath));
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", site.photoPath));

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} bg-slate-50 font-sans text-slate-600 antialiased selection:bg-blue-200 dark:bg-slate-950 dark:text-slate-400 dark:selection:bg-blue-500/30`}
      >
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
          Skip to content
        </a>
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
          <Sidebar hasResume={hasResume} hasPhoto={hasPhoto} />
          <main id="content" className="py-12 lg:py-20">
            {children}
            <footer className="mt-24 text-sm text-slate-500">
              Built with Next.js and Tailwind CSS, deployed on GitHub Pages.{" "}
              <a className="underline hover:text-slate-900 dark:hover:text-slate-100" href={`${site.links.github}/RajkumarVB.github.io`}>
                Source
              </a>
            </footer>
          </main>
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
