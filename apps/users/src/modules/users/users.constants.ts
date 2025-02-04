import { Prisma } from 'prisma-client';

export const USER_SELECT: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  password: true,
} as const;
