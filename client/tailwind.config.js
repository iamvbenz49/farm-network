/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all your component files
    "./public/index.html",         // Includes your HTML files, if necessary
    "./src/**/*.html",  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

