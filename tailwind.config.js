module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#87c9f4',      
        secondary: '#5a99dd',    
        tertiary: '#f6d94f',     
        sunGlow: '#fdeea2',      
        textPrimary: '#ffffff',  
        textSecondary: '#cce6ff',
        
        // Individual colors from the extracted palettes
        sunrise1: "#FDE6A0",
        sunrise2: "#F7A676",
        sunrise3: "#F16745",
        sunset1: "#E26D5A",
        sunset2: "#D44177",
        sunset3: "#9656A1",
        night1: "#031D44",
        night2: "#033860",
        night3: "#36536B",
      },
      backgroundImage: {
        'sunrise-gradient': 'linear-gradient(90deg, #FDE6A0, #F7A676, #F16745)',
        'sunset-gradient': 'linear-gradient(90deg, #E26D5A, #D44177, #9656A1)',
        'night-gradient': 'linear-gradient(90deg, #031D44, #033860, #36536B)',
      },
    },
  },
  plugins: [],
}
