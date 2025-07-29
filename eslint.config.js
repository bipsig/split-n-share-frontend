import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: ["react", "react-hooks", "prettier"],
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb",
      "prettier"
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      "prettier/prettier": "error"
    }
  },

  pluginReact.configs.flat.recommended,
]);
