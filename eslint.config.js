import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin
    },
    rules: {
      "indent": ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "eol-last": ["error", "always"],
      "space-before-function-paren": ["error", "never"],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "no-trailing-spaces": ["error", { skipBlankLines: false }],
      "comma-dangle": ["error", "always-multiline"],
      "semi": ["error", "always"],
      "padded-blocks": ["error", { blocks: "never", switches: "never", classes: "never" }],
    }
  }
];
