/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'BAHNSCHRIFT': ['BAHNSCHRIFT', 'sans-serif']
      },
      colors: {
        white: {
          50: '#F3F3F4'
        },
        orange: {
          50: 'rgb(242, 135, 5)'
        },
        black: {
          50: '#0f0e11'
        }
      }
    },
  },
  plugins: [],
}
