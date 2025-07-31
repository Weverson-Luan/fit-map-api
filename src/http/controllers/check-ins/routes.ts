/**
 * IMPORTS
 */
import { FastifyInstance } from 'fastify';

// middlewares
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

// controllers
import { create } from './create';
import { validate } from './validate';
import { history } from './history';
import { metrics } from './metrics';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/check-ins/history', history);
  app.get('/check-ins/metrics', metrics);

  app.post('/gyms/:gymId/check-ins', create);
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  );
}
