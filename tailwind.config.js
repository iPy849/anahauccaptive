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
      primary_accent: "#ea580c",
      black: "#000",
      grey: "#848484",
      secondary: "#572364"
    },
    backgroundImage: {
      'light-banner': "url('src/assets/imgs/banner-l.png')",
      'dark-banner': "url('src/assets/imgs/banner-d.png')"
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

