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
        light: {
          rose: '#DED4D4', // Light Rose
          mint: '#D3E2DC', // Light Mint
          ivory: '#F1EFE4', // Light Ivory
          peach: '#F3E1C8', // Light Peach
          sand: '#E3CDAD', // Light Sand
        },
        dark: {
          maroon: '#2F0016', // Dark Maroon
          teal: '#164E63', // Dark Teal
          slate: '#334155', // Dark Slate
          navy: '#6478B', // Dark Navy
          steel: '#94A3B8', // Dark Steel
        }
      },
      backgroundColor: {

      }
    },
  },
  plugins: [],
};
export default config;
