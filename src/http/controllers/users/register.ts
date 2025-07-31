import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// errors
import { UserAlreadyExistsError } from '@/use-cases/errors/users/user-already-exists';
import { makeRegisterUserCase } from '@/use-cases/factories/users/make-register-use-case';

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  // VALIDAÇÃO DOS DADOS
  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    // aplicando o parttern Factories
    const registerUserUseCase = makeRegisterUserCase();

    await registerUserUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        code: 409,
        message: error.message,
      });
    }

    // O Fastfy vai lidar com o error desconhecido.
    throw error;
  }

  return reply.status(201).send();
}
