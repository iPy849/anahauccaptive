/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      primary: "#ff5900",
      black: "#000",
      grey: "#848484",
      secondary: "#572364"
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

