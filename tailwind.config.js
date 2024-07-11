/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        main :'#009AD8',
        mybg : '#1E202B',
      },
      container : "80%"
    },
    backgroundImage:{
      bgimg : "url('../images/banner.png')"
    }
  },
  plugins: [],
}

