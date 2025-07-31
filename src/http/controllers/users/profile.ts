import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserProfileUseCase } from '@/use-cases/factories/users/make-get-user-profile-use-case';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined, // Exclude sensitive data
      },
    });
  } catch (error) {
    return reply.status(500).send('Error verifying JWT');
  }
}
