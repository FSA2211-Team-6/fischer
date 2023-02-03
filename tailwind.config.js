/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: "fadeOut 2s ease-in-out",
      },

      // that is actual animation
      keyframes: {
        fadeOut: {
          "0%": { opacity: 0 },
          "25%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
