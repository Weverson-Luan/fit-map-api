import { expect, describe, it, beforeEach } from 'vitest';
import { GetUserMetricsUseCase } from './get-user-metrics';
import InMemoryCheckInsRepository from '@/repositories/in-memory/checkin/check-ins-repository-repository';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Ger User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('deve ser capaz de obter a contagem de check-ins a partir de métricas', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
