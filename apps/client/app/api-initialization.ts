import { client } from '~/api';

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
});
