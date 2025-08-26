
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#d4af37", dark: "#b08b2f" } }
    },
    container: { center: true, padding: "1rem" }
  },
  plugins: []
}
