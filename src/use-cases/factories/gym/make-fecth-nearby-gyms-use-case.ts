/**
 * IMPORTS
 */
import { PrismaGymsRepository } from '@/repositories/prisma/gyms';
import { FetchNearbyGymsUseCase } from '@/use-cases/gym/fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
