import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "rgba(var(--color-blue), 12)",
        teal: "rgba(var(--color-teal), <alpha-value>)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "gray-25": "#FCFCFD",
        "gray-50": "#F9FAFB",
        "gray-100": "#F2F4F7",
        "gray-200": "#EAECF0",
        "gray-300": "#D0D5DD",
        "gray-400": "#98A2B3",
        "gray-500": "#667085",
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-800": "#1D2939",
        "gray-900": "#101828",
        "locker-25": "#E9EAFA",
        "locker-50": "#D2D4F6",
        "locker-100": "#C1CBFF",
        "locker-200": "#A6AAED",
        "locker-300": "#8F94E8",
        "locker-400": "#797FE3",
        "locker-500": "#6269DF",
        "locker-600": "#4C54DA",
        "locker-700": "#3840C6",
        "locker-800": "#242CB2",
        "locker-900": "#10189E",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xxxs: [".6rem", ".817rem"],
        xxs: [".7rem", "0.9534rem"],
        xs: [".8rem", "1.0896rem"],
        sm: [".9rem", "1.2258rem"],
        base: ["1rem", "1.362rem"],
        lg: ["1.2rem", "1.6344rem"],
        xl: ["1.4rem", "1.9068rem"],
        xxl: ["1.6rem", "2.1792rem"],
        xxxl: ["2rem", "2.724rem"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
