/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        audiowide:['Audiowide','san-serif'],
      },
      colors:{
        primary:'#335E91',
        secondary:'#FFF7D6',
      }
    },
  },
  plugins: [],
}

