import type { Config } from "tailwindcss";

export default {
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
        primary: {
          main: "#A55FF5",
          light: "#E9DAFB",
        },
        neutral: {
          white: "#FFFFFF",
          gray7: "#FAFAFA",
          gray6: "#F5F5F5",
          gray5: "#EEEEEE",
          gray4: "#CCCCCC",
          gray3: "#999999",
          gray2: "#767676",
          gray1: "#555555",
          black: "#000000",
        },

        accent: {
          red: "#FC2C36",
          green: "#2EC271",
          yellow: "#FDE20A", // Kakao Yellow
        },
      },
      fontSize: {
        title1: ["24px", { fontWeight: "600" }], // SemiBold
        title2: ["17px", { fontWeight: "600" }], // SemiBold
        title3: ["17px", { fontWeight: "500" }], // Medium
        bodyL: ["18px", { fontWeight: "500" }], // Medium
        bodyM1: ["16px", { fontWeight: "500" }], // Medium
        bodyM2: ["14px", { fontWeight: "600" }], // SemiBold
        bodyM3: ["14px", { fontWeight: "500" }], // Medium
        bodyM4: ["14px", { fontWeight: "400" }], // Regular
        bodyS1: ["13px", { fontWeight: "500" }], // Medium
        bodyS2: ["13px", { fontWeight: "400" }], // Regular
        bodyS3: ["12px", { fontWeight: "400" }], // Regular
        name: ["16px", { fontWeight: "600" }], // SemiBold
        badge: ["11px", { fontWeight: "400" }], // Regular
        buttonPrimary: ["14px", { fontWeight: "500" }], // Medium
        buttonSecondary: ["16px", { fontWeight: "500" }], // Medium
      },
    },
  },

  plugins: [],
} satisfies Config;
