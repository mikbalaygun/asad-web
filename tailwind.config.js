/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ana Okyanus Renkleri - Daha Soft
        ocean: {
          deep: '#0A1929',      // Daha koyu, sakin
          navy: '#16304D',      // Daha mat mavi
          cyan: '#4A9B8E',      // Daha pastel turkuaz
          sand: '#C5B8A5',      // Daha az sarı
        },

        // Derinlik Zonları (0-100m) - Yumuşak Geçişler
        surface: {
          light: '#1E3A52',
          DEFAULT: '#152E45',
          dark: '#0E2436',
        },
        shallow: {
          light: '#152E45',
          DEFAULT: '#0E2436',
          dark: '#081A28',
        },
        mid: {
          light: '#0E2436',
          DEFAULT: '#081A28',
          dark: '#04101A',
        },
        deep: {
          light: '#081A28',
          DEFAULT: '#04101A',
          dark: '#020A12',
        },
        abyss: {
          light: '#04101A',
          DEFAULT: '#020A12',
          dark: '#000508',
        },

        // Vurgu & Aksan Renkleri - Daha Soft
        coral: {
          light: '#D4847C',
          DEFAULT: '#B86B63',
          dark: '#9B5850',
        },
        pearl: {
          light: '#E8DFD4',
          DEFAULT: '#D4C8BC',
          dark: '#BFB3A7',
        },
        kelp: '#3A5A2A',
        biolum: {
          light: '#7CC4BD',      // Çok daha soft
          DEFAULT: '#5BA39C',    // Pastel mint
          dark: '#4A857F',
        },
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },

      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bubble': 'bubbleRise 12s linear infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'blob': 'blob 7s infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(0) scale(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ocean-gradient': 'linear-gradient(180deg, #0A1B2E 0%, #1a3a52 50%, #0A1B2E 100%)',
      },

      boxShadow: {
        'glow': '0 0 20px rgba(46, 196, 182, 0.5)',
        'glow-lg': '0 0 40px rgba(46, 196, 182, 0.6)',
        'coral-glow': '0 0 30px rgba(255, 107, 107, 0.5)',
        'biolum': '0 0 25px rgba(0, 255, 240, 0.6)',
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};