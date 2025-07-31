/**
 * Caso de uso de cadastro de um usuário
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';

import InMemoryUsersRepository from '@/repositories/in-memory/users/in-memory-users-register';

import { UserInvalidCreditialsError } from '../errors/users/invalid-credentials';
import { AuthenticateUseCase } from '../authentication/authentication';

/**
 * 1. Deve ser possivel resgistrar um usuário.
 *
 * 2. Deve ser possivel fazer o hash da senha ao registar um usuário.
 *
 * 3. Não deve ser possivel registrar um usuário duplicado com mesmo e-mail
 */

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authentication Use Case', () => {
  //EXECUTAR ANTES DE CADA SUITE TESTE
  beforeEach(() => {
    // instânciando o meu repositorio
    usersRepository = new InMemoryUsersRepository();

    // instânciando o meu caso de uso
    sut = new AuthenticateUseCase(usersRepository);
  });
  it('deve ser possivel usuário se autenticar.', async () => {
    await usersRepository.create({
      name: 'Luan Dev',
      email: 'luandev@gmail.com',
      password_hash: await hash('123456', 6),
    });

    // fazendo o registro de um usuário
    const { user } = await sut.execute({
      email: 'luandev@gmail.com',
      password: '123456',
    });

    // espero que quando criar usuario me retorna um id do tipo string
    expect(user.id).toEqual(expect.any(String));
  });

  it('não deve ser possivel usuário se autenticar com e-mail inválidos.', async () => {
    // essa chamada precisa lançar um error to tipo UserInvalidCreditialsError
    const responseError = sut.execute({
      email: 'luandev@gmail.com',
      password: '123456',
    });

    // espero que seja verdadeiro
    await expect(() => responseError).rejects.toBeInstanceOf(
      UserInvalidCreditialsError,
    );
  });

  it('não deve ser possivel usuário se autenticar com senha inválidas.', async () => {
    // essa chamada precisa lançar um error to tipo UserInvalidCreditialsError
    const responseError = sut.execute({
      email: 'luandev@gmail.com',
      password: '123123',
    });

    // espero que seja verdadeiro
    await expect(() => responseError).rejects.toBeInstanceOf(
      UserInvalidCreditialsError,
    );
  });
});
