import { prisma } from '@/lib/prisma';
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

import { Environment } from 'vitest/environments';

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr', // Que o codigo vai ser executado no servidor
  async setup() {
    // Aqui vamos criar o banco de dados do testes
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma db push'); // Executa as migrações do Prisma

    return {
      async teardown() {
        // Aqui vamos apagar o banco de dados do testes
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
};
