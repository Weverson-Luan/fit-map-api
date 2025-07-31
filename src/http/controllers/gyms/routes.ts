import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

import { search } from './search';
import { nearby } from './nearby';
import { registerGym } from './create';

export async function gymsRoutes(app: FastifyInstance) {
  // todas as rotas dentro desse arquivo vao chamar o middleware para verificar se esta autenticado
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, registerGym);
}
