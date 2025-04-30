import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["src/**/*.{ts,tsx}"],
    // files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    // files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
      parserOptions: {
        // projectService: true,
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "warn",
    },
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.log', '.coverage/**', '.vscode/**', '.idea/**', '.eslintcache', '*.min.js', '.DS_Store'],
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { "assertionStyle": "never" }
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { "accessibility": "explicit", "overrides": { "constructors": "off" } }
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error"
    }
  },
  pluginReact.configs.flat.recommended,
]);
