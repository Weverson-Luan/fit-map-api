/**
 * IMPORTS
 */
import { FastifyInstance } from 'fastify';

// middlewares
import { verifyJwt } from '@/http/middlewares/verify-jwt';

import { authentication } from '@/http/controllers/authentication/authentication';

// controllers
import { profile } from './profile';
import { registerUser } from './register';
import { refresh } from '../authentication/refresh-token';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUser);

  app.post('/sessions', authentication);

  app.patch('/token/refresh', refresh);

  /**
   * Auteticadas
   */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
