/**
 * IMPORTS
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

// app
import { app } from '@/app';

// utils / test
import { createAndAuthenticateUser } from '@/utils/test/create-and-authentication';

describe('Perfil (e2e)', () => {
  beforeAll(async () => {
    // fazendo a inicialização  antes de cada testes
    await app.ready();
  });

  afterAll(async () => {
    // fazendo a fechamento do depois de cada testes
    await app.close();
  });

  it('deve ser capaz de obter o perfil do usuário.', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    );
  });
});
