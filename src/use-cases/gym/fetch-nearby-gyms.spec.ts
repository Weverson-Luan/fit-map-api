import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';
import InMemoryGymsRepository from '@/repositories/in-memory/gyms/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;
describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('deve ser capaz de buscar academias próximas', async () => {
    await gymsRepository.create({
      title: 'Academia Pratique',
      description: null,
      phone: null,
      latitude: -19.7974933,
      longitude: -43.9252514,
    });

    await gymsRepository.create({
      title: 'Smart Fit Av. Amozonas',
      description: null,
      phone: null,
      latitude: -19.9188526,
      longitude: -43.9402809,
    });

    const { gyms } = await sut.execute({
      userLatitude: -19.8029091,
      userLongitude: -43.9288909,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Pratique' }),
    ]);
  });
});
