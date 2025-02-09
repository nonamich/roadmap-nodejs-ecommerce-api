import { Prisma } from '@prisma/client/user/index.js';

export const USER_SELECT: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  password: true,
} as const;
