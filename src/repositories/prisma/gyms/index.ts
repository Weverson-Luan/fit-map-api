import { prisma } from '@/lib/prisma';
import { FindManyNearbyParams, GymsRepository } from './gyms-repository';
import { Gym, Prisma } from 'generated/prisma';

export class PrismaGymsRepository implements GymsRepository {
  /**
   * Busca uma academia pelo ID.
   * @param id
   */
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  /**
   * Busca academias próximas com base na latitude e longitude.
   * @param params
   */
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  /**
   * Busca academias por nome com paginação.
   * @param query
   * @param page
   */
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  /**
   * Cria uma nova academia.
   * @param data
   */
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
}
