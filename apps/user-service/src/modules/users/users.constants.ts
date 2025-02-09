import { Prisma } from '@packages/shared/db/user';

export const USER_SELECT: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  password: true,
} as const;
