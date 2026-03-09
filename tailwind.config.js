/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c8922a',
          light:   '#e8b84b',
          pale:    '#f5dfa0',
        },
        sienna:  '#8b3a1a',
        forest:  '#2d4a2a',
        batik:   '#9b2335',
        cream: {
          DEFAULT: '#f7f0e6',
          dark:    '#efe5d3',
        },
      },
      fontFamily: {
        display:  ['Cinzel Decorative', 'Georgia', 'serif'],
        serif:    ['DM Serif Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        cormorant:['Cormorant Garamond', 'Georgia', 'serif'],
        body:     ['Josefin Sans', 'sans-serif'],
      },
      scale: { '108': '1.08' },
      animation: {
        'float': 'floatUp 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
