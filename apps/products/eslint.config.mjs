import { baseESLintConfig } from '@repo/configs/eslint/base.js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseESLintConfig,
  {
    ignores: ['dist', 'node_modules'],
  },
];
