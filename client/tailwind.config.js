const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
    //"./node_modules/flowbite/**/*.js",
    //"./node_modules/flowbite-react/**/*.js",
    //'./node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',

      },
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      'title': ['The Centurion'],
    },
    fontSize: {
      xs: '0.875rem',
      sm: '1rem',
      base: '1.25rem',
      lg: '1.5rem',
      xl: '1.875rem',
      '2xl': '2.25rem',
      '3xl': '2.5rem',
      '4xl': '3rem',
      '5xl': '4rem',
      '6xl': 'rem',
      'title': '8rem',
      // xs: '0.75',
      // sm: '0.875rem',
      // base: '1.0rem',
      // lg: '1.125rem',
      // xl: '1.25rem',
      // '2xl': '1.5rem',
      // '3xl': '1.875rem',
      // '4xl': '2.25rem',
      // '5xl': '3rem',
      // '6xl': 'rem',

    },
    extend: {
      width: {
        '128': '32rem',
        '156': '39rem',
        '192': '48rem',
        '200': '50rem',
      },
      screens: {
        'auth': '100px',
      },
      colors: {
        primary: '#efd1a9',
        secondary: '#998c6c',
        tertiary: '#4b4e69',
        blue: '#1DA1F2',
        //green: '#00ba7c',
        whitest: '#FFFFFF',
        darkblue: '#2795D9',
        lightblue: '#EFF9FF',
        darkest: '#080808',
        darker: '#16181c',
        dark: '#2f3336',
        light: '#AAB8C2',
        lighter: '#E1E8ED',
        lightest: '#F5F8FA',
        success: '#17BF63',
        danger: '#E0245E',
      },
    },
    fill: (theme) => ({
      current: 'currentColor',
      primary: theme('colors.primary'),
    }),
  },
  plugins: [
    //require('flowbite/plugin'),
    //require('tw-elements/dist/plugin')
    require("@tailwindcss/forms")
  ],
}