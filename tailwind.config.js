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
        lightgrey: '#F3F3F5',
        error: '#ba0f30',
        red: '#F23B3B'
      },
      fontFamily: {
        namu: ['namu', 'sans-serif']
      }
    },
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1280px',
      xl: '1440px'
    }
  },
  plugins: []
};
