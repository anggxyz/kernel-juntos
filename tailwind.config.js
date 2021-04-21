const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        "light-blue": colors.lightBlue,
        cyan: colors.cyan
      },
      fontFamily: {
        fancy: ['"Lora"']
      }
    }
  },
  variants: {},
  plugins: []
};
