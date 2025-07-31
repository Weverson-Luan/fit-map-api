import { Gym, Prisma } from 'generated/prisma';

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;

  /**
   * Buscar por uma academia.
   * @param gymId
   * @param data
   */
  findById(gymId: string): Promise<Gym | null>;

  /**
   * Buscar por academias proximas (até 10km)
   * @param params
   */
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;

  /**
   * Buscar por nome de uma academia.
   *
   * @param query
   */
  searchMany(query: string, page: number): Promise<Gym[]>;
}
