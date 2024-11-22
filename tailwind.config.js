/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7eb0d3',
        secondary: '#5793d1',
        tertiary: '#5598e3',
      },
    },
  },
  plugins: [],
}
