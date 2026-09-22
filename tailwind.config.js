/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F3",
        ink: "#201F1D",
        charcoal: "#17130F",
        ember: "#E8542A",
        "ember-dark": "#C23F19",
        herb: "#2F6E4E",
        gold: "#E3A008",
        line: "#E5DFD3",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Sora'", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
