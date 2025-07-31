import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository/check-ins-repository';
import { GymsRepository } from '@/repositories/prisma/gyms/gyms-repository';
import { CheckIn } from 'generated/prisma';
import { ResourceNotFoundError } from '../errors/resource/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordination';
import { MaxNumberCheckinsError } from '../errors/checkin/max-number-of-check-ins-erro';
import { MaxDistanceError } from '../errors/distance/max-distance-error';

interface ICheckInUseCasePayload {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

type ICheckInUseCaseResponse = {
  checkIn: CheckIn | null;
};

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInUseCasePayload): Promise<ICheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // calcular distançia entre a lat e long do usuário e da academia
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    //
    const checkiOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkiOnSameDay) {
      throw new MaxNumberCheckinsError();
    }
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    // retornar o usuário logado
    return {
      checkIn: checkIn,
    };
  }
}
