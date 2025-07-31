/**
 * IMPORTS
 */
import { PrismaGymsRepository } from '@/repositories/prisma/gyms';
import { SearchGymsUseCase } from '@/use-cases/gym/search-gyms';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
