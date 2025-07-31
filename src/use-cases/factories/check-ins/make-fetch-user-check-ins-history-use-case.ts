/**
 * IMPORTS
 */
import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from '@/use-cases/checkin/fetch-member-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
