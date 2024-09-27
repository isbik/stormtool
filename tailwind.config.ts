import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {},
    },
  },
};
export default config;
