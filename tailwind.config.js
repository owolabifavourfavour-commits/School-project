/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172A3A",
        mint: "#DDF7EF",
        teal: "#168F7A",
        coral: "#F27C68",
        sand: "#FFF9F2",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(23, 42, 58, 0.07)",
      },
    },
  },
  plugins: [],
};
