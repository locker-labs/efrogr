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
        background: "var(--background)",
        foreground: "var(--foreground)",
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
      },
    },
  },
  plugins: [],
};
export default config;
