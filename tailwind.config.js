/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#292b3a',
        secondary: '#1d1e30',
        tertiary: '#18192b',
      },
    },
  },
  plugins: [],
}
