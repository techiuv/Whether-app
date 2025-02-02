/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#87c9f4',      
        secondary: '#ffffff21',    
        tertiary: '#f6d94f',     
        sunGlow: '#fdeea2',      
        textPrimary: '#ffffff',  
        textSecondary: '#ffffff96',
      },
    },
  },
  plugins: [],
}