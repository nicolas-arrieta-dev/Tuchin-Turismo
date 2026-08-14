/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#D2691E',
        accent: '#CD853F',
        dark: '#2F4F4F',
        light: '#F5F5DC'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      backgroundImage: {
        'zenu-pattern': "url('/src/assets/patterns/zenu-pattern.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}