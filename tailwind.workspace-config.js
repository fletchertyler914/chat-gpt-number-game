/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['night'],
  },
  plugins: [require('daisyui')],
};
