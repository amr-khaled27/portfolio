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

        blue: {
          100: "#cce7fb",
          200: "#99cef7",
          300: "#66b6f3",
          400: "#339def",
          500: "#0085eb",
          600: "#006abc",
          700: "#00508d",
          800: "#00355e",
          900: "#001b2f",
        },
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
