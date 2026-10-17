import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#090d16", // Deep dark charcoal blue
          secondary: "#0f172a",
        },
        surface: {
          DEFAULT: "#1e293b",
          light: "#334155",
          dark: "#0f172a",
        },
        brand: {
          DEFAULT: "#2563eb", // Royal Blue from logo
          light: "#3b82f6",
          dark: "#1d4ed8",
          glow: "rgba(37, 99, 235, 0.2)",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#cbd5e1",
          muted: "#94a3b8",
        },
        border: {
          glass: "rgba(255, 255, 255, 0.08)",
          glassHover: "rgba(37, 99, 235, 0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        brand: "0 0 25px -5px rgba(37, 99, 235, 0.3)",
        "brand-lg": "0 0 50px -10px rgba(37, 99, 235, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
