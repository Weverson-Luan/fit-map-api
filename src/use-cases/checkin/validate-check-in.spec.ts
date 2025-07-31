import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';
import InMemoryCheckInsRepository from '@/repositories/in-memory/checkin/check-ins-repository-repository';
import { ResourceNotFoundError } from '../errors/resource/resource-not-found-error';
import { LateCheckInValidationError } from '../errors/checkin/late-check-in-validation-error';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve ser capaz de validar o check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('não deveria ser capaz de validar um check-in inexistente', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('não deve ser capaz de validar o check-in após 20 minutos de sua criação', async () => {
    // colocando uma data fixa para os testes
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40)); // 2025/01/01 13:40 utc

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21; // 21 minutos em milissegundos

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
