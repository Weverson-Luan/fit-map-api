/**
 * IMPORTS
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

// app
import { app } from '@/app';

// utils / test
import { createAndAuthenticateUser } from '@/utils/test/create-and-authentication';

describe('Academias próximas (e2e)', () => {
  beforeAll(async () => {
    // fazendo a inicialização  antes de cada testes
    await app.ready();
  });

  afterAll(async () => {
    // fazendo a fechamento do depois de cada testes
    await app.close();
  });

  it('deve ser capaz de listar academias próximas.', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ]);
  });
});
