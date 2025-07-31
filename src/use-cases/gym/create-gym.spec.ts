import InMemoryGymsRepository from '@/repositories/in-memory/gyms/in-memory-gyms-repository';
import { CreateGymsUseCase } from './create-gym';
import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymsUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymsUseCase(gymsRepository);
  });

  it('deveria criar uma academia', async () => {
    const { gym } = await sut.execute({
      title: 'Motoca Gym',
      description: null,
      phone: null,
      latitude: 19.7964828,
      longitude: -43.9241025,
    });

    expect(gym?.id).toEqual(expect.any(String));
  });
});
