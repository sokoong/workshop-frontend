/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "350px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#1fb6ff",
      secondary: "#8492a6",
      white: "#ffffff",
      grey: "#eeeeee",
      midnight: "#121063",
    },
    fontFamily: {
      sans: ["Sarabun", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
