/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // Slate 900 or Black
        primary: '#dc2626', // Red 600
        secondary: '#ecf0f1', // Gray 100
        safe: '#22c55e', // Green 500
        warning: '#f59e0b', // Amber 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
