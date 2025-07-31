import { PrismaClient } from 'generated/prisma';
import { env } from '@/env';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [], // quando eu realizar qualquer query vamos exibir o log da query em desenvolvimento
});
