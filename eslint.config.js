import globals from "globals";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    rules: {
      "vue/multi-word-component-names": "off", // Desativa a regra
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...pluginVue.configs["flat/essential"],
];
