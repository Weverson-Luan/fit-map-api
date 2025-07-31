import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// errors
import { UserInvalidCreditialsError } from '@/use-cases/errors/users/invalid-credentials';
import { makeAuthenticationUserCase } from '@/use-cases/factories/authentication/make-authentication-use-case';

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticationBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  // VALIDAÇÃO DOS DADOS
  const { email, password } = authenticationBodySchema.parse(request.body);

  try {
    const authenticationUserUseCase = makeAuthenticationUserCase();

    const { user } = await authenticationUserUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    );

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof UserInvalidCreditialsError) {
      // codestatus-400 -> alguma informação foi passada errada
      return reply.status(400).send({
        code: 400,
        message: error.message,
      });
    }

    // O Fastfy vai lidar com o error desconhecido.
    throw error;
  }
}
