/**
 * IMPORTS
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

// app
import { app } from '@/app';

describe('Registro (e2e)', () => {
  beforeAll(async () => {
    // fazendo a inicialização  antes de cada testes
    await app.ready();
  });

  afterAll(async () => {
    // fazendo a fechamento do depois de cada testes
    await app.close();
  });

  it('deve ser capaz de registrar.', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(201);
  });
});
