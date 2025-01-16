import baseConfig from '../jest.config';

export default {
  ...baseConfig,
  rootDir: '.',
  testRegex: '.e2e-spec.ts$'
};
