/**
 * IMPORTS
 */
import PrismaUsersRepository from '@/repositories/prisma/users';
import { AuthenticateUseCase } from '@/use-cases/authentication/authentication';

export function makeAuthenticationUserCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticationUserUseCase = new AuthenticateUseCase(usersRepository);

  return authenticationUserUseCase;
}
