/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'orange',
        secondary: 'black',
        titleColor: '#FFFFFF',
        titleSub: '#FF7900'
      },
      backgroundColor:{
        primary:'#FF7900',
        secondary:'white',
        
      }
    },
  },
  plugins: [],
};
