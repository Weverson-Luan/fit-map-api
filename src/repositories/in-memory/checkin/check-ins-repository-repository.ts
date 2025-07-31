import { CheckIn, Prisma } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository/check-ins-repository';

export default class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  /**
   * Criar dados para um novo checkIn.
   *
   * @param data  Prisma.CheckInUncheckedCreateInput
   */
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date'); // retornar -> 2025-02-19T00:00:00
    const endOfTheDay = dayjs(date).endOf('date'); // retornar -> 2025-02-19T00:00:00

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
