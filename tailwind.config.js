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
        disabled: '#A9A9A9',
        darkyellow: '#B1A016',
        lightyellow: '#FFFDED',
        yellowshadow: '#DEDCCD'
      },
      fontFamily: {
        namu: ['namu', 'sans-serif']
      }
    }
  },
  plugins: []
};
