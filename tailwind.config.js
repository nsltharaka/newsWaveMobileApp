/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        'fb-blue' : '#2D68C4',
        'apple-gray' : '#A2AAAD',
      }
    },
  },
  plugins: [],
}