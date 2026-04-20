/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      colors: {
        ink: {
          950: "#05070d",
          900: "#070b12",
          850: "#09101a",
          800: "#0c1420",
        },
      },
      boxShadow: {
        panel: "0 24px 100px rgba(0, 0, 0, 0.42)",
        lift: "0 18px 60px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
