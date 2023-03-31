/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: true,
    // [
    // {
    //   mytheme: {
    //     primary: '#0ea5e9',
    //     secondary: '#ef5397',
    //     accent: '#d6489b',
    //     neutral: '#2E2234',
    //     'base-100': '#E5E5EB',
    //     info: '#3595E9',
    //     success: '#28BDA9',
    //     warning: '#F99224',
    //     error: '#EA3E5E',
    //   },
    // },
    // 'dark',
    // 'cupcake',
    // ],
  },
  plugins: [require('daisyui')],
};
