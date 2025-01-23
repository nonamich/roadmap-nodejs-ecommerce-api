import { defaultPlugins } from '@hey-api/openapi-ts';

export default {
  client: '@hey-api/client-fetch',
  input: 'http://localhost:3000/swagger.json',
  plugins: [...defaultPlugins, '@tanstack/react-query'],
  output: {
    lint: 'eslint',
    path: 'app/api',
  },
};
