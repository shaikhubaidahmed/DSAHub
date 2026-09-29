import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { SiteShell } from "@/components/site-shell";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "DSA Hub — deliberate practice, organized",
    template: "%s — DSA Hub",
  },
  description: "A focused practice system for the deduplicated NeetCode 150 and Striver DSA reference.",
  keywords: ["DSA", "data structures", "algorithms", "NeetCode", "Striver", "LeetCode"],
  openGraph: {
    title: "DSA Hub — deliberate practice, organized",
    description: "Browse 269 curated DSA problems by pattern, source, and progress.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
