import js from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const baseESLintConfig = [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/**"],
  },
];
