import { QueryClient } from '@tanstack/react-query';

import { client } from '~/api';

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const queryClient = new QueryClient();
