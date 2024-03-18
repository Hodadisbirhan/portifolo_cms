/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    //"./nuxt.config.{js,ts}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#1e3a8a",
        title: "#0F172A",
        body: "#F4ECEC",
        bodyText: "#475569",
        activeNavLinkColor: "#2563eb",
      },
      fontFamily: {
        body: ['"Work Sans"', '"sans-serif"'],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
