/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended"
  ],
  "env": {
    "node": true,
    "vue/setup-compiler-macros": true
  },
  "rules": {
    "vue/html-indent": ["error", 4],
    "vue/script-indent": ["error", 4],
  }
}
