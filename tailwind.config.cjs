/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Noto Sans JP',
          'Hiragino Kaku Gothic ProN',
          'Yu Gothic',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
