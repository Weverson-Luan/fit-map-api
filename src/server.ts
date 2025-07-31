/**
 * IMPORTS
 */
import { app } from '@/app';
import { env } from '@/env';

app
  .listen({
    host: '0.0.0.0', // para ser acessivel ao front end
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Servidor rodando!');
  });
