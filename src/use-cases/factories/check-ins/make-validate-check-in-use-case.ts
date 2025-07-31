/**
 * IMPORTS
 */
import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository';
import { ValidateCheckInUseCase } from '@/use-cases/checkin/validate-check-in';

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
