/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
    ],
    mode: "jit",
    theme: {
      fontFamily:{
        Roboto: ["Roboto","sans-serif"],
        Poppins:["Poppins","sans-serif"],
      },
      extend: {
        colors: {
          // Replace these with your Coolors color codes
          primary: '#00AFB9',
          // Add more custom colors as needed
        },
        screens:{
            "1000px":"1050px",
            "1100px":"1110px",
            "800px" :"800px",
            "1300px":"1300px",
            "400px":"400px"
        }
      },
    },
    plugins: [],
  }