/**
 * IMPORTS
 */
import { prisma } from '@/lib/prisma';
import { Prisma, User } from 'generated/prisma';
import { UserRepository } from './users-repository';

export default class PrismaUsersRepository implements UserRepository {
  /**
   * Criar dados para um novo usuário.
   *
   * @param data  Prisma.UserCreateInput
   */
  async create(data: Prisma.UserCreateInput) {
    try {
      const userCreate = await prisma.user.create({
        data: data,
      });

      return userCreate;
    } catch (error) {
      return error as any;
    }
  }

  /**
   * Buscar um usuário pelo e-mail.
   * @param email fitmap@example.com
   * @returns
   */
  async findByEmail(email: string): Promise<User | null> {
    // BUSCANDO DADOS DO USUÁRIO PELO E-MAIL ENVIANDO
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // RETORNANDO DADOS DO USUÁRIO CASO ENCONTRE OU NULL
    return userWithSameEmail;
  }

  /**
   * Buscar um usuário pelo userId.
   * @param userId 1e3d848ifmfo32
   * @returns
   */
  async findById(userId: string): Promise<User | null> {
    // BUSCANDO DADOS DO USUÁRIO PELO E-MAIL ENVIANDO
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // RETORNANDO DADOS DO USUÁRIO CASO ENCONTRE OU NULL
    return user;
  }
}
