/**
 * IMPORTS
 */
import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository';
import { GetUserMetricsUseCase } from '@/use-cases/checkin/get-user-metrics';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
