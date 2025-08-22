/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { primary: "#1E66F5" },
      boxShadow: { card: "0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.1)" }
    }
  },
  plugins: []
}
