/**
 * IMPORTS
 */
import { PrismaGymsRepository } from '@/repositories/prisma/gyms';
import { CreateGymsUseCase } from '@/use-cases/gym/create-gym';

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymsUseCase(gymsRepository);

  return useCase;
}
