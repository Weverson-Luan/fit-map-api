import { CheckIn, Prisma } from 'generated/prisma';

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;

  /**
   * Buscar por um checkin de usuário por uma derteminada data.
   * @param userId
   * @param data
   */
  findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>;

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;

  findById(id: string): Promise<CheckIn | null>;

  countByUserId(userId: string): Promise<number>;

  save(checkIn: CheckIn): Promise<CheckIn>;
}
