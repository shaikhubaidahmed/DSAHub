"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { PROGRESS_STORAGE_KEY, type ProgressMap } from "@/lib/progress";
import type { ProblemStatus } from "@/lib/types";

type Theme = "light" | "dark";

interface ProgressContextValue {
  progress: ProgressMap;
  setStatus: (problemId: string, status: ProblemStatus) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, string>;
        setProgress(Object.fromEntries(Object.entries(parsed).filter(([, status]) => status === "completed")) as ProgressMap);
      } catch {
        window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [hydrated, progress]);

  const value = useMemo(
    () => ({
      progress,
      setStatus: (problemId: string, status: ProblemStatus) => {
        setProgress((current) => ({ ...current, [problemId]: status }));
      },
      resetProgress: () => setProgress({}),
    }),
    [progress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("dsa-hub-theme") as Theme | null;
    const preferred = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.dataset.theme = preferred;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("dsa-hub-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </ThemeProvider>
  );
}
