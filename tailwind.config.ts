import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'accent-teal': "var(--accent-teal)",
        'card-bg': "var(--card-bg)",
        'header-bg': "var(--header-bg)",
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'mackinac': ['P22 Mackinac Pro', 'serif'],
        'roboto': ['Roboto Flex', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
