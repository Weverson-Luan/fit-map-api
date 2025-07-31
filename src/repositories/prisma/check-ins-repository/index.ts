import { CheckIn, Prisma } from 'generated/prisma';

import { CheckInsRepository } from './check-ins-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {
  /**
   * Busca um check-in pelo ID.
   * @param id
   */
  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  /**
   * Busca um check-in de usuário por uma data específica.
   * @param userId
   * @param date
   */
  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date'); // pega o início do dia 00:00:00

    const endOfTheDay = dayjs(date).endOf('date'); //  pega o final do dia 23:59:59

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(), // apos o início do dia
          lt: endOfTheDay.toDate(), // antes do final do dia
        },
      },
    });

    return checkIn;
  }

  /**
   * Busca check-ins de um usuário com paginação.
   * @param userId
   * @param page
   */
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
      orderBy: {
        created_at: 'desc',
      },
    });

    return checkIns;
  }

  /**
   * Conta o número de check-ins de um usuário.
   * @param userId
   */
  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  /**
   * Cria um novo check-in.
   * @param data
   */
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  /**
   * Atualiza um check-in existente.
   * @param data
   */
  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data: data,
    });

    return checkIn;
  }
}
