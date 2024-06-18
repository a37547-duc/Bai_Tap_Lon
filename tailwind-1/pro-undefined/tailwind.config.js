/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1280px",
      xl: "1440px",
    },
    // spacing: {
    //   1: "8px",
    //   2: "12px",
    //   3: "16px",
    //   4: "24px",
    //   5: "32px",
    //   6: "48px",
    // },
    fontSize: {
      xs: "0.8rem",
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      spacing: {
        "1-js": "72px",
      },
      colors: {
        "blue-js": "#0A68FF",
        "gray-js": "#808089",
      },
      backgroundColor: {
        "gray-js": "#808089",
        "blue-js": "#1BA8FF",
      },
    },
  },
  plugins: [],
};
