import { GymsRepository } from '@/repositories/prisma/gyms/gyms-repository';
import { Gym } from 'generated/prisma';

interface IGymsUseCasePayload {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

type IGymsUseCaseResponse = {
  gym: Gym | null;
};

export class CreateGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: IGymsUseCasePayload): Promise<IGymsUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym: gym,
    };
  }
}
