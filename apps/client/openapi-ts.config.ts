import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';
import 'dotenv-expand/config';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: process.env.API_SCHEMA!,
  plugins: [
    ...defaultPlugins,
    '@tanstack/react-query',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
  ],
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: 'app/api',
  },
});
