/**
 * IMPORTS
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

// app
import { app } from '@/app';

describe('Autenticação (e2e)', () => {
  beforeAll(async () => {
    // fazendo a inicialização  antes de cada testes
    await app.ready();
  });

  afterAll(async () => {
    // fazendo a fechamento do depois de cada testes
    await app.close();
  });

  it('deve ser capaz de autenticar', async () => {
    // 1. Criar um usuário
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    // 2. Autenticar o usuário
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    // 3. Verificar se a autenticação foi bem-sucedida
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
