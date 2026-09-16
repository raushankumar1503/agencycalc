import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // No custom colors/gradients. The default neutral scale plus a single
      // restrained focus/action accent keeps the tool looking operational.
      colors: {
        accent: {
          DEFAULT: "#334155", // slate-700
          dark: "#1e293b", // slate-800
        },
      },
    },
  },
  plugins: [],
};

export default config;