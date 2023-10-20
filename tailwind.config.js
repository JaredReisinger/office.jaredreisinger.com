// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
      },
    },
    fontFamily: {
      sans: [/*'Literata',*/ ...defaultTheme.fontFamily.sans],
      serif: ['Literata', ...defaultTheme.fontFamily.serif],
      mono: ['Noto Sans Mono', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
