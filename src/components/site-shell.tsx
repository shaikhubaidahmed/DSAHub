"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, CheckCircle2, Moon, Search, Sun, Waypoints } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "@/components/providers";
import { BrandLogo } from "@/components/brand-logo";

const navItems = [
  { href: "/problems", label: "Problems", icon: BookOpen },
  { href: "/patterns", label: "Patterns", icon: Waypoints },
  { href: "/progress", label: "Progress", icon: CheckCircle2 },
];

function SearchField() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <form
      className="search-field"
      role="search"
      aria-label="Search problem catalog"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(query.trim() ? `/problems?q=${encodeURIComponent(query.trim())}` : "/problems");
      }}
    >
      <Search size={16} aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Find a problem"
        aria-label="Search problems"
      />
      <span className="search-hint">/</span>
    </form>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand" aria-label="DSAHub home">
            <BrandLogo />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link key={item.href} href={item.href} className={`nav-link ${active ? "is-active" : ""}`}>
                  <Icon size={15} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-tools">
            <SearchField />
            <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="site-main">{children}</main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className={`mobile-nav-link ${active ? "is-active" : ""}`}>
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
