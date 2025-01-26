import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        colors: {
          text: "#f1dbe8",
          background: "#242424",
          primary: "#858AE3",
          secondary: "#D33F49",
          accent: "#590925",
        },
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
