import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        signal: "rgb(var(--signal) / <alpha-value>)",
        "brand-dsa": "rgb(var(--brand-dsa) / <alpha-value>)",
        "brand-hub": "rgb(var(--brand-hub) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        lift: "0 18px 50px rgb(20 30 40 / 0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
