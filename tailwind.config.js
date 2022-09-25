
const colors = require('tailwindcss/colors')


module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      overflow: ['hidden'],
    },
    fontFamily: {
      'bishi': ['Noto Sans SC','Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Helvetica Neue", "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans CJK SC", "WenQuanYi Micro Hei"]
    },
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      indigo: colors.indigo,
      cyan: colors.cyan,
      teal: colors.teal,
      fakeblue: colors.blue,
      white: colors.white,
      green: colors.green,
      purple: colors.purple,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
