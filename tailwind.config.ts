import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
      },
    },
    fontFamily: {
      sans: ["Manrope", "sans-serif"],
      mono: ['"Space Grotesk"', "monospace"],
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    daisyui
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#12BAAA",
          secondary: "#BFF7F2",
          accent: "#F4FDFC",
          success: "#ADE9E4",
        },
      }
    ],
  },
};
export default config;
