/**
 * IMPORTS
 */
import PrismaUsersRepository from '@/repositories/prisma/users';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile/get-user-profile';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
