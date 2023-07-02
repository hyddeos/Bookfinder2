/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      //Main
      white: "#ffffff",
      light: "#e7e3d0",
      light_blue: "#7ca9d5",
      prim: "#feaf0e",
      dark: "#241f40",
      acc: "#873f42",
      //Extras
      error: "#EC6A52",
      succes: "#70C09E",
    },
    fontFamily: {
      header: ['"Fira Sans"'],
      ingress: ["PT Serif"],
      body: ["Martel"],
    },
    extend: {},
  },
  plugins: [],
};
