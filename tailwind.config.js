/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Design system colours from your brief. Change here, the whole site updates.
      colors: {
        bg: "#020617",
        navy: "#071A52",
        royal: "#2563EB",
        cyan: { os: "#00D9FF" },
        ink: "#F8FAFC",
        muted: "#94A3B8",
        violet: { os: "#7C3AED" },
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        mono: [
          "JetBrains Mono Variable",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
