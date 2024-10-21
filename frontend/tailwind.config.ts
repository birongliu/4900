import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
     },
      animation: {
        fadeIn: 'fadeIn 1s',
        fadeOut: 'fadeOut 1s'
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
    
      colors: {
        "white": "rgba(241, 239, 228, 1)",
        "lightBeige": "#E3CDAD",
        "softCream": "#F1EFE4",  
        "darkMaroon": "#2f0016",
        "lightGray": "#F2F2F2",
        "mintGray": "#D3E2DC",
        "pureWhite": "#FFFFFF",
        "paleCyan": "#BED4D4",
        
      },
      backgroundColor: {
        "light-primary": "rgba(241, 239, 228, 1)",
        "light-overlay": "#F3E1C8",
        "dark-primary": "rgba(14, 16, 27, 1)",
      }
    },
  },
  plugins: [],
};
export default config;
