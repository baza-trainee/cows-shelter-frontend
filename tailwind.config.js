/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FDFDFF',
        black: '#0A0A0A',
        accent: '#FEE41F',
        lemon: '#FFF5A5',
        darkgray: '#565656',
        graphite: '#4D4D4D',
        disabled: '#A9A9A9',
        darkyellow: '#B1A016',
        lightyellow: '#FFFDED',
        yellowshadow: '#DEDCCD',
        lightgrey: '#F3F3F5'
      },
      fontFamily: {
        namu: ['namu', 'sans-serif']
      }
    },
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1280px',
      xl: '1440px'
    }
  },
  plugins: []
};
