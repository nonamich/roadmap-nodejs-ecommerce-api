import { baseESLintConfig } from "./base.js";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import('eslint').Linter.Config}
 * */
export const nodeESLintConfig = [
  ...baseESLintConfig,
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-empty-object-type": "off"
    },
  },
];
