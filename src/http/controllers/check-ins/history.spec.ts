/**
 * IMPORTS
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

// app
import { app } from '@/app';

// lib / prisma
import { prisma } from '@/lib/prisma';

// utils / test
import { createAndAuthenticateUser } from '@/utils/test/create-and-authentication';

describe('Histórico Check-in (e2e)', () => {
  beforeAll(async () => {
    // fazendo a inicialização  antes de cada testes
    await app.ready();
  });

  afterAll(async () => {
    // fazendo a fechamento do depois de cada testes
    await app.close();
  });

  it('deve ser capaz de listar o histórico de check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ]);
  });
});
