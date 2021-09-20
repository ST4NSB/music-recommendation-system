module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'mobile': '0px',
        // => @media (min-width: 0px) { ... }
      },
      colors: {
        theme: {
          black: '#111827',
          dark: '#1F2937',
          searchbar: '#374151',
          gray: '#A8ADB5',
          white: '#dee0e3'
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
