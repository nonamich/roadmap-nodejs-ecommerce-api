import { nodeESLintConfig } from '@/configs/eslint/node.js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nodeESLintConfig,
  {
    ignores: ['dist', 'node_modules'],
  },
];
