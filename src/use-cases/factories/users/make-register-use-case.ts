/**
 * IMPORTS
 */
import PrismaUsersRepository from '@/repositories/prisma/users';
import { RegisterUseCase } from '../../users/register';

export function makeRegisterUserCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUserUseCase = new RegisterUseCase(usersRepository);

  return registerUserUseCase;
}
