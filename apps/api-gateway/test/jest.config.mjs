import baseConfig from '../jest.config.mjs';

export default {
  ...baseConfig,
  rootDir: '.',
  testRegex: '.e2e-spec.ts$',
};
