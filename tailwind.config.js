/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A7F42",
        "background-light": "#F5FBF7",
        "card-light": "#FFFFFF",
        "text-light-primary": "#1A2E2F",
        "text-light-secondary": "#52796F",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("daisyui"),],
};
