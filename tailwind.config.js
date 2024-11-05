/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark: "#000000",
        lightGreen: "#D9E6BA",
        green: "#0D2A25",
        lightText:"#A7A5A5",
        rating:'#DF7A10',
      }
    },
    keyframes:{
      zoom: {
        "0%": {
          transform: "scale(1)",
        },
        " 50%": {
          transform: "scale(1.2)",
        },
        " 100%": {
          transform: "scale(1)",
        },
      },
    },
    animation:{
      zoom: "zoom 2s ease-in-out infinite",
    }
  },
  plugins: [],
}