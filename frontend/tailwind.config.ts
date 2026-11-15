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
        brand: {
          DEFAULT: "#ff4f00",
          deep: "#d93d00",
          soft: "#ffe8d9",
        },
        ink: "#1a1410",
        muted: "#5c534c",
        line: "#ead9cc",
        surface: "#fff8f3",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(255, 79, 0, 0.18)",
        soft: "0 10px 30px rgba(26, 20, 16, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
