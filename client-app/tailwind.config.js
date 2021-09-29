module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        '45': '45%',
        '90': '90%',
      },
      fontFamily: {
        sans: ['Helvetica', 'Verdana', 'Arial', 'sans-serif'],
      },
      screens: {
        'tablet': { 'max': '1326px'},
        // => @media (max-width: 1326px) { ... }
        'mobile': { 'max': '800px'},
        // => @media (max-width: 800px) { ... }
      },
      colors: {
        theme: {
          black: '#111827',
          dark: {
            xs: '#283445',
            xm: '#1F2937',
            xl: '#1c2531',
          },
          searchbar: '#374151',
          gray: '#A8ADB5',
          white: '#dee0e3'
        }
      }
    }
  },
  variants: {},
  extend: {},
  plugins: [],
}
