// Example `tailwind.config.js` file
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    cursor: {
      ...defaultTheme.cursor
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      "light-blue": colors.lightBlue,
      cyan: colors.cyan,
      white: colors.white,
      purple: colors.violet
    },
    fontFamily: {
      sans: ["'Libre Franklin'", "sans-serif"],
      serif: ["Merriweather", "serif"]
    },
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        mono: ['"B612 Mono"', ...defaultTheme.fontFamily.mono],
        heading: ['"Playfair Display"'],
        kernel: ['"Miriam Libre"']
      }
    }
  },
  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"]
    }
  }
};
