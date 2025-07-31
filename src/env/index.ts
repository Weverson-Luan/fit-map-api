import 'dotenv/config';
import { z } from 'zod';

// VALIDAÇÕES PARA AS VARIAVEIS DE AMBIENTE
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
});

// validando agora os valores do env
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Variaveis de ambiente inválidas!', _env.error.format());

  throw new Error('Variaveis de ambiente inválidas!');
}

export const env = _env.data;
