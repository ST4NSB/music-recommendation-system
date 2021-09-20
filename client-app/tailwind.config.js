module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Verdana', 'Arial', 'sans-serif'],
      },
      screens: {
        'mobile': '0px',
        // => @media (min-width: 0px) { ... }
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
