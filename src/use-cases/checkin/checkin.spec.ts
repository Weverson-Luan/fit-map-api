import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { Decimal } from '@prisma/client/runtime/library';

import InMemoryCheckInsRepository from '@/repositories/in-memory/checkin/check-ins-repository-repository';
import InMemoryGymsRepository from '@/repositories/in-memory/gyms/in-memory-gyms-repository';

import { CheckInUseCase } from './checkin';
import { MaxNumberCheckinsError } from '../errors/checkin/max-number-of-check-ins-erro';
import { MaxDistanceError } from '../errors/distance/max-distance-error';

/**
 * 1. Deve ser capaz de fazer check-in.
 *
 * 2.
 */

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Motoca Gym',
      description: '',
      phone: '',
      latitude: new Decimal(19.7964828),
      longitude: new Decimal(-43.9241025),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve ser capaz de fazer check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 19.7964828,
      userLongitude: -43.9241025,
    });

    expect(checkIn?.id).toEqual(expect.any(String));
  });

  it('não deveria ser possível fazer check-in duas vezes no mesmo dia', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 19.7964828,
      userLongitude: -43.9241025,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 19.7964828,
        userLongitude: -43.9241025,
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckinsError);
  });

  it('deve poder fazer check-in duas vezes, mas em dias diferentes', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 19.7964828,
      userLongitude: -43.9241025,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 19.7964828,
      userLongitude: -43.9241025,
    });

    expect(checkIn?.id).toEqual(expect.any(String));
  });

  it('não deveria poder fazer check-in em academias distantes', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Motoca Gym',
      description: '',
      phone: '',
      latitude: new Decimal(19.7964828),
      longitude: new Decimal(-43.9241025),
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -19.8029091,
        userLongitude: -43.9288909,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
