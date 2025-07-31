import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// errors
import { UserAlreadyExistsError } from '@/use-cases/errors/users/user-already-exists';
import { makeCreateGymUseCase } from '@/use-cases/factories/gym/make-create-gym-use-case';

export async function registerGym(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  // VALIDAÇÃO DOS DADOS
  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  try {
    // aplicando o parttern Factories
    const registerGymUseCase = makeCreateGymUseCase();

    await registerGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
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
