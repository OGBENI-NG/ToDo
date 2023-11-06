/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headerFont: ['Rubik Moonrocks', 'sans-serif'],
        mainFont: ['Hind', 'sans-serif']
      },
      keyframes: {
        myAnim: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        myAnim: 'myAnim .5s ease 0s 1 normal forwards',
      },
    },
  },
  plugins: [],
};
