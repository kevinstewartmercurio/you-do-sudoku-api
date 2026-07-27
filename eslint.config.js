const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");

module.exports = [
  ...nextCoreWebVitals,
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      // ThemeToggle reads window.matchMedia, which only exists client-side,
      // so setting state from it necessarily happens inside an effect.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
